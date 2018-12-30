let selectContext = require('../selectContext');

const chai = require('chai');

const should = chai.should();

describe('utils - select context', ()=>{
    const context = {
        boys: {
            mike: {
                name: 'mike',
                age: 12
            },
            bill: {
                name: 'Bill',
                age: 10
            }
        },
        girls: {
            jane: {
                name: 'Jane',
                age: 11
            }
        }
    };
    it('It should return the full context', (done)=>{
        selectContext(context).should.equal(context);    
        done();
    });
    it('It should return the correct nested context', (done)=>{
        selectContext(context, 'boys.mike').should.equal(context.boys.mike);
        done();
    });

    it('It should return the value for the deepest valid key fragment', (done)=>{
        selectContext(context, 'boys.mike.name.firstLetter').should.equal(context.boys.mike.name);
        done();
    });
});