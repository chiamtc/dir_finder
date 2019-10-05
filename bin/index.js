#!/usr/bin/env node
"use strict";
const program = require('commander');
const pkg = require('../package');
let finder = new (require('../src/Finder'));

program
    .version(pkg.version)
    .description(pkg.description);
/*
.command('exec <cmd>')
    .alias('ex')
    .description('execute the given remote cmd')
    .option("-e, --exec_mode <mode>", "Which exec mode to use")*/


program
    .command('set-path <pathname>')
    .alias('p')
    .description("setting path")
    .action((pathname)=> {
        console.log(pathname);
        finder.setPath(pathname);
        console.log(finder.getPath() + " - " + finder.getRegex())
    });

program
    .command('show-settings')
    .alias('ss')
    .description('show current settings')
    .action(()=>{
        console.log(finder.getPath() + " - " + finder.getRegex())
    })

program.parse(process.argv);
