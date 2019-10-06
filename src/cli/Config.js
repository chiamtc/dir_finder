const fs= require('fs');

module.exports={
    readConfig(filename){
        return JSON.parse(fs.readFileSync(filename));
    },
    writeConfig(filename, data){
        return fs.writeFileSync(filename, data,{flag:'w'});
    }
};