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

const packageJson = require('./package.json');

let projectName

program
  .version(packageJson.version)
  .command('init <name>')
  .action(name => {
    projectName = name;
  })

program.parse(process.argv);

if(typeof projectName === 'undefined'){
  console.error('You must specify a directory for your project');
  process.exit(1);
}

bootstrapProject(projectName)

function bootstrapProject(name){
  console.log('got here');
  const root = path.resolve(name),
        appName = path.basename(root);
  const projectPath = `./${name}`;
  fs.ensureDirSync(name)
}
