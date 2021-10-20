var assert = require('assert');
const { createWindowsVm } = require('../src/windows-gce-instance');

/*
Let's write a behavioral test using Given-When-Then
Test 0
   given the vanilla configuration
   when the user requests a VM
   then a windows VM is created
   and a display has been activated on the VM
   and a bunch of recommended programs including chocolately are installed on the VM at startup
*/
describe('Vanilla Configuration', function() {
  it('should create a Windows VM', async function() {
    const { getVmConfig } = require('../src/windows-gce-instance');
    process.env['GOOGLE_APPLICATION_CREDENTIALS'] = 'dummy'
    vmConfig = getVmConfig();
    console.log(vmConfig);
    assert(vmConfig.os == 'windows');
    assert(vmConfig.displayDevice.enableDisplay == true);
    assert(vmConfig.metadata.items[0]['key'] == 'windows-startup-script-ps1');
    assert(vmConfig.metadata.items[0]['value'].includes('https://raw.githubusercontent.com/mob-programming-meetup/machine-setup/main/windows-basic.ps1'));
  });
  
});

describe('Configuration With Specific Packages', function() {
  it('should create a Windows VM with specific packages', async function() {
    const { getVmConfig } = require('../src/windows-gce-instance');
    process.env['GOOGLE_APPLICATION_CREDENTIALS'] = 'dummy'
    vmConfig = getVmConfig(['vscode']);
    console.log(vmConfig);
    assert(vmConfig.os == 'windows');
    assert(vmConfig.displayDevice.enableDisplay == true);
    assert(vmConfig.metadata.items[0]['key'] == 'windows-startup-script-ps1');
    assert(vmConfig.metadata.items[0]['value'].includes('https://raw.githubusercontent.com/mob-programming-meetup/machine-setup/main/windows-basic.ps1'));
    assert(vmConfig.metadata.items[0]['value'].includes('choco install --yes vscode'));
  });
  
});
/*
options to make the test pass:
1. make the function-under-test return the config as a member of its result (object)
2. make a createWindowsVMConfig function that returns only the config
*/

/*
A. should the test tightly couple itself ot the REST API of google
B. should the test require the "model" of a configuration to be returned.
*/