import { Command } from 'commander'
import { exec } from 'child_process'
import * as path from 'path'

const program = new Command()
const scriptDirectory = path.join(__dirname, '../dist')

program.version('1.0.0').description('CLI Tool for generating nestjs files')

program
  .command('generator')
  .description('Run generator script')
  .action(() => {
    exec(
      `node ${path.join(scriptDirectory, 'generator.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing generator: ${error.message}`)
          process.exit(1)
        }
        console.log(stdout)
      }
    )
  })

program
  .command('listing')
  .description('Run listing script')
  .action(() => {
    exec(
      `node ${path.join(scriptDirectory, 'listing.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing listing: ${error.message}`)
          process.exit(1)
        }
        console.log(stdout)
      }
    )
  })

program
  .command('migrator')
  .description('Run migrator script')
  .action(() => {
    exec(
      `node ${path.join(scriptDirectory, 'migrator.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing migrator: ${error.message}`)
          process.exit(1)
        }
        console.log(stdout)
      }
    )
  })

program
  .command('seeder')
  .description('Run seeder script')
  .action(() => {
    exec(
      `node ${path.join(scriptDirectory, 'seeder.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing seeder: ${error.message}`)
          process.exit(1)
        }
        console.log(stdout)
      }
    )
  })

program
  .command('syncClasses')
  .description('Run syncClasses script')
  .action(() => {
    exec(
      `node ${path.join(scriptDirectory, 'syncClasses.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing syncClasses: ${error.message}`)
          process.exit(1)
        }
        console.log(stdout)
      }
    )
  })

program
  .command('syncIndex')
  .description('Run syncIndex script')
  .action(() => {
    exec(
      `node ${path.join(scriptDirectory, 'syncIndex.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing syncIndex: ${error.message}`)
          process.exit(1)
        }
        console.log(stdout)
      }
    )
  })

program
  .command('commit')
  .description('Run commit script')
  .action(() => {
    exec(
      `node ${path.join(scriptDirectory, 'commit.js')}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing commit: ${error.message}`)
          process.exit(1)
        }
        console.log(stdout)
      }
    )
  })

program.parse()
