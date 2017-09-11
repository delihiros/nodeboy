var Z80 = require('./Z80')
var MMU = require('./MMU')

module.exports = class NodeBoy {
  constructor() {
    this.cpu = new Z80();
    this.mmu = new MMU();
  }
}
