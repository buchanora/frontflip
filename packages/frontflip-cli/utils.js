const spawn = require('cross-spawn');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const execSync = require('child_process').execSync;
exports.hasYarn = () => {
    try {
        execSync('yarnpkg --version', {stdio: 'ignore'});
        return true;
    } catch (error) {
        return false;
    }
};
exports.dependencies = {};
exports.linkDependencies = exports.dependencies.link = function (dependencies) {
    return new Promise((resolve, reject) => {
        if (!dependencies.length > 0) {
            return resolve(null);
        }
        const command = 'npm';
        const args = ['link'].concat(dependencies);

        const childProcess = spawn.sync(command, args, {stdio: 'inherit'});
        if (childProcess.status !== 0) {
            reject({
                command: `${command} ${args.join(' ')}`
            });
            return;
        }
        resolve(null);
    });
};
exports.installDependencies = exports.dependencies.install = (dependencies, dev) => {
    const useYarn = process.env.PACKAGE_MANAGER === 'YARN';
    return new Promise((resolve, reject) => {
        if (!dependencies.length > 0) 
            return resolve();
        let command;
        let save;
        let args;

        if (useYarn) {
            command = 'yarn';
            save = dev
                ? '-D'
                : '';
            args = ['add'].concat(dependencies);
            if (save) {
                args = args.concat([save]);
            }
        } else {
            command = 'npm';
            save = dev
                ? '--save-dev'
                : '--save'
            args = ['install', save, '--save-exact', '--loglevel', 'error'].concat(dependencies);
        }

        const childProcess = spawn.sync(command, args, {stdio: 'inherit'});
        if (childProcess.status !== 0) {
            reject({
                command: `${command} ${args.join(' ')}`
            });
            return;
        }
        resolve();
    });
};
exports.fileManager = {};
exports.removeDir = exports.fileManager.removeDir = (dir) => {
    try {
        execSync('rm -rf ' + dir, {stdio: 'ignore'});
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};
exports.safeToMakeDirectory = exports.fileManager.safeToMakeDirectory = (dirPath) =>{
    // TODO: Check if dirname is suitable;
    return !fs.existsSync(dirPath);
}
exports.yaml = {};
exports.yaml.parse = (file) => {
    let content;
    try{
        content = yaml.safeLoad(file);
    } catch (e){
        console.log(e);
        return null;
    }
    return content;
};

exports.yaml.dump = (obj) => {
    let content;
    try{
        content = yaml.safeDump(obj);
    } catch (e){
        console.log(e);
        return null;
    }
    return content;
}