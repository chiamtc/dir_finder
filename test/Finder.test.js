const os = require('os');
const assert = require('chai').assert;
const finder = require('../src/Finder');
const fsify = require('fsify')({
    cwd: os.tmpdir(),
    persistent: false,
    force: true
});

describe('Finder test suite', () => {
    let Finder, structure, emptyStructure;

    beforeEach(() => {
        Finder = new finder();
        structure = [
            {
                type: fsify.DIRECTORY,
                name: 'downloads',
                contents: [
                    {
                        type: fsify.DIRECTORY,
                        name: 'Some File A',
                        contents: [
                            {
                                type: fsify.FILE,
                                name: 'mp4 file',
                                contents: 'encoded mp4'
                            }
                        ]
                    },
                    {
                        type: fsify.DIRECTORY,
                        name: 'Exact File B',
                        contents: [
                            {
                                type: fsify.FILE,
                                name: 'mp4 file b',
                                contents: 'encoded mp4'
                            }
                        ]
                    },
                    {
                        type: fsify.DIRECTORY,
                        name: 'Partial Encoded File C',
                        contents: [
                            {
                                type: fsify.FILE,
                                name: 'mp4 file b',
                                contents: 'encoded mp4'
                            }
                        ]
                    },
                    {
                        type: fsify.DIRECTORY,
                        name: 'Fully Encoded File D',
                        contents: [
                            {
                                type: fsify.FILE,
                                name: 'mp4 file b',
                                contents: 'encoded mp4'
                            }
                        ]
                    },
                    {
                        type: fsify.DIRECTORY,
                        name: 'Some File E',
                        contents: [
                            {
                                type: fsify.FILE,
                                name: 'mp4 file',
                                contents: 'encoded mp4'
                            }
                        ]
                    },
                    {
                        type: fsify.DIRECTORY,
                        name: 'Exact File F',
                        contents: [
                            {
                                type: fsify.FILE,
                                name: 'mp4 file b',
                                contents: 'encoded mp4'
                            }
                        ]
                    },
                ]
            }
        ];
        emptyStructure = [
            {
                type: fsify.DIRECTORY,
                name: 'downloads',
                contents: []
            }
        ]
    });

    it('tests Finder match() with empty inside directory', () => {
        return fsify(emptyStructure)
            .then((structure) => structure)
            .then((output) => {
                Finder.setPath(output[0].name);
                Finder.setRegex("Some File");
                assert.equal(Finder.match(), 'This directory is empty');
            });
    })

    it('tests Finder setPath()', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => {
                Finder.setPath(output[0].name);
                const finderPath = Finder.getPath();
                const split = finderPath.split('/');
                assert.equal(split[split.length - 1], structure[0].name);
            });
    });

    it('tests Finder setPath() to with invalid value type', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => assert.equal(Finder.setPath(1234), 'Error: Invalid "path" type. Note: only string is allowed'));
    });

    it('tests Finder setRegex()', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => {
                Finder.setPath(output[0].name);
                Finder.setRegex("Some File");
                assert.equal(Finder.getRegex(), '/(?:.*Some.*File)/gi')
            });
    })

    it('tests Finder setRegex with invalid values()', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => {
                Finder.setPath(output[0].name);
                assert.equal(Finder.setRegex(1234), 'Invalid "regex" type. Note: only string is allowed');
                assert.isNull(Finder.getRegex());
            });
    })

    it('tests Finder dir() to have same length as pre-defined fs structure', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => {
                Finder.setPath(output[0].name);
                assert.equal(Finder.dir().length, structure[0].contents.length);
            });
    });

    it('tests Finder dir() to not get invalid path read', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => {
                Finder.setPath('invalid fs path');
                assert.equal(Finder.dir(), 'Invalid path');
            });
    });

    it('tests Finder match() without setting path or regex', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => {
                assert.equal(Finder.match(), "Path or Query have not been set");
            });
    });

    it('tests Finder match()', () => {
        return fsify(structure)
            .then((structure) => structure)
            .then((output) => {
                Finder.setPath(output[0].name);
                Finder.setRegex("Some File");
                assert.equal(Finder.match().length, 2);
                assert.equal(Finder.match()[0], structure[0].contents[0].name);
                assert.equal(Finder.match()[1], structure[0].contents[4].name);
            });
    });
});
