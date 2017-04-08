#!/usr/bin/env node

var download = require('download-git-repo')
var program = require('commander')
var path = require('path')
var chalk = require('chalk')
var log = require('../src/log.js')
var define = require('../src/define.js')
var config = require('./CONFIG.js')
var exec = require('child_process').exec
var exists = require('fs').existsSync
var parseArgs = require('../src/parseArgs.js')
var isContain = require('../src/utils.js').isContain

var sups = [
    'ng1',
    'ng2',
    'vue1',
    'vue2',
    'ts-vue1',
    'ts-vue2',
    'stylus',
    'sass',
    'node',
    'express'
]
