'use strict';
const path = require('path');
const inquirer = require('inquirer');
const questions = require('../prompts/init');
const defaultDependencies = require('../config/dependencies');
const getDependencies = require('../utils/getDeps');
const buildProject = require('../utils/buildProject');
const getPaths = require('../utils/getFilesPaths');
const addPackageScripts = require('../utils/addPackageScripts');
const addTestConfigs = require('../utils/addTestConfigs');

module.exports = function(root, appName, initialDir, cliUtils){
  const prompt = inquirer.createPromptModule();
  let deps, answers, useYarn;
  prompt(questions.init)
    .then(ans=>{
      answers = ans;
      answers.appName = appName;
      deps = getDependencies(ans);
      useYarn = cliUtils.hasYarn();
      return cliUtils.installDependencies(deps.core.concat(defaultDependencies.core), false, useYarn);
    })
    .then(()=>{
      return cliUtils.installDependencies(deps.dev.concat(defaultDependencies.dev), true, useYarn);
    })
    .then(()=>{
      addPackageScripts(root, answers);
      addTestConfigs(root, answers);
      const scaffoldRoot = path.resolve(__dirname, '..', 'scaffold');
      const templateRoot = path.resolve(__dirname, '..', 'templates');
      const projectFile = 'project.yml';
      const project = getPaths(scaffoldRoot, templateRoot, projectFile);
      return buildProject(project, root, answers);
    })
    .catch(error=>{
      console.log(error);
      process.exit(1);
    })
}