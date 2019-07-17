const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const PubSub = require('pubsub-js');

const {createObjList, matchConfigName, validatWithConfig, sortData, Validators} = require('../csvParser.js');

const configCsv = require('../config.js');

const assert = chai.assert;
chai.use(sinonChai);

describe('should create array', () => {
    let testOptions = [
        {
            name: 'ID'
        }, {
            name: 'Name'
        }, {
            name: 'Surname'
        }, {
            name: 'Mail'
        }, {
            name: 'Date of Registration'
        }, {
            name: 'Phone'
        }
    ];
    let expectedArray = [
        {
            name: null,
            value: null
        }, {
            name: null,
            value: null
        }, {
            name: null,
            value: null
        }, {
            name: null,
            value: null
        }, {
            name: null,
            value: null
        }, {
            name: null,
            value: null
        }
    ];
    it('create array with obj{ name: null, value: null}', () => {
        assert.deepEqual(createObjList(testOptions), expectedArray);
    });
});

describe('compere config name with name from csv file', () => {

    it('match name', () => {

        let testArray = [
            {
                name: null,
                value: null
            }, {
                name: null,
                value: null
            }
        ];

        let options = [
            {
                name: 'ID'
            }, {
                name: 'Name'
            }
        ];

        let data = {
            ID: '1001',
            Name: 'Dima'
        };

        let expectedArray = [
            {
                name: 'ID',
                value: '1001'
            }, {
                name: 'Name',
                value: 'Dima'
            }
        ];

        assert.deepEqual(matchConfigName(options, testArray, data), expectedArray);
    });

    it('not match name', () => {

        let testArray = [
            {
                name: null,
                value: null
            }, {
                name: null,
                value: null
            }
        ];

        let options = [
            {
                name: 'ID'
            }, {
                name: 'Name'
            }
        ];

        let dataError = {
            ID: '1001'
        };

        let expectedErrorArray = [
            {
                name: 'ID',
                value: '1001'
            }, {
                name: 'not value Name',
                value: null
            }
        ];

        assert.deepEqual(matchConfigName(options, testArray, dataError), expectedErrorArray);
    });
});

describe('check class Validators', () => {
    let obj = {
        name: 'ID',
        value: '1001'
    };

    it('method min', () => {

        let objError = {
            name: 'ID',
            value: ''
        };
        let rules = {
            min: {
                value: 1,
                textError: 'Поле должно содержать больше 1 символов'
            }
        }
        let test = new Validators(obj, rules);
        let testError = new Validators(objError, rules);
        assert.isTrue(test.min(rules.min.value));
        assert.isFalse(testError.min(rules.min.value));
    });

    it('method max', () => {

        let objError = {
            name: 'ID',
            value: '10011001'
        };
        let rules = {
            max: {
                value: 4,
                textError: 'Поле не должно содержать больше 4 символов'
            }
        }
        let test = new Validators(obj, rules);
        let testError = new Validators(objError, rules);
        assert.isTrue(test.max(rules.max.value));
        assert.isFalse(testError.max(rules.max.value));
    });

    it('method match', () => {

        let objError = {
            name: 'ID',
            value: '10m011m01'
        };
        let rules = {
            match: {
                value: /^\d+$/,
                textError: 'Поле должно содержать валидный id'
            }
        }
        let test = new Validators(obj, rules);
        let testError = new Validators(objError, rules);
        assert.isTrue(test.match(rules.match.value));
        assert.isFalse(testError.match(rules.match.value));
    });

    it('method createMessage', () => {

        let rules = {
            min: {
                value: 1,
                textError: 'Поле должно содержать больше 1 символов'
            }
        }

        let test = new Validators(obj, rules);
        assert.equal(test.createMessage(rules.min.textError, {
            data: obj.value,
            rule: rules.min.textError
        }), rules.min.textError);
    });

    it('method validate and getError', () => {

        let result = {
            name: 'ID',
            value: '1001',
            min: 'valid',
            max: 'valid',
            match: 'valid'
        }

        let rules = {
            rules: {
                min: {
                    value: 1,
                    textError: 'Поле должно содержать больше 1 символов'
                },
                max: {
                    value: 4,
                    textError: 'Поле не должно содержать больше 4 символов'
                },
                match: {
                    value: /^\d+$/,
                    textError: 'Поле должно содержать валидный id'
                }
            }
        }

        let objError = {
            name: 'ID',
            value: '10m011m01'
        };

        let resultError = {
            name: 'ID',
            value: '10m011m01',
            min: 'valid',
            max: 'Поле не должно содержать больше 4 символов',
            match: 'Поле должно содержать валидный id'
        }

        let test = new Validators(obj, rules);
        assert.deepEqual(test.validate(), result);
        assert.isTrue(test.getError());
        let testError = new Validators(objError, rules);
        assert.deepEqual(testError.validate(), resultError);
        assert.isFalse(testError.getError());
    });

});

describe('test function validatWithConfig', () => {
    let array = [
        {
            name: 'ID',
            value: '1001'
        }, {
            name: 'Name',
            value: 'Dima'
        }, {
            name: 'Surname',
            value: 'Dmitriev'
        }, {
            name: 'Mail',
            value: 'Dima@mail.ru'
        }, {
            name: 'Date of Registration',
            value: '02,05,2016'
        }, {
            name: 'Phone',
            value: '375 29 3526547'
        }
    ];


    it('test callback', () => {
        var object = {
            method: validatWithConfig
        };
        var spy = sinon.spy(object, "method");

        object.method(array, configCsv);

        assert(spy.withArgs(array, configCsv).calledOnce);
    });
});
