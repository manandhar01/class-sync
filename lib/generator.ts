const readlineSync = require('readline-sync')
const fs = require('fs')
const { exec } = require('child_process')

// get inputs from the user against the required stuffs
const entity: string = readlineSync.question('Name of the Entity : ')
const tab: string = readlineSync.question('Name of the table : ')
const dir: string = readlineSync.question('Name of the module : ')
let listing: string = readlineSync.question('Should enable listing [Y/n] : ')
let controller: string = readlineSync.question('Create controller [Y/n] : ')

// convert the given inputs to required converted variables
const table = tab.replace('dz_', 'sys_')
const timestamp = Date.now()
const file = entity
  .replace(/[A-Z]/g, (match) => `.${match}`)
  .replace(/^./g, '')
  .toLowerCase()
const sfile = entity.charAt(0).toLowerCase() + entity.slice(1)

if (!listing) listing = 'y'
if (!controller) controller = 'y'

// create directories and move to the working directory
const dirNames = [
  'entities',
  'jobs',
  'subscribers',
  'services',
  'controllers',
  'dtos',
  'libraries',
]

for (const dirName of dirNames) {
  const dirToMake = `src/${dir}/${dirName}`
  if (!fs.existsSync(dirToMake)) fs.mkdirSync(dirToMake, { recursive: true })
}

// process the entity stuff
const entityFile = `./src/${dir}/entities/${file}.entity.ts`
fs.copyFileSync(
  process.env.HOME +
    '/sites/personal/custom-personal-scripts/nestjs/entity.stub',
  entityFile
)
let data: string = fs.readFileSync(entityFile, { encoding: 'utf8' })
data = data
  .replace(/#table#/g, table)
  .replace(/#file#/g, file)
  .replace(/#entity#/g, entity)
fs.writeFileSync(entityFile, data)

exec(`code -r ${entityFile}`)
console.log(`entity file : ${file}.entity.ts`)

// creating the migration file
const migrationFileName = `${timestamp}-Create${entity}Table.ts`
const migrationClassName = `Create${entity}Table${timestamp}`
const migrationFile = `./src/migrations/${migrationFileName}`
fs.copyFileSync(
  process.env.HOME +
    '/sites/personal/custom-personal-scripts/nestjs/migration.stub',
  migrationFile
)
data = fs.readFileSync(migrationFile, { encoding: 'utf8' })
data = data
  .replace(/#table#/g, table)
  .replace(/#migrationclass#/g, migrationClassName)
fs.writeFileSync(migrationFile, data)

exec(`code -r ${migrationFile}`)
console.log(`migration file : ${migrationFileName}`)

// process the job stuff
const jobFile = `./src/${dir}/jobs/${file}.job.ts`
fs.copyFileSync(
  process.env.HOME + '/sites/personal/custom-personal-scripts/nestjs/job.stub',
  jobFile
)
data = fs.readFileSync(jobFile, { encoding: 'utf8' })
data = data.replace(/#entity#/g, entity).replace(/#file#/g, file)
fs.writeFileSync(jobFile, data)

// process subscriber stuff
const subscriberFile = `./src/${dir}/subscribers/${file}.subscriber.ts`
fs.copyFileSync(
  process.env.HOME +
    '/sites/personal/custom-personal-scripts/nestjs/subscriber.stub',
  subscriberFile
)
data = fs.readFileSync(subscriberFile, { encoding: 'utf8' })
data = data
  .replace(/#entity#/g, entity)
  .replace(/#file#/g, file)
  .replace(/#sfile#/g, sfile)
fs.writeFileSync(subscriberFile, data)

// process the dto attributes stuff
const dtoFile = `./src/${dir}/dtos/${file}.attributes.dto.ts`
fs.copyFileSync(
  process.env.HOME +
    '/sites/personal/custom-personal-scripts/nestjs/dto_attribute.stub',
  dtoFile
)
data = fs.readFileSync(dtoFile, { encoding: 'utf8' })
data = data.replace(/#entity#/g, entity)
fs.writeFileSync(dtoFile, data)

// process the generic listing one
if (listing === 'y' || listing === 'Y') {
  // process the dto stuff
  const dtoListingFile = `./src/${dir}/dtos/${file}.list.filter.dto.ts`
  fs.copyFileSync(
    process.env.HOME +
      '/sites/personal/custom-personal-scripts/nestjs/listing.dto.stub',
    dtoListingFile
  )
  data = fs.readFileSync(dtoListingFile, { encoding: 'utf8' })
  data = data.replace(/#entity#/g, entity)
  fs.writeFileSync(dtoListingFile, data)
  console.log(`dto file : ${file}.list.filter.dto.ts`)

  // process the processing listing stuff
  const listFile = `./src/${dir}/libraries/${file}.list.ts`
  fs.copyFileSync(
    process.env.HOME +
      '/sites/personal/custom-personal-scripts/nestjs/process.list.stub',
    listFile
  )
  data = fs.readFileSync(listFile, { encoding: 'utf8' })
  data = data.replace(/#entity#/g, entity)
  fs.writeFileSync(listFile, data)

  console.log(`process listing file : ${file}.list.ts`)

  exec(`code -r ${listFile}`)
  exec(`code -r ${dtoListingFile}`)
}

// process the controller
if (controller === 'y' || controller === 'Y') {
  // process the controller stuff
  const controllerFile = `./src/${dir}/controllers/${file}.controller.ts`
  fs.copyFileSync(
    process.env.HOME +
      '/sites/personal/custom-personal-scripts/nestjs/controller.stub',
    controllerFile
  )
  data = fs.readFileSync(controllerFile, { encoding: 'utf8' })
  data = data.replace(/#entity#/g, entity).replace(/#table#/g, table)
  fs.writeFileSync(controllerFile, data)
}
