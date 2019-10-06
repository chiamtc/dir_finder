const HTML = require('../src/lib/HTML');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-string'));
const fs = require('fs');

describe('HTML test suite', () => {
    let html;
    beforeEach(() => {
        html = new HTML();
    });

    it('tests HTML instantiation and set path and results', () => {
        html.setPath('~/');
        html.setResults(['a', 'b', 'c']);
        assert.equal(html.getPath(), '~/')
        assert.equal(html.getResults().length, 3)
    });

    it('tests getCss()', () => {
        assert.isNotEmpty(html.getCss())
        assert.isString(html.getCss())
    });

    it('tests getHTML()', () => {
        html.setPath('~/');
        html.setResults(['a', 'b', 'c']);
        assert.isNotEmpty(html.getHTML());
        assert.isString(html.getHTML())
    });

    it('tests createHTMLFile()', () => {
        const outputPath =  '/Users/chiamtc/';
        html.setPath(outputPath);
        html.setResults(['a', 'b', 'c']);
        html.createHTMLFile(html.getHTML(), outputPath);
        assert.isTrue(fs.existsSync(outputPath+"find-dir.html"));
        fs.unlinkSync(outputPath+'find-dir.html');
    })
})