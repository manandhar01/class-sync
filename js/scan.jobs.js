const fs = require('fs');
const md5 = require('md5');

const dir = process.cwd();
const parentDir = dir + '/src';
const utility = require('./utility.js');
const isMainPackage = dir.split('/').slice(-1)[0] === 'nestjs-utility-services';

const modules = utility.getModules(parentDir);

modules.forEach((module) => {
    setJobsClass(module);
});

function setJobsClass(module) {
    const directories = utility.getAllDirectories(parentDir + '/' + module);

    if (directories.indexOf('jobs') === -1) return;
    if (directories.indexOf('services') === -1) return;

    const jobFiles = [];

    // get all files of the jobs one
    const jobsFile = utility.getAllFiles(parentDir + '/' + module + '/jobs');
    jobsFile.forEach((jobsFile) => {
        if (jobsFile.indexOf('index.ts') !== -1) return;

        jobFiles.push(jobsFile);

        // const className = utility.getClassName(jobsFile);
        // jobClasses.push(className);

        // jobs[className] = jobsFile;
    });

    createFile(module, jobFiles);
}

function createFile(module, jobFiles) {
    const constructorImports = [];
    const md5Imports = [];
    const imports = [];

    for(const file of jobFiles){
        const className = utility.getClassName(file);
        const varName = utility.smallFirst(className);

        const hash = md5(`${module}:${className}`);
        const md5String = `'${hash}' : this.${varName}`;
        const constructorString = `private readonly ${varName}: ${className}`;

        constructorImports.push(constructorString);
        md5Imports.push(md5String);
        imports.push(`import { ${className} } from '../jobs/${file.slice(0, -3)}'`);

        setJobHashOnFile(module, file, hash);
    }

    let data = fs.readFileSync(__dirname + '/stubs/es6.jobs.txt', 'utf8');

    data = data.replace('#CLASS_IMPORT#', imports.join(';'));
    data = data.replace('#CONSTRUCTOR_IMPORT#', constructorImports.join(','));
    data = data.replace('#MD5_JOBS#', md5Imports.join(','));

    if (isMainPackage) data = data.replace('#PROPERTY_SERVICE_PATH#', `import { PlatformUtility } from '../../common/libraries/platform.utility';`);
    
    else data = data.replace('#PROPERTY_SERVICE_PATH#', `import { PlatformUtility } from '@servicelabsco/nestjs-utility-services';`);

    fs.writeFileSync(parentDir + '/' + module + '/services/es6.jobs.service.ts', data);
}

function setJobHashOnFile(module, fileName, hash){
    const path = `${parentDir}/${module}/jobs/${fileName}`;
    
    const data = fs.readFileSync(path).toString('utf-8');
    const str = data.replace(/super(.*)/g,`super('${hash}')`);

    fs.writeFileSync(path, str);
}
