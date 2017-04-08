var config = require('../bin/CONFIG.js')
var log = require('./log.js')
var path = require('path')
var isContain = require('./utils').isContain

function vue(process, args) {
    
    var templates = config.sups.vue.templates
    var inPlace, projName, cmd
    
    if (args.length === 0 || args.length > 3) {
        log.nul()
        log.base('Unexpected number of arguements\n' + JSON.stringify(args))
        process.exit()
    }
    
    if (args[0] !== 'vue') {
        log.nul()
        log.base('Unexpected arguement\n' + args[0])
        process.exit()
    }
    
    if (!isContain(templates, args[1])) {
        log.nul()
        log.base('Unsupported S% template "S%", The supported templates are as follows:', ['vue', args[1]])
        log.nul()
        log.array(templates)
        process.exit()
    }
    
    else {
        // Whether the file name is undefined
        inPlace = !args[2] || args[2] === '.'
        
        // If there is no given file name,
        // then set the directory name for the default value
        projName = inPlace ?
            path.relative('../', process.cwd()) : args[2]
        
        // actual cmd
        cmd = `${args[1]} init ${args[2]} ${projName}`
    }
    
    return {
        projName,
        cmd
    }
    
}

module.exports = {
    vue
}