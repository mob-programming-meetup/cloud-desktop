#!/usr/bin/env node
const { program, Option } = require('commander');

const packageJson = require('./package.json');
const { createWindowsVm } = require('./src/windows-gce-instance');

program.version(packageJson.version);

const validConfigTypes = ['vanilla', 'chocolatey'];

program
  .addOption(
    new Option('-c, --config <type>', 'choose how the instance should be provisioned')
    .choices(validConfigTypes)
    .makeOptionMandatory(true)
  )
  // .option('--dry-run', 'show which instance would be created, without doing so')
  // .option('-p, --pizza-type <type>', 'flavour of pizza')
  ;

program.addHelpCommand();
program.showHelpAfterError();
  
program.parse(process.argv);


const options = program.opts();
createWindowsVm(options.config);