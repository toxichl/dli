#!/usr/bin/env node

var program = require('commander')
var define = require('../src/define.js')
var CONFIG = require('./CONFIG.js').tool
var log = require('../src/log.js')

define.usage(program, CONFIG.usage)
log.help(program, process)


