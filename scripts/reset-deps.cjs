const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const targets = ['node_modules', 'package-lock.json', 'dist']

for (const target of targets) {
  const targetPath = path.join(root, target)
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true })
    console.log(`Removed ${target}`)
  }
}

console.log('Dependency artifacts reset. Run `npm install` next.')
