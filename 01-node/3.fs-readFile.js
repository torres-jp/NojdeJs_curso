/* eslint-disable n/handle-callback-err */
const fs = require('node:fs')

console.log('leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log(text)
})

console.log('pausando...')

console.log('leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text2) => {
  console.log(text2)
})
