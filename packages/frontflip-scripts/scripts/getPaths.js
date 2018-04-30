const path = require('path')
module.exports = (pathTree)=>{
    const folders = [];
    const files = [];
    let rootPath = '';


    getFolders(pathTree, rootPath)

    return {
        folders,
        files
    };

    function getFolders(structure, prevPath){
        if(structure.children){
            structure.children.forEach(child=>{
                const currentPath = prevPath + child.path + '/'; 
                folders.push(currentPath);
                if(child.files){
                    child.files.forEach(file=>{
                        files.push({
                            to: currentPath + file.name,
                            from: path.resolve(__dirname, '..', 'templates', (file.templateDir || '') , (file.templateFile || ''))
                        })
                    })
                }
                getFolders(child, currentPath)
            });
        }
    }
}

