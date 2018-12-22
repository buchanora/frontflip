const spawn = require('cross-spawn');
module.exports = (dependencies, dev, useYarn) => {
  return new Promise((resolve, reject) => {
    if(!dependencies.length > 0) return resolve();
    let command;
    let save;
    let args; 
      
    if(useYarn){
      command = 'yarn';
      save = dev? '-D' : '';
      args = [
        'add',
      ].concat(dependencies);
      if(save){
        args = args.concat([save]);
      }
    }else{
      command = 'npm';
      save = dev ? '--save-dev' : '--save'
      args = [
        'install',
        save,
        '--save-exact',
        '--loglevel',
        'error',
      ].concat(dependencies);
    }
    
    const childProcess = spawn.sync(command, args, {stdio: 'inherit'});
    if(childProcess.status !== 0){
      reject({
        command: `${command} ${args.join(' ')}`
      });
      return;
    }
    resolve();
  });
};