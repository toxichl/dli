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

module.exports = {
  help
}