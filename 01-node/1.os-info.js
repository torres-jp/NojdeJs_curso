const os = require('node:os')

console.log('Informacion del sistema operativo:')
console.log('Nombre del sistema operativo:', os.platform())
console.log('Versión del sistema operativo:', os.release())
console.log('Arquitectura del sistema operativo:', os.arch())
console.log('Nombre de usuario del sistema operativo:', os.userInfo().username)
console.log('CPUs', os.cpus())
