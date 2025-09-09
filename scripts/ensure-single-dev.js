const { execSync } = require('child_process')

try {
  if (process.platform === 'win32') {
    const out = execSync('netstat -ano | findstr ":3001"').toString()
    if (out.includes(':3001')) {
      console.log('[guard] Port 3001 is in use. Aborting second dev server.')
      process.exit(1)
    }
  } else {
    execSync('lsof -i :3001')
    console.log('[guard] Port 3001 is in use. Aborting second dev server.')
    process.exit(1)
  }
} catch {
  // Port 3001 is free — proceed
  console.log('[guard] Port 3001 is free. Proceeding with MCP API (dedicated) server.')
}
