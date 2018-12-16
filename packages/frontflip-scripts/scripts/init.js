'use strict';
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const questions = require('../config/quest_init');
const defaultDependencies = require('../config/dependencies');
const getDependencies = require('./getDeps');
const installDependencies = require('./installDeps');
const scaffold = require('../scaffold/');
const buildProject = require('./buildProject');
const getPaths = require('./getPaths');
const addPackageScripts = require('./addPackageScripts')

module.exports = function(root, appName, initialDir, useYarn){
  const prompt = inquirer.createPromptModule();
  let deps, answers;

  prompt(questions.init)
    .then(ans=>{
      answers = ans;
      deps = getDependencies(ans);
      return installDependencies(deps.core, useYarn)
    })
    .then(()=>{
      return installDependencies(deps.dev.concat(defaultDependencies.dev), useYarn, true)
    })
    .then(()=>{
      addPackageScripts(root)
      const project = getPaths(scaffold.project)
      return buildProject(project, root, answers);
    })
    .catch(error=>{
      console.log(error);
      process.exit(1)
    })
}


