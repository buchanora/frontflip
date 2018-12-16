const execSync = require('child_process').execSync;
module.exports = () => {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
};