/**
 * Copyright (c) 2009-present, theEMFcompany, Inc.
 * All rights reserved
 *
 * This code is lisenced under MIT-style lisence found in the
 * LISENCE file in the root directory of this source tree
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');
const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync
const spawn = require('cross-spawn');
const inquirer = require('inquirer');

const flipScripts = require('frontflip-scripts');
const flipUtils = require('frontflip-utils');

const packageJson = require('./package.json');
const dependencies = require('./dependencies');

let projectName;
let command;

program
  .version(packageJson.version, '-v, --version')
  .command('init <name>')
  .action(name => {
    projectName = name;
    command = 'init';
  })

program.parse(process.argv);

if(typeof projectName === 'undefined'){
  console.error('You must specify a directory for your project');
  process.exit(1);
}

switch (command) {
  case 'init':
    bootstrapProject(projectName);
    break;
  default:
    run(program.args);
}

function bootstrapProject(projectPath){
  console.log('Starting new Frontflip project');
  const root = path.resolve(projectPath),
        appName = path.basename(root);


  fs.ensureDirSync(appName);
  const packageDotJson = {
    name: appName,
    version: '0.0.1',
    private: true,
  };

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageDotJson, null, 2)
  );

  const initialDir = process.cwd;
  process.chdir(root);

  launch(root, appName, initialDir, flipUtils.hasYarn());
}

function launch(root, appName, initialDir, useYarn){
  const coreDependencies = dependencies.core;
  const devDependencies = dependencies.dev;
  flipUtils.installDependencies(coreDependencies, useYarn)
    .then(()=>{
      return flipUtils.installDependencies(devDependencies, useYarn, true)
    })
    .then(()=>{
      flipScripts.init(root, appName, initialDir, useYarn);
    })
    .catch(error=>{
      console.error(`[LAUNCH] ${chalk.red("An error occurred while launching your project")}`, error);
    });
}

function run(){
  flipScripts.run(command, program.args);
}