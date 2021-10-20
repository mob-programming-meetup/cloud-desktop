'use strict';

// Based on this example: https://github.com/googleapis/nodejs-compute/blob/master/samples/startupScript.js

function addInstallationScript(result, installationScript) {
  if (installationScript) {
    result.push(`Invoke-WebRequest -UseBasicParsing ${installationScript} | Invoke-Expression`);
  } else {
    result.push('Invoke-WebRequest -UseBasicParsing https://raw.githubusercontent.com/mob-programming-meetup/machine-setup/main/windows-basic.ps1 | Invoke-Expression');
  }
}

function addChocolateyPackages(result, chocolateyPackages) {
  if (chocolateyPackages) {
    result.push(`choco install --yes ${chocolateyPackages.join(' ')}`);
  }

}

function addShutdownCommand(result) {
  result.push('Stop-Computer -ComputerName localhost');
}

function createWindowsStartupScript(chocolateyPackages, installationScript) {
  let result = [];
  addInstallationScript(result, installationScript)
  addChocolateyPackages(result, chocolateyPackages)
  addShutdownCommand(result)
  return result.join('\r\n');
}

function getVmConfig(chocolateyPackages, installationScript) {
  // Create a new VM, using a Windows Server 2019 Desktop Experience image. 
  const config = {
    os: 'windows',
    displayDevice: { enableDisplay: true },
    metadata: {
      items: [
        {
          key: 'windows-startup-script-ps1',
          value: createWindowsStartupScript(chocolateyPackages, installationScript),
        },
      ],
    },
  };
  console.log("Returns: ", config.metadata.items[0]['value']);
  return config;
}

async function createWindowsVm(chocolateyPackages, installationScript) {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error("Please set GOOGLE_APPLICATION_CREDENTIALS to the path of your gce-service-account-key.json");
    console.info(`
    First setup Google Cloud service account authentication.
    See https://cloud.google.com/docs/authentication/getting-started#windows
    and https://console.cloud.google.com/apis/credentials

    This can be achieved via Powershell like this:
    choco install -y gcloudsdk
    gcloud iam service-accounts create some-account-name  --display-name="My Service Account"
    gcloud iam service-accounts keys create gce-service-account-key.json  --iam-account=some-account-name
    $env:GOOGLE_APPLICATION_CREDENTIALS = (pwd).path + "\\gce-service-account-key.json"
   `);
    return;
  }

  const Compute = require('@google-cloud/compute');
  const dateFormat = require('dateformat');
  const fetch = require('node-fetch');

  const compute = new Compute();
  const zone = compute.zone('europe-north1-c');

  const name = 'windows-cloud-desktop--' + dateFormat(new Date(), "yyyy-mm-dd--HH-MM");

    /**
   * Create a new virtual machine with Windows Server Desktop Experience
   * @param {object} config The desired configuration of the VM.
   * This an `InstanceResource` instance as defined at https://cloud.google.com/compute/docs/reference/rest/v1/instances
   */
  async function createVMWithStartupScript(config) {
    const vm = zone.vm(name);

    console.log(`Creating VM ${name}...
    Note: Also delete the disk of this instance when removing it.`);
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
    await pingVM(ip); // Not working for now, we need to start a HTTP server like in the original example (link at the top)

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

  const cfg = await createVMWithStartupScript(getVmConfig(chocolateyPackages, installationScript));

  return {
    config: {
      os: cfg.os
    }
  };
}

module.exports = { createWindowsVm, getVmConfig };