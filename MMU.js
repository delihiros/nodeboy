module.exports = class MMU {
  constructor() {
    this.memory = [] // new Array((8 + 8) * 1000 * 8).fill(0)
  }
  readByte(addr) {
    return this.memory[addr]
  }
  readWord(addr) {
    return this.memory[addr] + this.memory[addr + 1]
  }
  writeByte(addr, data) {
    this.memory[addr] = data
  }
  writeWord(addr, data) {
    this.memory[addr] = data & 0b11110000
    this.memory[addr + 1] = data & 0b00001111
  }

  interact(message) {
    switch (message.op) {
      case 'readByte':
        return this.readByte(message.addr)
      case 'readWord':
        return this.readWord(message.addr)
      case 'writeByte':
        return this.writeByte(message.addr, message.data)
      case 'writeWord':
        return this.writeWord(message.addr, message.data)
    }
  }
}
