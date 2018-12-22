const spawn = require('cross-spawn');
module.exports = function(dependencies){
  return new Promise((resolve, reject) => { 
    if(!dependencies.length > 0) {
      return resolve(null);
    }
    console.log('Linking dependencies');
    
    const command = 'npm';
    const args = [
      'link',
    ].concat(dependencies);
    
    const childProcess = spawn.sync(command, args, {stdio: 'inherit'});
    if(childProcess.status !== 0){
      reject({
        command: `${command} ${args.join(' ')}`
      });
      return;
    }
    
    resolve(null);
  });
};