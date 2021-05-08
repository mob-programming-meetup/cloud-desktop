'use strict';

/*
 First setup Google Cloud service account authentication.
 See https://cloud.google.com/docs/authentication/getting-started#windows
 and https://console.cloud.google.com/apis/credentials

 E.g. 
 choco install -y gcloudsdk
 gcloud iam service-accounts create some-account-name  --display-name="My Service Account"
 gcloud iam service-accounts keys create gce-service-account-key.json  --iam-account=some-account-name
 $env:GOOGLE_APPLICATION_CREDENTIALS = (pwd).path + "\gce-service-account-key.json"
 
 */


async function main(name) {
  // [START gce_startup_script]
  const Compute = require('@google-cloud/compute');
  const dateFormat = require('dateformat');
  const fetch = require('node-fetch');

  const compute = new Compute();
  const zone = compute.zone('europe-north1-c');

  name = name || 'windows-cloud-desktop--' + dateFormat(new Date(), "yyyy-mm-dd--HH-MM");

  /**
   * Create a new virtual machine with Windows Server Desktop Experience
   * @param {string} name Name of the virtual machine
   */
  async function createVMWithStartupScript() {
    // Create a new VM, using a Windows Server 2019 Desktop Experience image. 
    const config = {
      os: 'windows',
      machineType: 'e2-standard-4',
      disks: [{
            index: 0,
            boot: true,
            initializeParams: {
                sourceImage: 'https://www.googleapis.com/compute/v1/projects/windows-cloud/global/images/family/windows-2019', // see `gcloud compute images list --filter=desktop`
                diskSizeGb: '80'
            }
        }],
      displayDevice: {enableDisplay: true},
      http: true,
      metadata: {
        items: [
          {
            key: 'windows-startup-script-ps1',
            // TODO: the install script is run on every boot, need to set a persistent variable or file to bail out when already installed (test if actually necessary first)
            value: `
                iwr -useb https://raw.githubusercontent.com/JayBazuzi/machine-setup/main/windows.ps1 | iex
                Stop-Computer -ComputerName localhost`,
          },
        ],
      },
    };

    const vm = zone.vm(name);

    console.log(`Creating VM ${name}...`);
    const [, operation] = await vm.create(config);

    console.log(`Polling operation ${operation.id}...`);
    await operation.promise();

    console.log('Acquiring VM metadata...');
    const [metadata] = await vm.getMetadata();

    // External IP of the VM.
    const ip = metadata.networkInterfaces[0].accessConfigs[0].natIP;
    console.log(`Booting new VM with IP http://${ip}...`);

    // Ping the VM to determine when the HTTP server is ready.
    console.log('Operation complete. Waiting for IP');
    await pingVM(ip);

    console.log(`\n${name} created successfully`);
  }

  /**
   * Poll a given IP address until it returns a result.
   * @param {string} ip IP address to poll
   */
  async function pingVM(ip) {
    let exit = false;
    while (!exit) {
      await new Promise(r => setTimeout(r, 2000));
      try {
        const res = await fetch(`http://${ip}`);
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        exit = true;
      } catch (err) {
        process.stdout.write('.');
      }
    }
  }

  createVMWithStartupScript();
}

main(...process.argv.slice(2));