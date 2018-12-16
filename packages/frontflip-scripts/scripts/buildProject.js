const getPaths = require('./getPaths');
const fs = require('fs-extra');
const path = require('path')

module.exports = (project, projectRoot, answers)=>{
    if(project.folders){
        project.folders.forEach(folder=>{
            fs.ensureDirSync(folder)
        })
    }
    if(project.files){
        project.files.forEach(file=>{
            const filePath = path.resolve(projectRoot, file.to)
            if(file.from){
                fs.copySync(file.from, filePath )
            }else{
                fs.ensureFileSync(filePath)
            }
        })
    }
    return project;
}
