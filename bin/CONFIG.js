module.exports = {
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
      title: '<template-name> [project-name]',
      options: {
        desc: '-c, --clone',
        exam: 'use git clone'
      },
    },
    
  }
}