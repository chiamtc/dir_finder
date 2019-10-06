const fs = require('fs').promises;
const Finder = require('./src/lib/Finder');

const f = new Finder();
f.setPath(`path`);
f.setRegex('queryA queryB'); //TODO: move this to args param
console.log(f.search());

//TODO:
//loose
// const looseRegex = new RegExp('(?:queryA|queryB)', "gi");
