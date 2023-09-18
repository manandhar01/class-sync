const fs = require('fs');
var md5 = require('md5');
const utility = require('./utility.js');

const parentDir = process.cwd() + '/src';

const modules = utility.getModules(parentDir);
const entities = [];

modules.forEach((module) => {
    renameClass(module);
});

createFile();

function renameClass(module) {
    const directories = utility.getAllDirectories(parentDir + '/' + module);
    if (directories.indexOf('entities') === -1) return;

    const files = utility.getAllFiles(`${parentDir}/${module}/entities`);

    entities[module] = [];

    files.forEach((file) => {
        if (file.indexOf('index.ts') !== -1) return;
        entities[module].push(file);
    });
}

function createFile() {
    const imports = [];
    const hash = [];

    for (const [key, files] of Object.entries(entities)) {
        files.forEach((file) => {
            const className = utility.getClassName(file);

            imports.push(
                `import { ${className} } from '../${key}/entities/${file.slice(
                    0,
                    -3
                )}'`
            );

            const source = `${getTableName(key, file)}:${className}`;
            const md5Hash = md5(source);
            const md5String = `'${md5Hash}' : ${className}`;
            hash.push(md5String);
        });
    }
    var data = fs.readFileSync(
        __dirname + '/stubs/entity.constants.txt',
        'utf8'
    );
    data = data.replace('#CLASS_IMPORT#', imports.join(';'));
    data = data.replace('#MD5_ENTITIES#', hash.join(','));

    fs.writeFileSync(parentDir + '/config/entity.constants.ts', data);
}

function getTableName(key, file){
    const entityFileContents = fs.readFileSync(parentDir+`/${key}/entities/${file}`);
    const regex = /(?<=\@Entity\(\')(.*?)(?=\')/g;
    const found = entityFileContents.toString().match(regex);
    
    return found[0].toLowerCase();
}
