const fs = require('fs');

const getModules = function (directory) {
    const records = getAllDirectories(directory);
    const directories = [];

    records.forEach((file) => {
        const moduleFiles = getAllFiles(directory + '/' + file);

        moduleFiles.forEach((moduleFile) => {
            if (moduleFile.search('module.ts') !== -1) directories.push(file);
        });
    });

    return directories;
};

const fileExists = function (filePath) {
    return fs.existsSync(filePath);
};

const getAllFiles = function (scanDirectory, onlyDirectory = false) {
    return fs.readdirSync(scanDirectory, function (err, files) {
        return files;
    });
};

const getAllDirectories = function (scanDirectory) {
    const directories = [];
    const files = getAllFiles(scanDirectory);

    files.forEach((file) => {
        if (isDirectory(scanDirectory + '/' + file)) directories.push(file);
    });

    return directories;
};

const getOnlyFiles = function (scanDirectory) {
    const directories = [];
    const files = getAllFiles(scanDirectory);

    files.forEach((file) => {
        if (!isDirectory(scanDirectory + '/' + file)) directories.push(file);
    });

    return directories;
};

const isDirectory = function (path) {
    if (fs.lstatSync(path).isDirectory()) return true;

    return false;
};

const getClassName = function (fileName) {
    fileName = fileName.slice(0, -3);
    const words = fileName.split('.');

    const className = [];
    words.forEach((word) => {
        className.push(ucWord(word));
    });

    return className.join('');
};

const ucWord = function (str) {
    return (str + '').replace(/^(.)|\s+(.)/g, function ($1) {
        return $1.toUpperCase();
    });
};

const smallFirst = function (str) {
    return (str + '').replace(/^(.)|\s+(.)/g, function ($1) {
        return $1.toLowerCase();
    });
};

const readFileContents = function (path) {
    return fs.readFileSync(path);
};

const getPackageName = function(){
    const packageContents = fs.readFileSync(process.cwd() + '/package.json');
    const j = JSON.parse(packageContents);

    return j.name;
}
const isPackage = function(){
    return fileExists(process.cwd() + '/config/.slabs_package');
}

module.exports = {
    getModules,
    getAllFiles,
    getAllDirectories,
    getClassName,
    ucWord,
    smallFirst,
    isDirectory,
    readFileContents,
    getOnlyFiles,
    fileExists,
    getPackageName,
    isPackage
};
