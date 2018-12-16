exports.init = [
  {
    type: 'list',
    name: 'viewLibrary',
    message: 'Please select a view library',
    choices: [
      {
        name: 'React', 
        value:{
          key: 'react',
          core: [
            "prop-types",
            "react",
            "react-dom",
            "react-router",
            "react-router-dom"
          ],
          dev:[
            "babel-preset-react",
            "babel-preset-react-hmre",
            "babel-plugin-transform-react-jsx-img-import",
            "react-hot-loader",
            "react-loader",
        ]
        }
      },{
        name:'Vue', 
        value: {
          key: 'vue',
          core:['vue']
        }
      },{
        name: 'Angular', 
        value: {
          key: 'ng',
          core: ['angular']
        }
      }
    ],
    default: 0
  },
  {
    type: 'list',
    name: 'stateManager',
    message: 'Please select a state manager',
    choices: (ans)=>{
      
      if(ans.viewLibrary.key === 'react'){
        return [
          {
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
            name:'MobX', 
            value: {
              key: 'mobx',
              core:['mobx']
            }
          }
        ]
      }
      if(ans.viewLibrary.key === 'vue'){
        return [
          {
            name:'Redux',
            value: {
              key:'redux',
              core: 'redux'
            }
          }, {
            name:'Vuex',
            value: {
              key: 'vuex',
              core:['vuex']
            }
          }, {
            name:'Vue-stash',
            value: {
              key: 'vueStash',
              core: ['vue-stash']
            }
          }
        ]
      }
      if(ans.viewLibrary.key === 'angular'){
        return [
          {
            name: 'Redux',
            value: {
              key: 'redux',
              core: ['redux']
            }
          }, {
            name: 'Ngrx',
            value: {
              key: 'ngrx',
              core: ['ngrx']}
          }
        ]
      }
      return ['none'];
    },
    default: 0
  },
  {
    type: 'list',
    name: 'CSS',
    message: 'Please select a CSS Preprocessor',
    choices: [
      {
        name: 'Scss',
        value: {
          key: 'scss',
          dev: [
            "node-sass",
            "sass-loader",
          ]
        }
      },{
        name: 'Less',
        value: {}
      },{
        name:'Stylus',
        value: {}
      },{
        name:'Vanilla',
        value: {}
      }
    ],
    default: 0
  },
  {
    type: 'list',
    name: 'tests',
    message: 'What is your preffered framework for structural tests?',
    choices: [{
      name:'Mocha',
      value: {
        key: 'mocha',
        dev:["mocha"],
      }
    }, {
      name: 'Jest',
      value:{
        key: 'jest',
        dev: ['jest']
      }
    }, {
      name: 'Jasmine',
      value:{
        key:'jasmine',
        dev: ['jasmine']
      }
    }],
    default: 0
  },
]
