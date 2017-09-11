module.exports = class Wire {
  constructor(source, target) {
    this.source = source
    this.target = target
  }

  send(message) {
    return this.target.receive(message)
  }
}
