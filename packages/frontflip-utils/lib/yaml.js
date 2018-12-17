import yaml from 'js-yaml';

exports.parse = (file) => {
    let content;
    try{
        content = yaml.safeLoad(file);
    } catch (e){
        console.log(e);
        return null;
    }
    return content;
};

exports.dump = (obj) => {
    let content;
    try{
        content = yaml.safeDump(obj);
    } catch (e){
        console.log(e);
        return null;
    }
}