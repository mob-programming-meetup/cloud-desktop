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
    const { createWindowsVm, getVanillaConfig } = require('../src/windows-gce-instance');
    process.env['GOOGLE_APPLICATION_CREDENTIALS'] = 'dummy'
    vm = getVanillaConfig();
    console.log(vm.config);
    assert(vm.config.os == 'windows');
    // assert vm.display == true
    // assert vm.scripts['windows-startup-script-ps1'] contains ['chocolatey', 'git']
  });
  
});
/*
options to make the test pass:
1. make the function-under-test return the config as a member of its result (object)
2. make a createWindowsVMConfig function that returns only the config
*/