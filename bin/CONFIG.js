module.exports = {
  vuecli: {
    path: '../node_modules/vue-cli/package.json'
  },
  init: {
    usage: {
      title: '<template-name> [project-name]',
      options: [
        {
          desc: '-c, --clone',
          exam: 'use git clone'
        }
      ],
    },
    help: {
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
  },
  tool: {
    usage: {
      title: '<toolName>',
      options: [
        {
          desc: 'g -gitignore',
          exam: 'add a gitignore'
        }
      ]
    },
    help: {
      title: 'Examples',
      helps: [
        {
          desc: 'create a gitignore file',
          exam: 'xcli tool i'
        }
      ]
    }
  }
}