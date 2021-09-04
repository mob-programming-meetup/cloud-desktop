#!/usr/bin/env node
const { program } = require('commander');
const {validPresets: validConfigTypes} = require('./src/constants');
const packageJson = require('./package.json');
const { createWindowsVm } = require('./src/windows-gce-instance');

program.version(packageJson.version);

program
  .option('-c, --config <type>', `Available config types: ${validConfigTypes.join(", ")}` )
  // .option('--dry-run', 'show which instance would be created, without doing so')
  // .option('-p, --pizza-type <type>', 'flavour of pizza')
  ;

program.parse(process.argv);

program.addHelpCommand();

const options = program.opts();
if (!validConfigTypes.includes(options.config)) {
  program.help();
}
else createWindowsVm(options.config);