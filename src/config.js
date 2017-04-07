var chalk = require('chalk')

function chelp(program, opts) {
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
  chelp
}