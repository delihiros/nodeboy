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
    this.port = {}

    this.register = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      h: 0,
      l: 0,
      pc: 0, // 0x100,
      sp: 0, // 0xfffe,
      m: 0, // clock for last instruction
      t: 0 // clock for last instruction
    }
    this.clock = {
      m: 0,
      t: 0
    }

    this.instructions = {
      0x00: this.NOP,
      0x06: this.LD_B_n,
      0x0e: this.LD_C_n,
      0x16: this.LD_D_n,
      0x1e: this.LD_E_n,
      0x26: this.LD_H_n,
      0x2e: this.LD_L_n,
    }
  }

  reset() {
    this.register = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      h: 0,
      l: 0,
      pc: 0,
      sp: 0,
      m: 0,
      t: 0
    }
    this.clock = {
      m: 0,
      t: 0
    }
  }

  assocPort(portName, bus) {
    this.port[portName] = bus
    console.log(this)
  }

  call(addr, args) {
    this.instructions[addr](this, ...args)
  }

  NOP(cpu) {}

  /*
    Instruction Parameters Opcode Cycles
     LD B,n 06 8
     LD C,n 0E 8
     LD D,n 16 8
     LD E,n 1E 8
     LD H,n 26 8
     LD L,n 2E 8
     */
  LD_B_n(cpu, n) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: n,
      data: cpu.register.b
    })
    cpu.register.m = 8
  }
  LD_C_n(cpu, n) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: n,
      data: cpu.register.c
    })
    cpu.register.m = 8
  }
  LD_D_n(cpu, n) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: n,
      data: cpu.register.d
    })
    cpu.register.m = 8
  }
  LD_E_n(cpu, n) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: n,
      data: cpu.register.e
    })
    cpu.register.m = 8
  }
  LD_H_n(cpu, n) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: n,
      data: cpu.register.h
    })
    cpu.register.m = 8
  }
  LD_L_n(cpu, n) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: n,
      data: cpu.register.l
    })
    cpu.register.m = 8
  }

  LD_A_A(cpu) {
    cpu.register.a = cpu.register.a
    cpu.register.m = 4
  }
  LD_A_B(cpu) {
    cpu.register.a = cpu.register.b
    cpu.register.m = 4
  }
  LD_A_C(cpu) {
    cpu.register.a = cpu.register.c
    cpu.register.m = 4
  }
  LD_A_D(cpu) {
    cpu.register.a = cpu.register.d
    cpu.register.m = 4
  }
  LD_A_E(cpu) {
    cpu.register.a = cpu.register.e
    cpu.register.m = 4
  }
  LD_A_H(cpu) {
    cpu.register.a = cpu.register.h
    cpu.register.m = 4
  }
  LD_A_L(cpu) {
    cpu.register.a = cpu.register.l
    cpu.register.m = 4
  }
  LD_A_BC(cpu) { // TODO
    cpu.register.a = cpu.register.b << 8 + cpu.register.c
    cpu.register.m = 8
  }
  LD_A_DE(cpu) { // TODO
    cpu.register.a = cpu.register.d << 8 + cpu.register.e
    cpu.register.m = 8
  }
  LD_A_HL(cpu) { // TODO
    cpu.register.a = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 8
  }
  LD_A_nn(cpu, nn) {
    cpu.register.a = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 16
  }
  LD_A_SHARP(cpu, sharp) {
    cpu.register.a = sharp
    cpu.register.m = 8
  }
  LD_B_A(cpu) {
    cpu.register.b = cpu.register.a
    cpu.register.m = 4
  }
  LD_B_B(cpu) {
    cpu.register.b = cpu.register.b
    cpu.register.m = 4
  }
  LD_B_C(cpu) {
    cpu.register.b = cpu.register.c
    cpu.register.m = 4
  }
  LD_B_D(cpu) {
    cpu.register.b = cpu.register.d
    cpu.register.m = 4
  }
  LD_B_E(cpu) {
    cpu.register.b = cpu.register.e
    cpu.register.m = 4
  }
  LD_B_H(cpu) {
    cpu.register.b = cpu.register.h
    cpu.register.m = 4
  }
  LD_B_L(cpu) {
    cpu.register.b = cpu.register.l
    cpu.register.m = 4
  }
  LD_B_HL(cpu) { // TODO
    cpu.register.b = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 8
  }
  LD_C_A(cpu) {
    cpu.register.c = cpu.register.a
    cpu.register.m = 4
  }
  LD_C_B(cpu) {
    cpu.register.c = cpu.register.b
    cpu.register.m = 4
  }
  LD_C_C(cpu) {
    cpu.register.c = cpu.register.c
    cpu.register.m = 4
  }
  LD_C_D(cpu) {
    cpu.register.c = cpu.register.d
    cpu.register.m = 4
  }
  LD_C_E(cpu) {
    cpu.register.c = cpu.register.e
    cpu.register.m = 4
  }
  LD_C_H(cpu) {
    cpu.register.c = cpu.register.h
    cpu.register.m = 4
  }
  LD_C_L(cpu) {
    cpu.register.c = cpu.register.l
    cpu.register.m = 4
  }
  LD_C_HL(cpu) { // TODO
    cpu.register.c = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 8
  }
  LD_D_A(cpu) {
    cpu.register.d = cpu.register.a
    cpu.register.m = 4
  }
  LD_D_B(cpu) {
    cpu.register.d = cpu.register.b
    cpu.register.m = 4
  }
  LD_D_C(cpu) {
    cpu.register.d = cpu.register.c
    cpu.register.m = 4
  }
  LD_D_D(cpu) {
    cpu.register.d = cpu.register.d
    cpu.register.m = 4
  }
  LD_D_E(cpu) {
    cpu.register.d = cpu.register.e
    cpu.register.m = 4
  }
  LD_D_H(cpu) {
    cpu.register.d = cpu.register.h
    cpu.register.m = 4
  }
  LD_D_L(cpu) {
    cpu.register.d = cpu.register.l
    cpu.register.m = 4
  }
  LD_D_HL(cpu) { // TODO
    cpu.register.d = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 8
  }
  LD_E_A(cpu) {
    cpu.register.e = cpu.register.a
    cpu.register.m = 4
  }
  LD_E_B(cpu) {
    cpu.register.e = cpu.register.b
    cpu.register.m = 4
  }
  LD_E_C(cpu) {
    cpu.register.e = cpu.register.c
    cpu.register.m = 4
  }
  LD_E_D(cpu) {
    cpu.register.e = cpu.register.d
    cpu.register.m = 4
  }
  LD_E_E(cpu) {
    cpu.register.e = cpu.register.e
    cpu.register.m = 4
  }
  LD_E_H(cpu) {
    cpu.register.e = cpu.register.h
    cpu.register.m = 4
  }
  LD_E_L(cpu) {
    cpu.register.e = cpu.register.l
    cpu.register.m = 4
  }
  LD_E_HL(cpu) { // TODO
    cpu.register.e = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 8
  }
  LD_H_A(cpu) {
    cpu.register.h = cpu.register.a
    cpu.register.m = 4
  }
  LD_H_B(cpu) {
    cpu.register.h = cpu.register.b
    cpu.register.m = 4
  }
  LD_H_C(cpu) {
    cpu.register.h = cpu.register.c
    cpu.register.m = 4
  }
  LD_H_D(cpu) {
    cpu.register.h = cpu.register.d
    cpu.register.m = 4
  }
  LD_H_E(cpu) {
    cpu.register.h = cpu.register.e
    cpu.register.m = 4
  }
  LD_H_H(cpu) {
    cpu.register.h = cpu.register.h
    cpu.register.m = 4
  }
  LD_H_L(cpu) {
    cpu.register.h = cpu.register.l
    cpu.register.m = 4
  }
  LD_H_HL(cpu) {
    cpu.register.h = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 8
  }
  LD_L_A(cpu) {
    cpu.register.l = cpu.register.a
    cpu.register.m = 4
  }
  LD_L_B(cpu) {
    cpu.register.l = cpu.register.b
    cpu.register.m = 4
  }
  LD_L_C(cpu) {
    cpu.register.l = cpu.register.c
    cpu.register.m = 4
  }
  LD_L_D(cpu) {
    cpu.register.l = cpu.register.d
    cpu.register.m = 4
  }
  LD_L_E(cpu) {
    cpu.register.l = cpu.register.e
    cpu.register.m = 4
  }
  LD_L_L(cpu) {
    cpu.register.l = cpu.register.l
    cpu.register.m = 4
  }
  LD_L_H(cpu) {
    cpu.register.l = cpu.register.h
    cpu.register.m = 4
  }
  LD_L_HL(cpu) {
    cpu.register.l = cpu.register.h << 8 + cpu.register.l
    cpu.register.m = 8
  }
  LD_BC_A(cpu) {
    cpu.register.b = 0
    cpu.register.c = cpu.register.a
    cpu.register.m = 8
  }
  LD_DE_A(cpu) {
    cpu.register.d = 0
    cpu.register.e = cpu.register.a
    cpu.register.m = 8
  }
  LD_HL_B(cpu) { // TODO
    cpu.register.h = 0
    cpu.register.l = cpu.register.b
    cpu.register.m = 8
  }
  LD_HL_C(cpu) { // TODO
    cpu.register.h = 0
    cpu.register.l = cpu.register.c
    cpu.register.m = 8
  }
  LD_HL_D(cpu) { // TODO
    cpu.register.h = 0
    cpu.register.l = cpu.register.d
    cpu.register.m = 8
  }
  LD_HL_E(cpu) { // TODO
    cpu.register.h = 0
    cpu.register.l = cpu.register.e
    cpu.register.m = 8
  }
  LD_HL_H(cpu) { // TODO
    cpu.register.h = 0
    cpu.register.l = cpu.register.h
    cpu.register.m = 8
  }
  LD_HL_L(cpu) { // TODO
    cpu.register.h = 0
    cpu.register.l = cpu.register.l
    cpu.register.m = 8
  }
  LD_HL_n(cpu, n) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: n,
      data: cpu.register.h << 8 + cpu.register.l
    })
    cpu.register.m = 12
  }
  LD_nn_A(cpu, nn) {
    cpu.port['mmu'].send({
      op: 'writeByte',
      addr: nn,
      data: cpu.register.a
    })
  }

}
