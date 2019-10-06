#!/usr/bin/env node
"use strict";
const program = require('commander');
const boxen = require('boxen');
const path = require('path');
const chalk = require('chalk');
const pkg = require('../package');
let finder = new (require('../src/lib/Finder'));
let HTML = require('../src/lib/HTML');
let config = require('../src/cli/Config');

program
    .version(pkg.version, '-v, --ver', 'Current version')
    .name("find-dir")
    .usage("[option flag] [value]")
    .description(pkg.description)
    .helpOption('-h, --help', 'Output help information')
    .option('-p, --path <pathname>', `Set path. Usage: ${chalk.bgRedBright('find-dir --path ~/Desktop')}`, (pathname) => {
        finder.setPath(pathname);
        config.writeConfig(path.join(__dirname, '../config.json'), JSON.stringify({pathname}));
        console.log(`Pathname "${config.readConfig(`./config.json`).pathname}" set successfully`);
    })
    .option('-c, --config', `Display current config. Usage: ${chalk.bgRedBright('find-dir --config')}`, () => {
        const settings = config.readConfig(path.join(__dirname, '../config.json'));
        finder.setPath(settings.pathname);
        console.log(boxen(`Pathname:${finder.getPath()}`, {padding: 1}))
    });

program
    .command('search <queryParam> [outputPath]')
    .description(`Search the pathname with query parameters. \n\t\t\t\t    Usage: ${chalk.bgRedBright('find-dir search "queryA queryB"')} returns Array of found results.\n\t\t\t\t    Optional Usage: ${chalk.bgRedBright('find-dir search "queryA queryB" ~/' )} generates find-dir.html file with a list of results and ability to copy file location`)
    .action((queryParam, cmdObj) => {
        const settings = config.readConfig(path.join(__dirname, '../config.json'));
        finder.setPath(settings.pathname);
        finder.setRegex(queryParam);
        const results = finder.search();
        console.log(results);
        if (cmdObj !== undefined) {
            const html = new HTML();
            html.setPath(settings.pathname);
            html.setResults(results);
            const htmlpage = html.getHTML(results);
            html.createHTMLFile(htmlpage, cmdObj);
            console.log('Checkout '+ chalk.bgRedBright(`${cmdObj}find-dir.html`) + ' for summarized output');
        }
    });

if (!process.argv.slice(2).length) program.outputHelp();

program.parse(process.argv);