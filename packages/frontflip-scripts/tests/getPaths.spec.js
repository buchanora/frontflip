let getPaths = require('../scripts/getPaths');
const scaffold = require('../scaffold/')

const chai = require('chai');

const should = chai.should();

describe('Get Paths', ()=>{
    it('It should return a map of folder paths', (done)=>{
        const folderPaths = getPaths(scaffold.project)
        console.log(folderPaths);
        
        done()
    })  
})





