#!/usr/bin/env node
const { program, Option } = require('commander');

const { createWindowsVm } = require('./src/windows-gce-instance');

const packageJson = require('./package.json');
program.version(packageJson.version);

configureProgram();
parseParameters();
executeAction();

function configureProgram() {
  program.addHelpCommand();
  program.showHelpAfterError();
}

function parseParameters() {
  const validConfigTypes = ['vanilla', 'chocolatey', 'custom'];

  program
    .addOption(
      new Option('-c, --config <type>', 'choose how the instance should be provisioned')
        .choices(validConfigTypes)
        .makeOptionMandatory(true)
    )  
    .option('-p, --packages <chocolatey packages...>', 'chocolatey packages that should be installed on the created instance')
    .option('-s, --script <powershell script URL>', 'instance installation script. Note: Replaces the vanilla config installation script')
    // .option('--dry-run', 'show which instance would be created, without doing so')
    ;

  program.parse(process.argv);
}


function executeAction() {
  const options = program.opts();
  createWindowsVm(options.packages, options.script);
}