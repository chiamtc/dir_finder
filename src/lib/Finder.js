const fs = require('fs');
class Finder {
    #path = null;
    #regex = null;

    constructor() {
    }

    getRegex() {
        return this.#regex;
    }

    /**
     *
     * @param value:String with spaces in between keyword
     * @description
     * 1. current - strict - (?:.*<<queryA>> ... n ) source://source: https://stackoverflow.c`om/questions/520252/is-there-a-regular-expression-to-find-two-different-words-in-a-sentence
     * 2. next - loose - (?:<<queryA>>|...n)
     * @analysis
     * value is split using whitespace and loop each keyword and concatenate to final string
     * Big O notation - O(n)
     * @returns {string} | RegExp pattern
     */
    setRegex(value) {
        //TODO: more Regex setup
        try {
            const partial = value.split(" ").map(eachWord => `.*${eachWord}`);
            const full = `(?:${partial.join('')})`;
            this.#regex = new RegExp(full, "gi");
        } catch (e) {
            return 'Invalid "regex" type. Note: only string is allowed';
        }
    }

    getPath() {
        return this.#path;
    }

    setPath(value) {
        if (typeof (value) === 'string' && fs.existsSync(value)) this.#path = value;
        return new Error('Invalid "path" type. Note: only string is allowed');
    }

    dir() {
        if (fs.existsSync(this.#path)) return fs.readdirSync(this.#path);
        return "Invalid path";
    }

    /**
     * @description
     * Get an array of string and matches the RegExp pattern and return in Array<String>
     * @analysis
     * Array of string from dir() is being looped to search() the query.
     * Big O notation - O(n) for the loop &  O(1) for the regexp search()
     * @returns {string} | Array<String>
     */
    search() {
        if(this.getPath() !== null && this.getRegex() !== null) {
            let matches = [];
            const files = this.dir();
            if (files.length !== 0) {
                files.forEach((file) => {
                    file.match(this.#regex) !== null ? matches.push(file) : null;
                });
                return matches;
            }
            return "This directory is empty";
        }else{
            return "Path or Query have not been set";
        }
    }
}

module.exports = Finder;
