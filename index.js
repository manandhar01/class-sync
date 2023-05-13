#! /usr/bin/env node
const program = require("commander");
const { name, version } = require(__dirname + "/package.json");
const chalk = require("chalk");

// Check version
const lastestVersion = require("latest-version");
const semver = require("semver");

program
    .version(version)

    .option("-n, --name [name]", "class name [My Class Name]", "My Class Name")
    .option("-f, --file [token]", "class file", process.env.FILE)
    .parse(process.argv);

console.info(
    chalk.blueBright(
        "Sync Classes v" + version + " - (c) 2017-2021 SyncClass.sh Inc."
    )
);

// lastestVersion(name).then(function (newestVersion) {
//     if (semver.gt(newestVersion, version)) {
//         console.error(
//             chalk.yellow(
//                 "New version " +
//                     version +
//                     " of sync class available, please upgrade with yarn global add sync-classes"
//             )
//         );
//     }
if (!program.file) {
    console.error(
        chalk.red(
            `ERROR: A valid file is required, use either FILE env or pass it with -f`
        )
    );
    process.exit();
}

const { Index } = require("./dist/index");
Index(program.name, program.file);
// });
