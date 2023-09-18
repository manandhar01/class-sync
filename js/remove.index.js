const fs = require('fs');
const utility = require('./utility.js');

const parentDir = process.cwd() + '/src';

function removeFromDirectory(module) {
    const directories = utility.getAllDirectories(parentDir + '/' + module);
    const files = utility.getAllFiles(parentDir + '/' + module);

    if (files.indexOf('index.ts') !== -1) fs.unlinkSync(`${parentDir}/${module}/index.ts`);

    directories.forEach((directory) => {
        const files = utility.getAllFiles(parentDir + '/' + module + '/' + directory);
        if (files.indexOf('index.ts') !== -1) {
            const file = `${parentDir}/${module}/${directory}/index.ts`;
            fs.unlinkSync(file);
        }
    });
}

function start() {
    const isPackage = utility.fileExists(process.cwd() + '/config/.slabs_package');
    if (isPackage) return;

    console.log(`Removing index files as this one is not package`);

    const modules = utility.getAllDirectories(parentDir);

    modules.forEach((module) => {
        removeFromDirectory(module);
    });
}

start();
