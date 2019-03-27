'use strict';
const inquirer = require('inquirer');
const scripts = require('./scripts/');
module.exports = {
  create: wrapper(scripts.create),
  init: wrapper(scripts.init),
  build: wrapper(scripts.build),
  launch: wrapper(scripts.launch),
  migrate: wrapper(scripts.migrate)
}

function wrapper(f){
  return function(type, config, cli){
    cli.prompt = inquirer.createPromptModule();
    return f(type, config, cli);
  }
}
