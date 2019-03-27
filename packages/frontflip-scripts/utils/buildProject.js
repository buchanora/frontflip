const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const compileTemplate = require('./compileTemplate');
const selectContext = require('./selectContext');

module.exports = (paths, projectRoot, context) => {
    console.log(chalk.blue('Starting Project Build'));
    if(paths.folders){
        paths.folders.forEach(folder => {
            fs.ensureDirSync(folder)
        });
    }
    if(paths.files){
        paths.files.forEach(file => {
            try {
                const filePath = path.resolve(projectRoot, file.to);
                fs.ensureFileSync(filePath);
                if(file.from){
                    if (file.context){
                        const template = compileTemplate(fs.readFileSync(file.from, 'utf8'))(selectContext(context, typeof file.context === 'string' && file.context));
                        fs.writeFileSync(filePath, template);
                        return;
                    }
                    fs.copySync(file.from, filePath);
                }
            } catch (error) {
                console.warn(error);
            }
        });
    }
    return paths;
}
