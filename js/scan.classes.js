const { dir } = require('console');
const fs = require('fs');
const { exit } = require('process');
const utility = require('./utility.js');

const parentDir = process.cwd() + '/src';
const modules = utility.getModules(parentDir);

modules.forEach((module) => {
    setJobsClass(module);
    exit;
});

function setJobsClass(module) {
    const directories = utility.getAllDirectories(parentDir + '/' + module);
    const objects = [];

    directories.forEach((directory) => {
        objects[directory] = [];
        const files = utility.getAllFiles(parentDir + '/' + module + '/' + directory);

        files.forEach((file) => {
            if (file.indexOf('index.ts') !== -1) return;
            if (file.indexOf('interface.ts') !== -1) return;
            if (file.indexOf('spec.ts') !== -1) return;

            objects[directory].push(file);
        });
    });

    createFile(module, objects);
}

function createFile(module, objects) {
    let data = fs.readFileSync(__dirname + '/stubs/es6.classes.txt', 'utf8');

    const imports = [];
    const maps = [];

    for (const [key, files] of Object.entries(objects)) {
        const cls = [];
        files.forEach((file) => {
            const className = utility.getClassName(file);
            imports.push(`import { ${className} } from './${key}/${file.slice(0, -3)}'`);

            cls.push(className);
        });

        maps.push(`${key}:[${cls.join(',')}]`);
    }

    data = data.replace('#CLASS_IMPORT#', imports.join(';'));
    data = data.replace('#CLASS_MAPS#', maps.join(','));

    fs.writeFileSync(parentDir + '/' + module + '/es6.classes.ts', data);
}
