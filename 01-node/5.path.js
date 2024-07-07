const path = require('node:path')

console.log(path.sep)

const filePath = path.join('content', 'subfolder', 'file.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const extension = path.extname('image.png')
console.log(extension)
