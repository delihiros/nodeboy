module.exports = class Bus {
  constructor(target) {
    this.target = target
  }

  send(message) {
    return this.target.interact(message)
  }
}
