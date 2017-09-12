var Z80 = require('./Z80')
var MMU = require('./MMU')
var Bus = require('./Bus')


module.exports = class NodeBoy {
  constructor() {
    this.cpu = new Z80();
    this.mmu = new MMU();
    this.memoryAccessor = new Bus(this.mmu);
    this.cpu.assocPort('mmu', this.memoryAccessor)
  }
}
