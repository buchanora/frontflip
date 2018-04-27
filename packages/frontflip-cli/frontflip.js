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
const spawn = require('cross-spawn');
const inquirer = require('inquirer');

const flipScripts = require('frontflip-scripts');

const packageJson = require('./package.json');

const dependencies = require('./dependencies');

let projectName;
let command;
let questions;

program
  .version(packageJson.version)
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
    bootstrapProject(projectName)
    break;
  default:

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

  launch(root, appName, initialDir);
}

function launch(root, appName, initialDir){
  // const coreDependencies = ['react', 'react-dom', 'frontflip-scripts'];
  const coreDependencies = dependencies.core;
  const devDependencies = dependencies.dev;
  installDependencies(coreDependencies)
    .then(()=>{
      return installDependencies(devDependencies, true)
    })
    .then(()=>{
      flipScripts.init(root, appName, initialDir);
    })
    .catch(error=>{
      console.error('[LAUNCH] An error occurred while launching your project', error);
    })
}

function installDependencies(dependencies, dev){

  return new Promise((resolve, reject) => {
    let command = 'npm';
    let save = dev ? '--save-dev' : '--save'
    let args = [
      'install',
      save,
      '--save-exact',
      '--loglevel',
      'error',
    ].concat(dependencies);

    const childProcess = spawn(command, args, {stdio: 'inherit'});

    childProcess.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }
      resolve();
    });
  });
}