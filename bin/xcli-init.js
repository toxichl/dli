#!/usr/bin/env node

// download git project
// download(repository, destination, options, callback)
// eaxmple:
// download(owner/name, process.cwd(), function(err){ })
var download = require('download-git-repo')
var program = require('commander')
var exists = require('fs').existsSync
var path = require('path')
var chalk = require('chalk')
var shell = require('shelljs')
var log = require('../src/log.js')
var define = require('../src/define.js')
var CONFIG = require('./CONFIG.js').init
var exec = require('child_process').exec
var fork = require('child_process').fork
var spawn = require('child_process').spawn
var keypress = require('keypress')

/**
 * Initial Config.
 */

define.usage(program, CONFIG.usage)
define.help(program, CONFIG.help)
log.help(program, process)


/**
 * Parse arguements.
 */

var frameWork = program.args[0]
var template = program.args[1]
var rawName = program.args[2]

// Whether the file name is defined
var inPlace = !rawName || rawName === '.'

// If there is no given file name,
// then set the directory name for the default value
var name = inPlace ?
  path.relative('../', process.cwd()) : rawName

// the actual command that will execute
var cmdStr = `${frameWork} init ${template} ${name}`
console.log(cmdStr)

var env = process.env;

var cmdOption = {
  cwd: process.cwd(),
  env: env,
  stdio: ['pipe','pipe','pipe']
}

/**
 * Execute.
 */

if (program.args.length !== 0) {
  logConf()
  // fork('mkdir ddd', cmdOption, function (error, stdout, stderr) {
  //   if (error) {
  //     console.log(error)
  //   }
  //   console.log(stdout)
  //   console.log(stderr)
  // })
  
  // var child = shell.exec(cmdStr, cmdOption)
  //
  // if (child.code !== 0) {
  //   shell.echo('Error: failed');
  //   shell.exit(1);
  // } else {
  //   console.log('Sussess')
  // }
  //
  // process.resume();
  // process.stdin.on('data', function(data) {
  //   console.log(data)
  //   process.stdout.write(data)
  //   child.send(data)
  // })
  //
  // child.stdin.on('data', function (data) {
  //   console.log(data)
  // })
  //
  
  // create a child process
  var child = exec(cmdStr, cmdOption)
  
  child.stdout.pipe(process.stdout)
  
  process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);
    // if (key && key.ctrl && key.name == 'c') {
    //   process.stdin.pause();
    // }
  });
  
  process.stdin.on('data', function (data) {
    child.stdin.write(
      new Buffer(
        data.toString().replace(/\n/, '')
      )
    )
  })
  
  // child.stdout.on('data', function (data) {
  //   console.log(data)
  // })
  //
  

  
}


//
// var to = path.resolve(rawName || '.')
// var clone = program.clone || false
//
// var tmp = path.join(home, '.vue-templates', template.replace(/\//g, '-'))
//
// /**
//  * Padding.
//  */
//
// console.log()
// process.on('exit', function () {
//   console.log()
// })
//
// if (exists(to)) {
//   inquirer.prompt([{
//     type: 'confirm',
//     message: inPlace
//       ? 'Generate project in current directory?'
//       : 'Target directory exists. Continue?',
//     name: 'ok'
//   }], function (answers) {
//     if (answers.ok) {
//       run()
//     }
//   })
// } else {
//   run()
// }
//
//
// function run() {
//   checkVersion(function () {
//     if (!hasSlash) {
//       var officalTmpUrl = 'vuejs-templates/' + template
//       if (template.indexOf('#') !== -1) {
//         downloadAndGenerate(officalTmpUrl)
//       } else {
//         if (template.indexOf('-2.0') !== -1) {
//           warnings.v2SuffixTemplatesDeprecated(template, inPlace ? '' : name)
//           return
//         }
//
//         warnings.v2BranchIsNowDefault(template, inPlace ? '' : name)
//         downloadAndGenerate(officalTmpUrl)
//       }
//     } else {
//       downloadAndGenerate(template)
//     }
//   })
// }
//
//
// /**
//  * Download a generate from a template repo.
//  *
//  * @param {String} template
//  */
//
// function downloadAndGenerate (template) {
//   var spinner = ora('downloading template...')
//   spinner.start()
//   download(template, tmp, { clone: clone }, function (err) {
//     spinner.stop()
//     if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
//     generate(name, tmp, to, function (err) {
//       if (err) logger.fatal(err)
//       console.log()
//       logger.success('Generated "%s".', name)
//     })
//   })
// }


function logConf() {
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
        choice: cmdStr
      },
    ]
  })
}