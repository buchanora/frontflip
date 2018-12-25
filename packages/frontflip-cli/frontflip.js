/**
 * Copyright (c) 2009-present, theEMFcompany, Inc.
 * All rights reserved
 *
 * This code is lisenced under MIT-style lisence found in the
 * LISENCE file in the _root directory of this source tree
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');
const program = require('commander');
const fs = require('fs-extra');
const path = require('path');

const flipUtils = require('frontflip-utils');

const packageJson = require('./package.json');
const dependencies = require('./dependencies');

let projectPath, command, devEnvironment;

program
  .version(packageJson.version, '-v, --version')
  .command('init <project>')
  .option('-d, --development', 'Run init in development mode')
  .action((name, _program) => {
    projectPath = name;
    devEnvironment = _program.development;
    command = 'init'; 
    if ( typeof projectPath === 'undefined' ){
      console.error(chalk.red('You must specify a directory for your project'));
      process.exit(1);
    }
  });

program.parse( process.argv );

switch (command) {
  case 'init':
    bootstrapProject(projectPath);
    break;
  default:
    run(program.args);
}

function bootstrapProject(_projectPath){
  const rootPath = path.resolve(_projectPath),
        appName = path.basename(rootPath);
  console.log('Starting new Frontflip project at:', chalk.blue(appName));
  fs.ensureDirSync(appName);
  const packageDotJson = {
    name: appName,
    version: '0.0.1',
    private: true,
  }
  fs.writeFileSync(
    path.join(rootPath, 'package.json'),
    JSON.stringify(packageDotJson, null, 2)
  )
  const initialDir = process.cwd();
  process.chdir(rootPath);
  launch(rootPath, appName, initialDir, flipUtils.hasYarn());
  console.log(chalk.blue('Completed Project Bootstrap'));
}

function launch(_root, appName, initialDir, useYarn){
  const coreDependencies = dependencies.core;
  const devDependencies = dependencies.dev;
  const installationType = devEnvironment ? 'linkDependencies' : 'installDependencies';
  
  flipUtils[installationType](coreDependencies, false, useYarn)
    .then(()=>{
      console.log(chalk.blue('Linking Dev Dependencies'));
      return flipUtils[installationType](devDependencies, true, useYarn);
    })
    .then(()=>{
      flipScripts = require(path.resolve(_root, 'node_modules/frontflip-scripts'));
      flipScripts.init(_root, appName, initialDir, useYarn);
    })
    .catch(error=>{
      console.error(`[LAUNCH] ${chalk.red("An error occurred while launching your project")}`, error);
    });   
}

function run(){
  const project_root = process.cwd();
  flipScripts = require(path.resolve(project_root, 'node_modules/frontflip-scripts'))
  flipScripts.run(command, program.args);
}