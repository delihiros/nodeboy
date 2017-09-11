module.exports = class MMU {
  constructor() {
    this.memory = []
  }
  readByte(addr) {
    return this.memory[addr]
  }
  readWord(addr) {
    return this.memory[addr] + this.memory[addr + 1]
  }
  writeByte(addr, data) {
    return this.memory[addr] = data
  }
  writeWord(addr, data) {
    // TODO
    return this.memory[addr] = data
  }

  receive(message) {
    switch (message.op) {
      case 'readByte':
        return readByte(message.addr)
      case 'readWord':
        return readWord(message.addr)
      case 'writeByte':
        return writeByte(message.addr, message.data)
      case 'writeWord':
        return writeWord(message.addr, message.data)
    }
  }
}
