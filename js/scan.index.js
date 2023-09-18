const fs = require('fs');
const { exit } = require('process');
const utility = require('./utility.js');

const parentDir = process.cwd() + '/src';
const filesToExclude = ['es6.service.ts', 'es6.jobs.service.ts', 'index.ts', 'es6.classes.ts'];

function start() {
    if (!utility.isPackage()) return;

    console.log(`Package Found: setting up index files`);
    const modules = utility.getModules(parentDir);

    modules.forEach((module) => {
        setModule(module);
        exit;
    });
}

function setModule(module) {
    setIndex(parentDir, module);
}

function setIndex(parent, dir) {
    const location = `${parent}/${dir}`;
    const directories = utility.getAllDirectories(location);
    const files = utility.getOnlyFiles(location);

    const records = [];

    for (const file of directories) {
        if (filesToExclude.includes(file.toLowerCase())) continue;
        let f = file.replace('.ts', '');
        records.push(`export * from './${f}'`);
    }

    for (const file of files) {
        if (filesToExclude.includes(file.toLowerCase())) continue;
        if (file.toLowerCase().includes('spec.ts')) continue;

        let f = file.replace('.ts', '');

        records.push(`export * from './${f}'`);
    }

    fs.writeFileSync(`${location}/index.ts`, records.join(';'));

    for (const file of directories) {
        setIndex(location, file);
    }
}

start();
