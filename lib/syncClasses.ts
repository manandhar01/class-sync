import * as path from 'path'
import { execSync } from 'child_process'

const scanJobsScriptPath = path.normalize(`${__dirname}/../js/scan.jobs.js`)
console.log('processing jobs file')
execSync(`node ${scanJobsScriptPath}`, { stdio: 'inherit' })

const entityConstantsScriptPath = path.normalize(
  `${__dirname}/../js/entity.constants.js`
)
console.log('processing entity constants file')
execSync(`node ${entityConstantsScriptPath}`, { stdio: 'inherit' })

const scanClassesScriptPath = path.normalize(
  `${__dirname}/../js/scan.classes.js`
)
console.log('processing es6Classes file')
execSync(`node ${scanClassesScriptPath}`, { stdio: 'inherit' })

const scanIndexScriptPath = path.normalize(`${__dirname}/../js/scan.index.js`)
console.log('trying to set index file')
execSync(`node ${scanIndexScriptPath}`, { stdio: 'inherit' })

const removeIndexScriptPath = path.normalize(
  `${__dirname}/../js/remove.index.js`
)
console.log('trying to remove index file')
execSync(`node ${removeIndexScriptPath}`, { stdio: 'inherit' })

console.log('processing formatting of files')
execSync('prettier --config .prettierrc --write --loglevel error ./src', {
  stdio: 'inherit',
})
