const spawn = require('cross-spawn');
exports.dependencies = {}
exports.dependencies.link = exports.dependencies.withLink = function (dependencies) {
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
exports.dependencies.add = exports.dependencies.withAdd = (dependencies, isDev) => {
    const useYarn = process.env.PACKAGE_MANAGER === 'YARN';
    return new Promise((resolve, reject) => {
        if (!dependencies.length > 0) 
            return resolve();
        let command;
        let save;
        let args;

        if (useYarn) {
            command = 'yarn';
            save = isDev
                ? '-D'
                : '';
            args = ['add'].concat(dependencies);
            if (save) {
                args = args.concat([save]);
            }
        } else {
            command = 'npm';
            save = isDev
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