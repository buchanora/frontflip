const path = require('path');
const adapters = require('../adapters/');
module.exports = (name) => {
    return function(config){
        let adapter;
        const builder = config.builders[name];
        try { 
            if (builder){
                const package = builder.extends
                require.resolve(package);
                adapter = require(package);
            } else {
                throw new Error('Adapter package is not installer')
            }
        } catch (error) {
            if (builder && adapters[builder.extends]) {
                adapter = adapters[builder.extends]
            } else if (adapters[name]) {
                adapter = adapters[name];
            } else {   
                throw new Error('Adapter does not exist you must register an adapter before using it.');
            }
        }
        const projectDir = process.env.PROJECT_ROOT;
        const scaffoldRoot = path.resolve(projectDir, '.flip', config.scaffoldDir);
        const templateRoot = path.resolve(projectDir, '.flip', config.templateDir);
        const buildFile = path.resolve(scaffoldRoot, adapter.definition + '.yml');
        return Object.assign({}, adapter, {
            scaffoldRoot,
            templateRoot,
            buildFile
        }, config);
    }
}