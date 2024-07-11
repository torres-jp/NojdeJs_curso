const http = require('node:http')
const dittoJson = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJson))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon':
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 Not Found')
      }
      break
    default:
      res.statusCode = 405
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      return res.end('405 Method Not Allowed')
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Server is listening on port http://localhost:3000')
})
