#!/usr/bin/env node

var program = require('commander')
var path = require('path')
var define = require('../src/define.js')
var CONFIG = require('./CONFIG.js').tool
var log = require('../src/log.js')

define.usage(program, CONFIG.usage)
define.help(program, CONFIG.help)
log.help(program, process)

console.log(program.args)

var toolDir = path.resolve(__dirname, '../tool')
var tootName = program.args

function log() {
  console.log(toolDir)
  console.log(tootName)
}

if (program.args.length === 0) {
  log()
}