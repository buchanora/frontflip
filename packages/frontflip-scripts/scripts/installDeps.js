const spawn = require('cross-spawn');
module.exports = (dependencies, dev)=>{
    return new Promise((resolve, reject) => {
      let command = 'npm';
      let save = dev ? '--save-dev' : '--save'
      let args = [
        'install',
        save,
        '--save-exact',
        '--loglevel',
        'error',
      ].concat(dependencies);
  
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
  }