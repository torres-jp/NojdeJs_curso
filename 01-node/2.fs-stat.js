const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(), // true
  stats.isDirectory(), // false
  stats.isSymbolicLink(), //, false
  stats.size
)
