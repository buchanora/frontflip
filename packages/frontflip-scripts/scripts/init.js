'use strict';
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const questions = require('../config/quest_init').init;
const defaultDependencies = require('../config/dependencies').init;
const getDependencies = require('./getDeps');
const installDependencies = require('./installDeps');
const scaffold = require('../scaffold/');

module.exports = function(root, appName, initialDir){
  const prompt = inquirer.createPromptModule();
  let deps;
  prompt(questions)
    .then(answers=>{
      deps = getDependencies(answers)
      return installDependencies(deps.core)
    })
    .then(()=>{
      return installDependencies(deps.dev.concat(defaultDependencies.dev), true)
    })
    .catch(error=>{
      console.log(error);
      process.exit(1)
    })
}


