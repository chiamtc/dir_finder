const fs = require('fs');

const files = fs.readdirSync(`/Volumes/TC/downloads`);

//source: https://stackoverflow.com/questions/520252/is-there-a-regular-expression-to-find-two-different-words-in-a-sentence
var regex = new RegExp('(?:.*queryA.*queryB)', "gi");
//loose
var looseRegex = new RegExp('(?:queryA|queryB)', "gi");
let a = [];
files.forEach((file)=>{
    file.match(regex) !== null ? a.push(file): null;
});

console.log(a)


