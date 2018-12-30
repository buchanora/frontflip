const chai = require('chai');
const getFilePaths = require('../getFilesPaths');
chai.should();
const path = require('path');

const scaffoldRoot = path.resolve(__dirname, 'pathAssets/scaffold');
const templateRoot = path.resolve(__dirname, 'pathAssets/templates');

describe('utils - getFilePaths', ()=>{
    const result = getFilePaths(scaffoldRoot, templateRoot);
    it('should return folders and files lists', (done)=>{
        result.should.be.a('object');
        result.should.have.property('folders');
        result.folders.should.be.an('array');
        result.folders.length.should.equal(2);
        result.should.have.property('files');
        result.files.should.be.an('array');
        result.files.length.should.equal(4);
        done();
    });
    it('should compute folder paths correctly', (done)=>{
        result.folders[0].should.equal('app');
        result.folders[1].should.equal('api');
        done();
    });
    it('should compute file paths correctly', (done)=>{
        result.files[0].to.should.equal('app.js');
        result.files[1].to.should.equal('api.js');
        done();
    });
    it('should compute file template paths correctly', (done)=>{
        result.files[0].from.should.equal(path.resolve(__dirname, 'pathAssets/templates', 'app.hbs'));
        result.files[1].from.should.equal(path.resolve(__dirname, 'pathAssets/templates/api','api.js'));
        done();
    });
})