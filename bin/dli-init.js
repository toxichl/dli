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
var _ = require('lodash')
var parseArgs = require('../src/parseArgs.js')
var isContain = require('../src/utils.js').isContain

var vuecliVer,
    arg1,
    arg2,
    arg3,
    inPlace,
    name,
    cmd,
    cmdOpt,
    child

/* Get version of vue-cli.
 ======================== */
if (exists(config.sups.vue.path)) {
    vueCliVer = require(config.sups.vue.path).version
}


/* Initial Config.
 ================= */
define.usage(program, config.init.usage)
define.help(program, config.init.help)
log.help(program, process)


/* s
 =================== */
if (program.args.length !== 0) {
    
    arg1 = program.args[0]
    arg2 = program.args[1]
    arg3 = program.args[2]
    
    // check if support is available
    if (!isContain(Object.keys(config.sups), arg1)) {
        throw new Error(`Unknown arguement ${arg1}`)
    }
    
    switch (arg1) {
        
        case 'vue':
            
            name = parseArgs.vue(process, program.args).projName
            cmd = parseArgs.vue(process, program.args).cmd
            
            break;
        
        case 'react':
            
            inPlace = !arg2 || arg2 === '.'
            
            name = inPlace ?
                path.relative('../', process.cwd()) : arg2
            
            cmd = `create-react-app ${name}`;
            logReactCfg();
            break;
    }
    
    // create a child process
    child = exec(cmd, {
        cwd: process.cwd(),
        env: process.env,
        stdio: ['pipe', 'pipe', 'pipe']
    })
    
    child.stdout.pipe(process.stdout)
    
    process.stdin.on('data', function (data) {
        child.stdin.write(
            new Buffer(
                data.toString().replace(/\n/, '')
            )
        )
    })
    
    // child.stdout.on('data', function (data) {
    //     if (data.match(/\/\/v/)) {
    //
    //     }
    // })
    
    child.on('close', function () {
        log.nul()
        log.base(`Successfully created by vue-cli ${vuecliVer || ''}`)
        process.exit()
    })
    
    function logVueCfg() {
        log.config({
            title: 'Your configuration:',
            items: [
                {
                    name: 'Framework',
                    choice: arg1
                },
                {
                    name: 'Template Name',
                    choice: arg2
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
    
    function logReactCfg() {
        log.config({
            title: 'Your configuration:',
            items: [
                {
                    name: 'Framework',
                    choice: arg1
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

