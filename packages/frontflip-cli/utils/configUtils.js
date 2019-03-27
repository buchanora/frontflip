const log = require('./logUtils');
const path = require('path');
const fs = require('fs-extra');
function parse(configPath){
    try {
        if(!configPath) throw new Error('No config path');
        let parsedConfig = {}
        const configFile = fs.readFileSync(configPath);   
        return parsedConfig;
    } catch (error) {
        log.error(error)
    }
}
function projectAdapter(name, adapter){
    setKey('adapter', name);
    if (typeof adapter.getBuilder === 'function'){
        const builders = adapter.getBuilder();
        const builderPropsOnly = {}
        for(let builderName in builders){
            if(builders.hasOwnProperty(builderName)){
                const builder = builders[builderName]
                builderPropsOnly[builderName] = {
                    definition: builder.definition,
                    extends: builder.extends,
                    template: builder.template
                }
            }
        }
        newBuilder(builderPropsOnly);
    }
}
function newBuilder(newBuilders){
    const builders = getKey('builders')
    const updated = Object.assign({},  builders, newBuilders);
    setKey('builders', updated);
}
function getConfigFilePath(){
    const userHome = process.env.USER_HOME;
    const projectHome = process.env.PROJECT_ROOT;
    return path.join(projectHome, '.flip', 'projectconfig');
}
function getKey(key){
    try {   
        const config = retrieve();
        return config[key];
    } catch (error) {
        log.error(error);  
    }
}
function setKey(key, value){
    try {   
        const config = retrieve();
        config[key] = value;
        save(config);
    } catch (error) {
        log.Error(error);   
    }
}
function retrieve(){
    try {   
        const configFile = getConfigFilePath();
        return fs.readJSONSync(configFile)
    } catch (error) {
        log.error(error);   
    }
}
function save(configObj){
    try {
        const configFile = getConfigFilePath();
        fs.writeJSONSync(configFile, configObj);
    } catch (error) {
        log.error(error);
    }
}
function create(configObj = {}){
    try { 
        const configFile = getConfigFilePath();
        if (fs.pathExistsSync(configFile)) throw new Error('You already have a config file');
        fs.ensureFileSync(configFile);
        save(configObj);
    } catch (error) {
        log.error(error);
    }
}
module.exports = {
    getKey,
    setKey,
    retrieve,
    create,
    getConfigFilePath,
    parse,
    projectAdapter,
    newBuilder
}
