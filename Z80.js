// 参考に。http://imrannazar.com/GameBoy-Emulation-in-JavaScript
// Z80の資料 http://www.z80.info/zip/z80cpu_um.pdf
// GBに乗っているCPUは純粋なZ80ではないので、こちらの方が正確な可能性がある　http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf

var MMU = require('./MMU')

// 1 machine_cycle = 1.05 MHz
// 1 clock_cycle = 4.19 MHz
var gb_cpu_speed = 1050
var clock_cycle = 1
var machine_cycle = 4 * clock_cycle

module.exports = class Z80 {
  constructor() {
    this.register = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      h: 0,
      l: 0,
      pc: 0x100,
      sp: 0xfffe,
      m: 0, // clock for last instruction
      t: 0 // clock for last instruction
    }
    this.clock = {
      m: 0,
      t: 0
    }

    this.instructions = {
      0x06: LD_B_n,
      0x00: this.NOP
    }
  }

  NOP() {
    console.log("NOP")
  }

  /*
    Instruction Parameters Opcode Cycles
     LD B,n 06 8
     LD C,n 0E 8
     LD D,n 16 8
     LD E,n 1E 8
     LD H,n 26 8
     LD L,n 2E 8
     */
  LD_B_n(n) {}
}
