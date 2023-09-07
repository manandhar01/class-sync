import * as readlineSync from 'readline-sync'
import * as fs from 'fs'
import { exec } from 'child_process'

const cwd = process.cwd()
// get inputs from the user against the required stuffs
const entity: string = readlineSync.question('Name of the Entity : ')
const dir: string = readlineSync.question('Name of the module : ')

console.log(entity)
console.log(dir)

// convert the given inputs to required converted variables
const file = entity
  .replace(/[A-Z]/g, (match) => `.${match}`)
  .replace(/^./g, '')
  .toLowerCase()
const sfile = entity.charAt(0).toLowerCase() + entity.slice(1)

// create directories and move to the working directory
const dirNames = ['dtos', 'libraries']

for (const dirName of dirNames) {
  const dirToMake = `${cwd}/src/${dir}/${dirName}`
  if (!fs.existsSync(dirToMake)) fs.mkdirSync(dirToMake, { recursive: true })
}

// process the dto stuff
const dtoFile = `${cwd}/src/${dir}/dtos/${file}.list.filter.dto.ts`
fs.copyFileSync(
  process.env.HOME +
    '/sites/personal/custom-personal-scripts/nestjs/listing.dto.stub',
  dtoFile
)
let data = fs.readFileSync(dtoFile, { encoding: 'utf8' })
data = data.replace(/#entity#/g, entity)
fs.writeFileSync(dtoFile, data)
console.log(`dto file : ${file}.list.filter.dto.ts`)

// process the processing listing stuff
const processFile = `${cwd}/src/${dir}/libraries/process.${file}.list.ts`
fs.copyFileSync(
  process.env.HOME +
    '/sites/personal/custom-personal-scripts/nestjs/process.list.stub',
  processFile
)
data = fs.readFileSync(processFile, { encoding: 'utf8' })
data = data.replace(/#entity#/g, entity)
fs.writeFileSync(processFile, data)
console.log(`process listing file : process.${file}.list.ts`)

exec(`code -r ${dtoFile}`)
exec(`code -r ${processFile}`)
