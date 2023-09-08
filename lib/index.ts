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

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse()
