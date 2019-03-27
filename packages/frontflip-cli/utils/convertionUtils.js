const yaml = require('js-yaml');
exports.yaml = {};
exports.yaml.parse = exports.yaml.fromJson = exports.yaml.fromJSON = (file) => {
    let content;
    try{
        content = yaml.safeLoad(file);
    } catch (e){
        console.log(e);
        return null;
    }
    return content;
};

exports.yaml.dump = exports.yaml.toJson = exports.yaml.toJSON = (obj) => {
    let content;
    try{
        content = yaml.safeDump(obj);
    } catch (e){
        console.log(e);
        return null;
    }
    return content;
}