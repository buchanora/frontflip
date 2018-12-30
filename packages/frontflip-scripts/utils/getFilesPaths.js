const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ffUtils = require('frontflip-utils');
module.exports = (scaffoldRoot, templateRoot, projectFile )=>{
    const pathTree = ffUtils.yaml.parse(fs.readFileSync( path.resolve(scaffoldRoot, projectFile || 'project.yml' )));
    const folders = [];
    const files = [];
    const dirMap = {};
    let rootPath = '';

    getFiles(pathTree.nodes, rootPath);

    return {
        folders,
        files
    };

    function getFiles(nodes, _root){
        nodes.forEach(n=>{
            if(n.type === 'file'){
                files.push({
                    to: _root + n.name,
                    from: n.templateFile ? path.resolve(templateRoot, (n.templateDir || '') , (n.templateFile || '')) : null
                })
            } else if(n.type === 'dir'){
                const scaffoldPath = path.resolve(scaffoldRoot, n.scaffoldDir || '', n.scaffoldDir ? n.name + '.yml' : _root.split('/').join('.') + n.name + '.yml' );
                const currentPath = _root + n.name;
                try {
                    const scaffoldFile = fs.readFileSync(scaffoldPath);
                    const content = ffUtils.yaml.parse(scaffoldFile);
                    if(!dirMap[currentPath]){
                        folders.push(currentPath);
                        dirMap[currentPath] = true;
                    }
                    return content && content.nodes && getFiles(content.nodes, currentPath + '/');
                } catch (error) {
                    console.error(chalk.red(error.message));
                    return;
                }  
            }
        })
    }
}

