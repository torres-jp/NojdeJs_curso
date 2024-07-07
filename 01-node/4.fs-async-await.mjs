/* eslint-disable n/handle-callback-err */
import { readFile } from 'node:fs/promises'

console.log('leyendo el primer archivo...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('primer texto:', text)
console.log(' ----> hacer cosas mientras esperamos...')

console.log('leyendo el segundo archivo...')
const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto:', text2)

