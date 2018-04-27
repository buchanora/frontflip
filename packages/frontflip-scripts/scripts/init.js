'use strict';
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const questions = require('../config/quest_init').init;
const getDependencies = require('./getDeps');
const installDeps = require('./installDeps');
const templates = require('../templates/')

module.exports = function(root, appName, initialDir){
  const prompt = inquirer.createPromptModule();
  let deps;
  prompt(questions)
    .then(answers=>{
      deps = getDependencies(answers)
      return installDeps(deps.core)
    })
    .then(()=>{
      return installDeps(deps.dev.concat(templates.dependencies.dev), true)
    })
    .catch(error=>{
      console.log(error);
      process.exit(1)
    })
}


