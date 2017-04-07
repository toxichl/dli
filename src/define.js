var chalk = require('chalk')

function usage(program, opts) {
  program
    .usage(opts.title)
  opts.options.forEach(function (opt) {
    program.option(opt.desc, opt.exam)
  })
}

function help(program, opts) {
  program.on('--help', function () {
    console.log(chalk.bgBlue(`  ${opts.title}`))
    console.log()
    opts.helps.forEach(function (help) {
      console.log(chalk.green(`    # ${help.desc}`))
      console.log(chalk.cyan(`    $ ${help.exam}`))
      console.log()
    })
  })
}

module.exports = {
  usage,
  help
}