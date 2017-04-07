var chalk = require('chalk')

/**
 * log help of current program
 * @param program
 * @param process
 * @returns {*|{title, helps}}
 */
function help(program, process) {
  program.parse(process.argv)
  // the process will be killed after this command
  if (program.args.length === 0) return program.help()
}

/**
 * log config
 * @param conf
 */
function config(conf) {
  // Log configuration
  console.log()
  console.log('   ', chalk.bgYellow(conf.title), ' ')
  console.log()
  conf.items.forEach(function (item) {
    console.log(chalk.green(`    # ${item.name}`), chalk.magenta('\t'+`${item.choice}`))
  })
}


module.exports = {
  help,
  config
}