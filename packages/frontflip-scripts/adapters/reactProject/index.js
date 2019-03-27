const utils = require('../../utils');
const defaultDependencies = require('./dependencies');
const projectPrompt = require('./projectPrompt');
const builders = {
    project: {
      definition: 'project',
      extends: 'reactProject',
      template: '',
      getContext(config, cli) {
        return cli.prompt(projectPrompt);
      },
      hooks: {
          prebuild: [
              installDependencies, addPackageScripts, addTestConfigs
          ],
          postBuild: null
      },
      filters: {
          build: null
      }
    },
    module: {
      definition: 'module',
      extends: 'reactProject',
      template: 'module'
    },
    component: {
      definition: 'component',
      extends: 'reactProject',
      template: 'component'
    },
    page: {
      definition: 'pageView',
      extends: 'reactProject',
      template: 'page'
    }
  }
const Project = {
    name: 'reactProject',
    register(config, cli) {},
    getBuilder(name){
        if(name) return builders[name];
        return builders;
    }
}

function addPackageScripts(paths, context, cli) {
    return addPackageScripts(config.project.dir, context)
};
function addTestConfigs(paths, context, cli) {
    return addTestConfigs(config.project.dir, context);
};

function installDependencies(paths, context, cli) {
    return new Promise((resolve, reject) => {
        try {
            const dependencies = utils.getDependencies(context);
            cli
                .dependencies
                .install(dependencies.core.concat(defaultDependencies.core), false)
                .then(() => {
                    return cli
                        .dependencies
                        .install(dependencies.dev.concat(defaultDependencies.dev), true)
                })
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                })
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = Project;