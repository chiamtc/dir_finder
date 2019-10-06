#!/usr/bin/env node
"use strict";
const program = require('commander');
const boxen = require('boxen');
const pkg = require('../package');
let finder = new (require('../src/lib/Finder'));
let config = require('../src/cli/Config');
const fs = require('fs');

program
    .version(pkg.version, '-v, --ver', 'Current version')
    .name("find-dir")
    .usage("[option flag] [value]")
    .description(pkg.description)
    .helpOption('-h, --help', 'Output help information')
    .option('-p, --path <pathname>', 'Set path. Usage: `find-dir --path ~/Desktop`', (pathname) => {
        finder.setPath(pathname);
        const currentConfig = config.readConfig('./config.json');
        config.writeConfig('./config.json', JSON.stringify({pathname, regexp:currentConfig.regexp}));
        console.log(`Pathname "${config.readConfig(`./config.json`).pathname}" set successfully`);
    })
    .option('-r, --regexp <queryParam>', 'Set path. Usage: `find-dir --regex "queryA queryB"`', (queryParam) => {
        finder.setRegex(queryParam);
        const currentConfig = config.readConfig('./config.json');
        config.writeConfig('./config.json', JSON.stringify({pathname:currentConfig.pathname,regexp:queryParam}));
        console.log(`Search query "${config.readConfig(`./config.json`).regexp}" set successfully`);
    })
    .option('-s, --search', 'Search the pathname with query parameters in config.json. Usage:`find-dir --search',()=>{
        const settings = config.readConfig('./config.json');
        finder.setPath(settings.pathname);
        finder.setRegex(settings.regexp);
        console.log(finder.search());
    })
    .option('-c, --config', 'Display current config', () => {
        const settings = config.readConfig('./config.json');
        finder.setPath(settings.pathname);
        finder.setRegex(settings.regexp);
        console.log(boxen(`Pathname:${finder.getPath()}\n\nRegExp:  ${finder.getRegex()}`, {padding:1}))
    });

if (!process.argv.slice(2).length) program.outputHelp();

program.parse(process.argv);