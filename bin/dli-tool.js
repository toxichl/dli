#!/usr/bin/env node

var program = require('commander')
var path = require('path')
var define = require('../src/define.js')
var CONFIG = require('./CONFIG.js').tool
var log = require('../src/log.js')
var Task = require('../src/Task')
var fsTool = require('../src/fsTools.js')
var exists = require('fs').existsSync

define.usage(program, CONFIG.usage)
define.help(program, CONFIG.help)
log.help(program, process)

var toolDir = path.resolve(__dirname, '../tool')

var toolTask = new Task(program, process)

toolTask
    .use(parseArgs)
    .use(runTool)


/**
 * 解析参数
 * @param program
 * @param process
 * @param next
 */
function parseArgs(program, process, next) {
    log.nul()
    log.base('开始解析参数')
    if (!program['task']) {
        program.task = new Object()
    }
    program.task.toolName = program.args[0]
    next()
}

/**
 *
 * @param program
 * @param process
 * @param next
 */
function runTool(program, process, next) {
    log.nul()
    log.base('开始执行任务')
    
    var source, target
    
    switch (program.task.toolName) {
        case 'gitignore':
            source = path.join(toolDir, '\.' + program.task.toolName);
            target = path.join(process.cwd(), '.gitignore');
            break;
        case 'index':
            source = path.join(toolDir, program.task.toolName + '.html');
            target = path.join(process.cwd(), 'index.html');
            break;
        case 'webpack':
            source = path.join(toolDir, program.task.toolName + '.config.js');
            target = path.join(process.cwd(), 'webpack.config.js');
            break;
    }
    
    if (exists(source)) {
        
        log.nul()
        log.base('源文件是 S% ', source)
        log.base('开始生成 S% ', target)
        
        fsTool.readFile(source)
            .then(function (content) {
                fsTool.writeFile(target, content)
                    .then(function () {
                        log.base('写入 S% 文件结束', target)
                        log.nul()
                        next()
                    })
            })
        
    } else {
        log.error('S% 不存在', source)
    }
    
}


