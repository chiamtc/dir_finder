const os = require('os');
const assert = require('chai').assert;
const config = require('../src/cli/Config');

const fsify = require('fsify')({
    cwd: os.tmpdir(),
    persistent: false,
    force: true
});

describe('Config test suite', () => {
    let structure, emptyStructure;

    beforeEach(() => {
        structure = [
            {
                type: fsify.FILE,
                name: 'config.json',
                contents: `{"pathname":"/Users/chiamtc/", "regexp":"(?:.*A.*B)"}`
            }
        ];
    });

    it('tests Config readConfig()', () => {
        return fsify(structure)
            .then((structure) => {
                const res = config.readConfig(structure[0].name);
                assert.isObject(res);
                assert.property(res, 'pathname');
                assert.property(res, 'regexp');
            })
    });

    it('tests Config writeConfig()', () => {
        return fsify(structure)
            .then((structure)=>{
                const newReg = "(?:.*A.*C)";
                const res = config.writeConfig(structure[0].name, `{"pathname":"/Users/chiamtc/", "regexp":"${newReg}"}` );
                const output = config.readConfig(structure[0].name);
                assert.equal(output.regexp, newReg);
            })
    })
});