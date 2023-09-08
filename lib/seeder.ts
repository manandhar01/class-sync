import * as readlineSync from 'readline-sync'
import * as fs from 'fs'
import * as path from 'path'
import { exec } from 'child_process'

const writeMigrationFile = (tableName: string, iFileName: string) => {
  const cwd = process.cwd()
  const fileName = `${iFileName}DataSeeder`

  const ts = Date.now()
  const mFileName = `${ts}-${fileName}Table`
  const className = `${fileName}Table${ts}`

  const migrationFile = `${cwd}/src/migrations/${mFileName}.ts`

  if (!fs.existsSync(`${cwd}/src/migrations`))
    fs.mkdirSync(`${cwd}/src/migrations`)

  fs.copyFileSync(
    path.normalize(`${__dirname}/../stubs/seeder.stub`),
    migrationFile
  )
  let data: string = fs.readFileSync(migrationFile, { encoding: 'utf8' })
  data = data
    .replace(/#table#/g, tableName)
    .replace(/#migrationclass#/g, className)
  fs.writeFileSync(migrationFile, data)

  exec(`code -r ${migrationFile}`)
}

const getInput = () => {
  const tableName: string = readlineSync.question(
    'What is the name of the table : '
  )
  const fileName: string = readlineSync.question(
    'name of the migration file : '
  )

  writeMigrationFile(tableName, fileName)
}

getInput()
