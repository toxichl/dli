#!/usr/bin/env node

var download = require('download-git-repo')
var program = require('commander')
var exists = require('fs').existsSync
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var log = require('../src/log.js')
var define = require('../src/define.js')
var config = require('./CONFIG.js')
var exec = require('child_process').exec
var exists = require('fs').existsSync

var vuecliVer,
  frameWork,
  template,
  rawName,
  inPlace,
  name,
  cmd,
  cmdOpt,
  child


/* Get version of vue-cli.
 ======================== */
if (exists(config.vuecli.path)) {
  vueCliVer = require(config.vuecli.path).version
}


/* Initial Config.
 ================= */
define.usage(program, config.init.usage)
define.help(program, config.init.help)
log.help(program, process)


/* s
 =================== */
if (program.args.length !== 0) {
  
  frameWork = program.args[0]
  template = program.args[1]
  rawName = program.args[2]

  // Whether the file name is defined
  inPlace = !rawName || rawName === '.'

  // If there is no given file name,
  // then set the directory name for the default value
  name = inPlace ?
    path.relative('../', process.cwd()) : rawName
  
  cmd = `${frameWork} init ${template} ${name}`
  
  cmdOpt = {
    cwd: process.cwd(),
    env: process.env,
    stdio: ['pipe', 'pipe', 'pipe']
  }
  
  logCfg()
  
  // create a child process
  child = exec(cmd, cmdOpt)
  
  child.stdout.pipe(process.stdout)
  
  process.stdin.on('data', function (data) {
    child.stdin.write(
      new Buffer(
        data.toString().replace(/\n/, '')
      )
    )
  })
  
  child.stdout.on('data', function (data) {
    if (data.match(/\/\/v/)) {
      log.nul()
      log.base(`Successfully created by vue-cli ${vuecliVer || ''}`)
      process.exit()
    }
  })
  
  function logCfg() {
    log.config({
      title: 'Your configuration:',
      items: [
        {
          name: 'Framework',
          choice: frameWork
        },
        {
          name: 'Template Name',
          choice: template
        },
        {
          name: 'Project Name',
          choice: name
        },
        {
          name: 'Actual exec',
          choice: cmd
        },
      ]
    })
  }
  
}

