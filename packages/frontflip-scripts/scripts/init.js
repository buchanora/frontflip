'use strict';
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const questions = require('../config/questions').init;

module.exports = function(root, appName, initialDir){
  const prompt = inquirer.createPromptModule();
  prompt(questions)
    .then((answers)=>{

    })
}
