"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var csv = require("csv-parser");
var fs = require("fs");
var configCsv = require('./config.js');
var positiveResult = [];
var negativeResult = [];
var Validators = /** @class */ (function () {
    function Validators(_objData, _options) {
        var _this = this;
        this.isValidateLength = function () {
            var length = _this.length;
            var value = _this.objData.value;
            if (value.length < length[0] || value.length > length[1]) {
                return false;
            }
            return true;
        };
        this.validationType = function () {
            var validTypes = _this.validTypes;
            var _a = _this.objData, name = _a.name, value = _a.value;
            for (var key in validTypes) {
                if (key === name) {
                    return validTypes[key](value);
                }
            }
            return true;
        };
        this.dataError = false;
        this.validObj = {
            validators: {}
        };
        this.validators = {
            length: this.isValidateLength,
            type: this.validationType
        };
        this.validTypes = {
            ID: this.isValidateId,
            Name: this.isValidateName,
            Surname: this.isValidateName,
            Mail: this.isValidateEmail,
            'Date of Registration': this.isValidateDate,
            Phone: this.isValidatePhone
        };
        this.length = _options.length;
        this.objData = _objData;
        this.options = _options;
    }
    Validators.prototype.validation = function () {
        var _a = this, options = _a.options, validators = _a.validators, validObj = _a.validObj;
        for (var key in options) {
            for (var val in validators) {
                if (key === val) {
                    if (validators[val]()) {
                        validObj['validators'][val] = 'valid';
                        break;
                    }
                    validObj['validators'][val] = this.errorMessage(val + " not valid");
                    break;
                }
            }
        }
    };
    Validators.prototype.isValidateEmail = function (email) {
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEmail.test(String(email).toLowerCase());
    };
    Validators.prototype.isValidatePhone = function (number) {
        var regNumber = /\d{3}\s?\d\d\s?\d{7}/;
        return regNumber.test(number);
    };
    Validators.prototype.isValidateDate = function (date) {
        var regDate = /\d\d\S\d\d\S\d{4}/;
        return regDate.test(date);
    };
    Validators.prototype.isValidateId = function (id) {
        return !isNaN(Number(id));
    };
    Validators.prototype.isValidateName = function (name) {
        var regName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u;
        return regName.test(name);
    };
    Validators.prototype.errorMessage = function (str) {
        this.dataError = true;
        console.log("[Error (" + str + ")]");
        return str;
    };
    Validators.prototype.getError = function () {
        return this.dataError;
    };
    Validators.prototype.getData = function () {
        var _a = this, validObj = _a.validObj, objData = _a.objData;
        validObj = __assign({}, objData, validObj);
        return validObj;
    };
    return Validators;
}());
fs
    .createReadStream('Users.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', function (data) {
    var validArray = createObjList(configCsv);
    validArray = matchConfigName(configCsv, validArray, data);
    validatWithConfig(validArray, configCsv);
})
    .on('end', function () {
    fs.writeFileSync("valid.json", JSON.stringify(positiveResult));
    fs.writeFileSync("not-valid.json", JSON.stringify(negativeResult));
});
function createObjList(options) {
    var array = [];
    for (var i = 0; i < options.length; i++) {
        array[i] = {};
    }
    return array;
}
function matchConfigName(options, array, data) {
    for (var i = 0; i < options.length; i++) {
        for (var key in data) {
            if (options[i]['name'] === key) {
                array[i]['name'] = key;
                array[i]['value'] = data[key];
                break;
            }
            if (options.length - 1 === i) {
                array[i]['name'] = errorMessage("not data: " + options[i]['name']);
                break;
            }
        }
    }
    return array;
}
function errorMessage(str) { return str; }
function validatWithConfig(array, options) {
    var vadlidWithConfig = [];
    var validError = false;
    for (var i = 0; i < options.length; i++) {
        if (options[i]['name'] === array[i]['name']) {
            var item = new Validators(array[i], options[i]['validators']);
            item.validation();
            vadlidWithConfig.push(item.getData());
            if (!validError) {
                validError = item.getError();
            }
        }
    }
    if (validError) {
        negativeResult.push(vadlidWithConfig);
        return;
    }
    positiveResult.push(vadlidWithConfig);
    return;
}
//# sourceMappingURL=csvParser.js.map