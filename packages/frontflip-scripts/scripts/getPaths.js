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
        if(structure.files){
            structure.files.forEach(file=>{
                if(file.templateFile){
                    files.push({
                        to: prevPath + file.name,
            prev: path.resolve(__dirname, '..', 'templates', (file.templateDir || '') , (file.templateFile || ''))
                    })
                }  else{
                    files.push({
                        to: prevPath + file.name,
                        from: null
                    })
                } 
            })
        }
        if(structure.children){
            structure.children.forEach(child=>{
                const currentPath = prevPath + child.path + '/'; 
                folders.push(currentPath);
                getFolders(child, currentPath)
            });
        }
    }
}

