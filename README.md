# find-dir


[![codecov](https://codecov.io/gh/chiamtc/find-dir/branch/master/graph/badge.svg)](https://codecov.io/gh/chiamtc/find-dir)
## Motivation
- Matches regex pattern in a directory or file name because Mac search is not up on par with Windows search

**So far run time is O(n)**

##Installation
```npm install --save find-dir```

## Usage
```$xslt
const Finder = require('find-dir');
const f = new Finder();

f.setPath(<valid path to search>);
f.setRegex('stringA stringB');

console.log(f.search());
```

##Installation CLI
```$xslt
npm install -g find-dir
```

##Usage CLI
### Setup directory to search
```$xslt
find-dir -p <valid path> 
or
find-dir --path <valid path>
```

### Check config
```$xslt
find-dir -c
or
find-dir --config
```

### Search
```find-dir search "stringA stringB"```

### Search, generate HTML file and copy file location link
```
find-dir search "stringA stringB" <valid output directory>

find-dir search "stringA stringB" ~/

``` 
Look for `<valid output directory>/find-dir.html`


##Development
`npm run cli` to launch CLI locally for validation testing

`npm run find` to use in NodeJs environment for validation testing

##Testing
`npm run test` to test all test suites and cases using Mocha

`npm run test:coverage` to test all test suites and cases using Mocha and generate coverage report `test/coverage` using Istanbul

### Testing Resources
Testing library - `mocha`, `chai`, `chai-string`, `assert`

Filesystem mock - `fsify`

Coverage Report - `nyc`

## Roadmap
- [x] cross-env this repo
- [x] Testing - 100%
- [x] Testing coverage with Istanbul report
- [x] set a config file so that user doesn't need to keep setting `path` and `regex`
- [x] ~~Take args as param~~ Take args using CLI
- [x] Make it as CLI
- [x] Open Summary in html and link of each source file
- [ ] different mode (strict, loose)
- [ ] Summary details in CLI

