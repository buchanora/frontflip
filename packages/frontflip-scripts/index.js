'use strict';

module.exports = {
  init: require('./scripts/init'),
  build: (command) => {

  },
  run: (command, args) => {
    switch (command) {
      case 'build':
        require('./scripts/build')(args);
        break;
      default:
    }
  }
}
