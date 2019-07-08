const mocha = require('mocha'); 
const chai = require('chai');

const pow = require('../tests');
const createObjList = require('../csvParser.js')

const assert = chai.assert ;

describe('pow', () => {
    it('pow*pow', () => {
        assert.equal(pow(2), 4);
    });
});
describe('should create array', () => {
    it('create array with obj{ name: null, value: null}', () => {
        let testArray = [{}, {}, {}, {}, {}, {}];
        let array = [{ name: null, value: null}, { name: null, value: null}, { name: null, value: null}, { name: null, value: null}, { name: null, value: null}, { name: null, value: null}];
        assert.deepEqual(createObjList(testArray), array);
    });
});