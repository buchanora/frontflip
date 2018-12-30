const chai = require('chai');
const compileTemplate = require('../compileTemplate');
chai.should();

describe('utils - compileTemplate', ()=>{
    it('should return a string value', (done)=>{
        const result = compileTemplate('This is a string')({});
        result.should.be.a('string');
        done();
    });
    it('should compile a string', (done)=>{
        const result = compileTemplate('My name is {{name}}')({name: 'Buchi'});
        result.should.equal('My name is Buchi');
        done();
    });
    it('should compile a javascript object', (done) => {
        const result = compileTemplate('const {{name}} = { {{property}}: {{value}} }')({name: 'Olu', property: 'height', value: '6ft'});
        result.should.equal('const Olu = { height: 6ft }');
        done();
    });
    it('should compile a JSX value', (done) => {
        const result = compileTemplate('<MenuBar>{props.height} | {{loginButtonText}}</MenuBar>')({loginButtonText: 'LOGIN'});
        result.should.equal('<MenuBar>{props.height} | LOGIN</MenuBar>');
        done();
    });
})