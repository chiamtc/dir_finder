#!/usr/bin/env node
const program = require('commander');
const pkg = require('../package');
const finder = new (require('../src/Finder'));

program
    .version(pkg.version)
    .description(pkg.description);


program
    .command('-p')

program.parse(process.argv);
