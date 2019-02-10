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
                    from: n.templateFile ? path.resolve(templateRoot, (n.templateDir || '') , (n.templateFile || '')) : null,
                    context: n.context
                })
            } else if(n.type === 'dir'){
                const scaffoldPath = path.resolve(scaffoldRoot, n.scaffoldDir || '', n.scaffoldDir ? n.name + '.yml' : _root.split('/').join('.') + n.name + '.yml' );
                const currentPath = _root + n.name;
                // Register the current directory in both the references hash and the folders list
                if(!dirMap[currentPath]){
                    folders.push(currentPath);
                    dirMap[currentPath] = true;
                }
                // Check is the nodes array is defined on the the current directory
                if(n.nodes && Array.isArray(n.nodes)){
                    return getFiles(n.nodes, currentPath + '/');
                }
                // Check if there is a file in the scaffold file path that matches the current directory's name
                try {
                    const scaffoldFile = fs.readFileSync(scaffoldPath);
                    const content = ffUtils.yaml.parse(scaffoldFile);
                    if (content && content.nodes){
                        return getFiles(content.nodes, currentPath + '/');
                    } else if (Array.isArray(content)){
                        return getFiles(content, currentPath + '/');
                    }
                } catch (error) {
                    console.error(chalk.red(error.message));
                    return;
                }  
            }
        })
    }
}

