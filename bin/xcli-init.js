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
var config = require('../src/config.js')

/**
 * Usage.
 */

program
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')


/**
 * Help.
 */

var __help__ = {
  title: 'Examples',
  helps: [
    {
      desc: 'create a vue project with an official template',
      exam: 'xcli init vue webpack my-project'
    },
    {
      desc: 'create a new project straight from a github template',
      exam: 'xcli init username/repo my-project'
    }
  ]
}
config.chelp(program, __help__)

log.lhelp(program, process)

/**
 * Settings.
 */

var frameWork = program.args[0]
var template = program.args[1]
// 说明没有使用官方模板
var hasSlash = template.indexOf('/') > -1
var rawName = program.args[2]

// Whether the file name is defined
var inPlace = !rawName || rawName === '.'

// If there is no given file name, then set the directory name for the default value
var name = inPlace ? path.relative('../', process.cwd()) : rawName

var cmdStr = `${frameWork} init ${template} ${name}`

// Log configuration
function log() {
  console.log()
  console.log('   ', chalk.bgYellow(' Your configuration:'))
  console.log()
  console.log(chalk.green('    # Framework'), chalk.magenta(`\t${frameWork}`))
  console.log(chalk.green('    # Template'), chalk.magenta(`\t\t${template}`))
  console.log(chalk.green('    # Project Name'), chalk.magenta(`\t${name}`))
  console.log()
  console.log(chalk.green('    # Actual exec '), chalk.magenta(`\t${cmdStr}`))
}


var cmdOption = {
  cwd: process.cwd()
}

console.log(cmdOption)

if (program.args.length !== 0) {
  log()
  if (shell.exec(cmdStr, cmdOption).code !== 0) {
    shell.echo('Error: Git commit failed');
    shell.exit(1);
  } else {
    console.log('Sussess')
  }
  // exec(cmdStr, cmdOption, function (error, stdout, stderr) {
  //   if(error) {
  //     console.log(error)
  //   }
  //   console.log('Success')
  // })
  
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