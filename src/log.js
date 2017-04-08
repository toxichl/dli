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

function nul() {
    console.log()
}

function base(content) {
    var split = content.split('S%')
    var result = ''
    for (var i = 0, l = split.length; i < l; i++) {
        result += split[i]
        if (i !== l - 1) {
            result += chalk.yellow(arguments[i + 1])
        }
    }
    console.log('  ', result)
}

function array(infoArr) {
    infoArr.forEach(function (item) {
        console.log(chalk.green(`    # ${item}`))
    })
}

/**
 * log config
 * @param conf
 */
function config(conf) {
    // Log configuration
    console.log()
    base(chalk.bgYellow(conf.title) + ' ')
    console.log()
    conf.items.forEach(function (item) {
        console.log(chalk.green(`    # ${item.name}`), chalk.magenta('\t' + `${item.choice}`))
    })
}


module.exports = {
    nul,
    base,
    help,
    config,
    array
}