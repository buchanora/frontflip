const scaffold = require('../scaffold/');
const getPaths = require('./getPaths');

module.exports = (answers)=>{
    const project = getPaths(scaffold.project)
    return project;
}
