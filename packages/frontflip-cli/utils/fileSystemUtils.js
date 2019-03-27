const fs = require('fs-extra');
const execSync = require('child_process').execSync;
const log = require('./logUtils')
exports.removeDir = (dir) => {
    try {
        execSync('rm -rf ' + dir, {stdio: 'ignore'});
        return true;
    } catch (error) {
        log.error(error);
        return false;
    }
};
exports.safeToMakeDirectory = exports.canSafelyMakeDirectory = (dirPath) =>{
    // TODO: Check if dirname is suitable;
    return !fs.existsSync(dirPath);
}