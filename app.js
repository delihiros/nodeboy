var NodeBoy = require('./NodeBoy')

var nodeboy = new NodeBoy()

nodeboy.cpu.call(0x06, [0x1])
console.log(nodeboy)
