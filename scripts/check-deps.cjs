const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const expectedVite = pkg.dependencies?.vite || pkg.devDependencies?.vite
const vitePkgPath = path.join(root, 'node_modules', 'vite', 'package.json')

function fail(message) {
  console.error(`\n[School ERP dependency check]\n${message}\n`)
  process.exit(1)
}

if (!fs.existsSync(vitePkgPath)) {
  fail('Vite is not installed yet. Run `npm install`, then run this command again.')
}

const installedVite = JSON.parse(fs.readFileSync(vitePkgPath, 'utf8')).version

if (expectedVite && installedVite !== expectedVite) {
  fail(
    `Installed Vite is ${installedVite}, but package.json requires ${expectedVite}.\n` +
      'This usually means node_modules/package-lock.json is stale and can trigger the Rollup/Rolldown native binding error.\n' +
      'Fix it with:\n\n' +
      '  npm run reset:deps\n' +
      '  npm install\n'
  )
}

console.log(`[School ERP dependency check] OK - Vite ${installedVite} matches package.json.`)
