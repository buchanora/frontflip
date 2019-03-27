const chalk = require('chalk');
exports.error = (error) => {
    console.log('ERROR: ' + '[' + error.name + '] ' +  chalk.red(error.message));
    console.error(error);
}
exports.info = (info) =>{
    console.log('INFO: ' +  chalk.cyan(info));
}