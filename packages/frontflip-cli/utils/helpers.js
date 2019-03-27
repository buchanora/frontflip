const execSync = require('child_process').execSync;
exports.hasYarn = exports.checkYarnAvailability = () => {
    try {
        execSync('yarnpkg --version', {stdio: 'ignore'});
        return true;
    } catch (error) {
        return false;
    }
};