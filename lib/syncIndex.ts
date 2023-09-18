import * as path from 'path'
import { execSync } from 'child_process'

const scanIndexScriptPath = path.normalize(`${__dirname}/../js/scan.index.js`)
execSync(`node ${scanIndexScriptPath}`, { stdio: 'inherit' })
execSync('prettier --config .prettierrc --write --loglevel error ./src', {
  stdio: 'inherit',
})
