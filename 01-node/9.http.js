const http = require('node:http')
const { findFreePort } = require('./10.free-port.js')

const desirePort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hello World')
})

findFreePort(desirePort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
