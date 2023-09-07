import * as readlineSync from 'readline-sync'
import * as fs from 'fs'
import * as path from 'path'
import { exec } from 'child_process'

const getFileName = (table: string): string => {
  const file = table.replace(/_/g, ' ')
  const capitalizedMessage = file
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join('')
  return capitalizedMessage
}

const writeMigrationFile = (tableName: string, iFileName: string) => {
  const cwd = process.cwd()
  const fileName = `${iFileName}${getFileName(tableName)}`

  const ts = Date.now()
  const mFileName = `${ts}-${fileName}Table.ts`
  const className = `${fileName}Table${ts}`

  const migrationFile = `${cwd}/src/migrations/${mFileName}`
  fs.copyFileSync(
    path.normalize(`${__dirname}/../stubs/migration.stub`),
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
