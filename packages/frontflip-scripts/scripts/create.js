'use strict';
const questions = require('../prompts/');
const build = require('./build');
const utils = require('../utils/');

module.exports = function(type, config, cli){
  return cli.prompt(questions.create)
    .then(answers=>{
      config.adapter = answers.adapter.name;
      const adapter = utils.getAdapter(config.adapter)(config);
      cli.configure.projectAdapter(config.adapter, adapter);
      const updatedConfig = cli.config.retrieve();
      return build('project', Object.assign({}, config, updatedConfig), cli)
    })
    .then(()=>{
      cli.log.info('build successful');
    })
    .catch(error=>{
      cli.log.error(error);
      process.exit(1);
    })
}