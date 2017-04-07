/**
 * Help.
 */
function lhelp(program, process) {
  program.parse(process.argv)
  if (program.args.length === 0) return program.help()
}

module.exports = {
  lhelp
}