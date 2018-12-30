exports.init = [
  {
    type: 'list',
    name: 'stateManager',
    message: 'How would you like to handle state management?',
    choices: [{
        name:'Redux', 
        value: {
          key: 'redux',
          core: [
            "redux",
            "react-redux",
            "redux-persist"
          ]
        }
      },{
        name:'React setState', 
        value: {
          key: 'setState',
          core:[]
        }
      }
    ],
    default: 0
  },{
    type: 'checkbox',
    name: 'utilityPackages',
    message: 'Select Optonal modules',
    choices: [
      {
        name: 'numeral',
        value: {
          key: 'numeral',
          core: [
            "numeral"
          ]
        }
      },{
        name: 'query-string',
        value: {
          key: 'queryString',
          core:['query-string']
        }
      },{
        name:'moment',
        value: {
          key: 'moment',
          core: ['moment']
        }
      }]
  },{
    type: 'list',
    name: 'testSuite',
    message: 'Select your test framework',
    choices: [
      {
        name: 'Jest',
        value: {
          key: 'jest',
          dev: [
            "jest",
            "babel-jest",
            "enzyme-adapter-react-16"
          ]
        }
      },{
        name: 'Mocha',
        value: {
          key: 'mocha',
          dev:['mocha', "chai"]
        }
      }]
  }]
