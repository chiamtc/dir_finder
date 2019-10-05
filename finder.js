const fs = require('fs');

const files = fs.readdirSync(`/Volumes/TC/downloads`);

var regex = new RegExp('(?:.*queryA.*queryB)', "gi");
//loose
var looseRegex = new RegExp('(?:queryA|queryB)', "gi");
let a = [];
files.forEach((file)=>{
    file.match(regex) !== null ? a.push(file): null;
});

console.log(a)


