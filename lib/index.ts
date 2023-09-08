import { Command } from 'commander'
import { exec } from 'child_process'

const program = new Command()

program.version('1.0.0').description('CLI Tool for generating nestjs files')

program
  .command('generator')
  .description('Run generator script')
  .action(() => {
    exec(`node dist/generator.js`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing generator: ${error.message}`)
        process.exit(1)
      }
      console.log(stdout)
    })
  })

program
  .command('listing')
  .description('Run listing script')
  .action(() => {
    exec(`node dist/listing.js`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing listing: ${error.message}`)
        process.exit(1)
      }
      console.log(stdout)
    })
  })

program
  .command('migrator')
  .description('Run migrator script')
  .action(() => {
    exec(`node dist/migrator.js`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing migrator: ${error.message}`)
        process.exit(1)
      }
      console.log(stdout)
    })
  })

program
  .command('seeder')
  .description('Run seeder script')
  .action(() => {
    exec(`node dist/seeder.js`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing seeder: ${error.message}`)
        process.exit(1)
      }
      console.log(stdout)
    })
  })

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

program.parse()
