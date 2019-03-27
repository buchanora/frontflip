/**
 * Copyright (c) 2009-present, theEMFcompany, Inc.
 * All rights reserved
 *
 * This code is lisenced under MIT-style lisence found in the
 * LISENCE file in the _root directory of this source tree
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// /!\ DO NOT MODIFY THIS FILE /!\
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const chalk = require('chalk');
const program = require('commander');
const interpret = require('interpret')
const Liftoff = require('liftoff');
const fs = require('fs-extra');
const path = require('path');

const utils = require('./utils/');

const packageJson = require('./package.json');
const dependencies = require('./dependencies');

const commands = {
  CREATE: 'create',
  INIT: 'init',
  BUILD: 'build',
  LAUNCH: 'launch',
  MIGRATE: 'migrate'
};
let command;
let launchEnv;

let Flip = new Liftoff({
  name: 'fronflip',
  configFiles: {
    'flipconfig': {
      name: 'flipconfig',
      path: '.',
      findUp: true
    },
    'projectconfig': {
      name: '.flipconfig',
      path: './.flip',
      findUp: true
    },
    'config': {
      name: 'config',
      path: '~/.flip'
    }
  },
  extensions: interpret.jsVariants
})

program.version(packageJson.version, '-v, --version');
program
  .command('create <name>')
  .description('Initite a new project and setup config/structural boilerplate')
  .option('-d, --development', 'Run create in development mode')
  .option('-n, --non-interactive', 'Do not run interactive build wizard to create project')
  .action((name, cmd) => {
    command = commands.CREATE;
    setFlipEnv(cmd.development);
    setPackageManager(utils.helpers.hasYarn());
    failIf(typeof name === 'undefined', 'You must specify a directory for your project');
    Flip.launch({}, env => {
      launchEnv = env;
      setUserHome(env);
      createProject(name, cmd);
    });
  });
program
  .command('init <entity> [entityName]')
  .description('Initiate a config object for project module/entity')
  .option('-d, --development', 'Run create in development mode')
  .action((entity, name, cmd) => {
    command = commands.INIT;
    setFlipEnv(cmd.development);
    setPackageManager(utils.helpers.hasYarn());
  });
program
  .command('build <entity> [entityName]')
  .description('Use the config object to build boilerplate files for a module/entity')
  .option('-d, --development', 'Run create in development mode')
  .action((entity, name, cmd) => {
    command = commands.BUILD;
    setFlipEnv(cmd.development);
    setPackageManager(utils.helpers.hasYarn());
  });
program
  .command('migrate <entity> [entityName]')
  .description('Create a hange file location of a module/entity')
  .option('-d, --development', 'Run create in development mode')
  .action((entity, name, cmd) => {
    command = commands.MIGRATE;
    setFlipEnv(cmd.development);
    setPackageManager(utils.helpers.hasYarn());
  });

program.parse(process.argv);
failIf(!command && program.args.length < 1, 'No Command');
failIf(!command, 'Invalid Command');

function setUp(appName, projectDir, initialDir) {
  return new Promise((resolve, reject) => {
    try {
      const installationType = process.env.FLIP_ENV === 'development'
        ? 'withLink'
        : 'withAdd';
      fs.ensureDirSync(path.join(projectDir, '.flip'));
      const flipConfig = {
        scaffoldDir: 'scaffold',
        templateDir: 'template',
        contextDir: 'context',
        project: {
          name: appName,
          dir: projectDir,
          parentDir: initialDir,
          builder: 'project'
        },
        env: {},
        builders: {},
        plugins: {},
        hooks: {},
        filters: {}
      };
      fs.writeJSONSync(path.join(projectDir, '.flip/projectconfig'), flipConfig);
      fs.writeFileSync(path.join(projectDir, 'flipconfig.yml'), utils.convert.yaml.toJSON(flipConfig));
      const packageDotJson = {
        name: appName,
        version: '0.0.1',
        private: true
      };
      fs.writeJSONSync(path.join(projectDir, 'package.json'), packageDotJson);
      utils
        .install
        .dependencies[installationType](dependencies.core, false)
        .then(() => {
          console.log(chalk.cyan('Linking Dev Dependencies'));
          return utils.install.dependencies[installationType](dependencies.dev, true);
        })
        .then(() => {
          resolve(flipConfig);
        })
        .catch(error => {
          utils
            .log
            .info(`An error occurred while launching your project`);
          utils
            .log
            .error(error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function createProject(name, cmd) {
  const projectDir = path.resolve(name);
  const parentDir = path.resolve(projectDir, '../');
  const options = {
    nonInteractive: cmd.nonInteractive,
    development: cmd.development
  }
  appName = path.basename(projectDir);
  try {
    utils
      .log
      .info('Starting new Frontflip project at: ' + appName);
    if (!utils.fileSystem.canSafelyMakeDirectory(projectDir)) {
      throw new Error('Can\'t create project at the path you provided');
    }
    console.log(process.env.FLIP_ENV)
    fs.ensureDirSync(projectDir);
    setProjectRoot(projectDir);
    process.chdir(projectDir);
    setUp(appName, projectDir, parentDir).then(config => {
      config.options = options;
      const flipScripts = require(path.resolve(projectDir, 'node_modules/frontflip-scripts/'));
      if (!config.options.nonInteractive) 
        return flipScripts.create(cmd.name, config, utils);
      }
    ).catch(error => {
      process.chdir(parentDir);
      utils
        .fileSystem
        .removeDir(projectDir);
      utils
        .log
        .error(error);
    });
  } catch (error) {
    process.chdir(parentDir);
    utils
      .fileSystem
      .removeDir(projectDir);
    utils
      .log
      .error(error);
  }
}
function init(options) {}
function build(options) {}
function launch(options) {}
function migrate(options) {}
function failIf(condition, message) {
  if (condition) {
    console.error(chalk.red(message));
    return process.exit(1);
  }
}
function setUserHome(env) {
  const userHome = env.configFiles.config && env.configFiles.config.path && path.parse(env.configFiles.config.path);
  const val = userHome && userHome.base && setUserHome(userHome.base)
  process.env.USER_HOME = val;
}
function setProjectRoot(val) {
  process.env.PROJECT_ROOT = val;
}
function setFlipEnv(dev) {
  process.env.FLIP_ENV = dev
    ? 'development'
    : 'production';
}
function setPackageManager(hasYarn) {
  process.env.PACKAGE_MANAGER = hasYarn
    ? 'YARN'
    : 'NPM';
}