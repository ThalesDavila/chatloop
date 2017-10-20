const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const path = require('path');
path.join('node_modules', 'chatloop', 'development', 'context');
const file = path.join(
    'node_modules', 
    'chatloop',
    'development',
    'context',
    'context.json'
);

exports.Read = async function() {   
    return readFile(file, 'utf8')    
}
exports.Update = async function(change) {
    const change_stringified = JSON.stringify(change)
    return writeFile(file, change_stringified, 'utf8') 
}
exports.Delete = async function() {
    const change_stringified = JSON.stringify({
        
    })
    return writeFile(file, change_stringified, 'utf8') 
}