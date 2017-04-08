var config = require('../bin/CONFIG.js')
var log = require('./log.js')
var path = require('path')
var isContain = require('./utils').isContain

function vue(process, args) {
    
    var templates = config.sups.vue.templates
    var inPlace, projName, cmd
    
    if (args.length === 0 || args.length > 3) {
        log.nul()
        log.base('Unexpected length of arguements')
        log.base('S%', args.join(' '))
        process.exit()
    }
    
    if (args[0] !== 'vue') {
        log.nul()
        log.base('Unexpected arguement\n' + args[0])
        process.exit()
    }
    
    if (!isContain(templates, args[1])) {
        log.nul()
        log.base('Unsupported S% template "S%", The supported templates are as follows:', 'vue', args[1])
        log.nul()
        log.array(templates)
        process.exit()
    }
    
    else {
        
        inPlace = !args[2] || args[2] === '.'
        projName = inPlace ?
            path.relative('../', process.cwd()) : args[2]
        cmd = `${args[0]} init ${args[1]} ${projName}`
    }
    
    log.config({
        title: 'Your configuration:',
        items: [
            {
                name: 'Framework',
                choice: 'vue'
            },
            {
                name: 'Template Name',
                choice: args[1]
            },
            {
                name: 'Project Name',
                choice: projName
            },
            {
                name: 'Actual exec',
                choice: cmd
            },
        ]
    })
    
    return {
        projName,
        cmd
    }
    
}

function react(process, args) {
    
    var inPlace, projName, cmd
    
    if (args.length === 0 || args.length > 2) {
        log.nul()
        log.base('Unexpected length of arguements')
        log.base('S%', args.join(' '))
        log.nul()
        log.base('Example: ')
        log.base('S%', 'dli init react my-app')
        process.exit()
    }
    
    inPlace = !args[1] || args[1] === '.'
    
    projName = inPlace ?
        path.relative('../', process.cwd()) : args[1]
    
    cmd = `create-react-app ${name}`;
    
    log.config({
        title: 'Your configuration:',
        items: [
            {
                name: 'Framework',
                choice: 'react'
            },
            {
                name: 'Project Name',
                choice: projName
            },
            {
                name: 'Actual exec',
                choice: cmd
            },
        ]
    })
    
    return {
        projName,
        cmd
    }
    
}


module.exports = {
    vue,
    react
}