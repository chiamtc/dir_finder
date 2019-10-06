const fs = require('fs').promises;
const Finder = require('../src/lib/Finder');

const f = new Finder();
f.setPath(`path`);
f.setRegex('queryA queryB');
console.log(f.search());
//returns ['file1', 'file2'....];


//TODO:
//loose
// const looseRegex = new RegExp('(?:queryA|queryB)', "gi");
