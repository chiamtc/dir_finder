#!/usr/bin/env node
"use strict";
const program = require('commander');
const boxen = require('boxen');
const path = require('path');
const chalk = require('chalk');
const pkg = require('../package');
let finder = new (require('../src/lib/Finder'));
let config = require('../src/cli/Config');

program
    .version(pkg.version, '-v, --ver', 'Current version')
    .name("find-dir")
    .usage("[option flag] [value]")
    .description(pkg.description)
    .helpOption('-h, --help', 'Output help information')
    .option('-p, --path <pathname>', `Set path. Usage: ${chalk.bgRedBright('find-dir --path ~/Desktop')}`, (pathname) => {
        finder.setPath(pathname);
        config.writeConfig('./config.json', JSON.stringify({pathname}));
        console.log(`Pathname "${config.readConfig(`./config.json`).pathname}" set successfully`);
    })
    .option('-s, --search <queryParam>', `Search the pathname with query parameters in config.json. Usage: ${chalk.bgRedBright('find-dir --search "unicorn"')}`, (queryParam) => {
        const settings = config.readConfig(path.join(__dirname, '../config.json'));
        finder.setPath(settings.pathname);
        finder.setRegex(queryParam);
        console.log(finder.search());
    })
    .option('-c, --config', `Display current config. Usage: ${chalk.bgRedBright('find-dir --config')}`, () => {
        const settings = config.readConfig(path.join(__dirname, '../config.json'));
        finder.setPath(settings.pathname);
        console.log(boxen(`Pathname:${finder.getPath()}`, {padding: 1}))
    });

if (!process.argv.slice(2).length) program.outputHelp();

program.parse(process.argv);