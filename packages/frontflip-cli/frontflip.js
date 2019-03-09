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

const flipUtils = require('./utils');

const packageJson = require('./package.json');
const dependencies = require('./dependencies');

let projectPath, command, devEnvironment;

const commands = {
  CREATE: 'create',
  INIT: 'init',
  BUILD: 'build',
  MIGRATE: 'migrate'
}

program.version(packageJson.version, '-v, --version');
program
  .command('create <project>')
  .description('Initite a new project and setup config/structural boilerplate')
  .option('-d, --development', 'Run create in development mode')
  .action((name, cmd) => {
    projectPath = name;
    setNodeEnv(cmd.development);
    setPackageInstaller(flipUtils.hasYarn());
    devEnvironment = cmd.development;
    command = commands.CREATE; 
    failIf(typeof projectPath === 'undefined', 'You must specify a directory for your project');
    createProject(projectPath);
  });
program
  .command('init <entity> [entityName]')
  .description('Initiate a config object for project module/entity')
  .option('-d, --development', 'Run create in development mode')
  .action((entity, name, cmd) => {
    setNodeEnv(cmd.development);
    setPackageInstaller(flipUtils.hasYarn());
    devEnvironment = cmd.development;
  });
program
  .command('build <entity> [entityName]')
  .description('Use the config object to build boilerplate files for a module/entity')
  .option('-d, --development', 'Run create in development mode')
  .action((entity, name, cmd) => {
    setNodeEnv(cmd.development);
    setPackageInstaller(flipUtils.hasYarn());
    devEnvironment = cmd.development;
  });
program
  .command('migrate <entity> [entityName]')
  .description('Create a hange file location of a module/entity')
  .option('-d, --development', 'Run create in development mode')
  .action((entity, name, cmd) => {
    setNodeEnv(cmd.development);
    setPackageInstaller(flipUtils.hasYarn());
    devEnvironment = cmd.development;
  });

program.parse( process.argv );

function launch(_root, appName, initialDir){
  const coreDependencies = dependencies.core;
  const devDependencies = dependencies.dev;
  const installationType = devEnvironment ? 'linkDependencies' : 'installDependencies';
  
  flipUtils[installationType](coreDependencies, false)
    .then(()=>{
      console.log(chalk.cyan('Linking Dev Dependencies'));
      return flipUtils[installationType](devDependencies, true, useYarn);
    })
    .then(()=>{
      flipScripts = require(path.resolve(_root, 'node_modules/frontflip-scripts/'));
      flipScripts.create(_root, appName, initialDir, flipUtils);
    })
    .catch(error=>{
      console.error(`[LAUNCH] ${chalk.red("An error occurred while launching your project")}`, error);
      flipUtils.removeDir(_root);
    });   
}

function createProject(_projectPath){
  const rootPath = path.resolve(_projectPath),
        appName = path.basename(rootPath);
  console.log('Starting new Frontflip project at:', chalk.green(appName));
  try {
    if ( flipUtils.safeToMakeDirectory(rootPath) ) throw new Error('Can\'t create project at the path you provided');
    fs.ensureDirSync(appName);
    const packageDotJson = {
      name: appName,
      version: '0.0.1',
      private: true,
    }
    fs.writeJSONSync(
      path.join(rootPath, 'package.json'),
      packageDotJson
    )
    const initialDir = process.cwd();
    process.chdir(rootPath);
    launch(rootPath, appName, initialDir);
    
  } catch (error) {
    console.log(chalk.magenta(error.message));
    flipUtils.removeDir(rootPath);
  }
}
function init(options){

}
function build(options){

}
function migrate(options){

}
function failIf(condition, message){
  if(condition){
    console.error(chalk.redBright(message));
    return process.exit(1);
  }
}
function setNodeEnv(dev){
  process.env.NODE_ENV = dev ? 'development' : 'production';
}
function setPackageInstaller(hasYarn){
  process.env.PACKAGE_INSTALLER = hasYarn ? 'YARN' : 'NPM';
}