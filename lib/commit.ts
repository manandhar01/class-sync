import * as readlineSync from 'readline-sync'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

const cwd = process.cwd()
const FILE = 'composer.json'
if (fs.existsSync(`${cwd}/${FILE}`)) {
  console.log('not running sync script')
} else {
  const syncClassesScript = path.normalize(`${__dirname}/syncClasses.js`)
  execSync(`node ${syncClassesScript}`, { stdio: 'inherit' })
}

// execSync('git pull', { stdio: 'inherit' })
execSync('git add .', { stdio: 'inherit' })

const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'
const YELLOW = '\x1b[34;5;11m'
const GREEN = '\x1b[32;5;11m'

const result = execSync('git ls-files -m', { encoding: 'utf-8' })

const files = result.split('\n').filter((file) => file !== '')

for (const file of files) {
  let res: string = readlineSync.question(
    `${BOLD}${YELLOW}${file} ${RESET} [y]`
  )
  if (!res) res = 'y'
  if (res === 'y' || res === 'Y') {
    execSync(`git add ${file}`)
    console.log(`Added file ${BOLD}${GREEN}${file} ${RESET}`)
    console.log('something')
  }
}

console.log('*************** staged files ***************')

const staged = execSync("git diff --name-only --cached | grep ''", {
  encoding: 'utf-8',
})

console.log(`${BOLD}${GREEN}${staged}${RESET}`)

const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
  encoding: 'utf-8',
}).trim()
const regex = /[A-Z]+-[0-9]+/g
const matches = branchName.match(regex)
const JIRA = matches ? matches[0] : ''

const MESSAGE = readlineSync.question(`commit for jira id ${JIRA} : `)

execSync(`git commit -m '${JIRA} #comment ${MESSAGE}'`, { stdio: 'inherit' })

execSync(`git push`, { stdio: 'inherit' })
