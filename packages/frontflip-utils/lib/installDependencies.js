const spawn = require('cross-spawn');
const execSync = require('child_process').execSync;
module.exports = (dependencies, dev, useYarn) => {
  if(!dependencies.length > 0) return;
  return new Promise((resolve, reject) => {
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
    
    const childProcess = spawn(command, args, {stdio: 'inherit'});

    childProcess.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }
      resolve();
    });
  });
};