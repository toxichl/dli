#!/usr/bin/env node

var program = require('commander')
var define = require('../src/define.js')
var CONFIG = require('./CONFIG.js').tool
var log = require('../src/log.js')

define.usage(program, CONFIG.usage)
define.usage(program, CONFIG.help)
log.help(program, process)


