module.exports = [
  {
    type: 'list',
    name: 'adapter',
    message: 'What type of project are you working on',
    choices: [
      {
        name: 'React',
        value: {
          key: 'react',
          name: 'reactProject'
        }
      }, {
        name: 'Vue',
        value: {
          key: 'vue',
          name: 'vueProject'
        }
      }
    ],
    default: 0
  }
]
