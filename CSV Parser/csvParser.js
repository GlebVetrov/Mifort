"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv = require("csv-parser");
var fs = require("fs");
var configCsv = require('./config.js');
var positiveResult = [];
var negativeResult = [];
var Validators = /** @class */ (function () {
    function Validators(_objData, _options) {
        this.array = [];
        this.dataError = false;
        this.objData = _objData;
        this.options = _options;
    }
    Validators.prototype.createObjList = function () {
        for (var i = 0; i < this.options.length; i++) {
            this.array[i] = {};
        }
    };
    Validators.prototype.matchName = function () {
        for (var i = 0; i < this.options.length; i++) {
            for (var data in this.objData) {
                if (this.options[i]['name'] === data) {
                    this.array[i]['name'] = data;
                    break;
                }
                if (this.options.length === i) {
                    this.array[i]['name'] = this.errorMassage("not name: " + this.options[i]['name']);
                    break;
                }
            }
        }
        return;
    };
    Validators.prototype.validType = function () {
        for (var i = 0; i < this.options.length; i++) {
            for (var data in this.objData) {
                if (this.options[i]['type'] === typeof data && this.options[i]['name'] === data) {
                    this.array[i]['type'] = typeof data;
                    break;
                }
                if (this.options.length === i) {
                    this.array[i]['type'] = this.errorMassage("wrong type: not " + typeof data);
                    break;
                }
            }
        }
        return;
    };
    Validators.prototype.validValue = function () {
        for (var i = 0; i < this.options.length; i++) {
            for (var data in this.objData) {
                if (this.options[i]['name'] === data) {
                    this.array[i]['value'] = this.getValue(data, this.objData);
                    break;
                }
                if (this.options.length === i) {
                    this.array[i]['value'] = this.errorMassage("not value");
                    break;
                }
            }
        }
        return;
    };
    Validators.prototype.validValueLength = function () {
        for (var i = 0; i < this.options.length; i++) {
            for (var data in this.objData) {
                if (this.options[i]['name'] === data) {
                    this.array[i]['valueLength'] = this.isValidateLength(this.objData[data], this.options[i]['validators']) ?
                        'length valid' : this.errorMassage('length not valid');
                    break;
                }
                if (this.options.length === i) {
                    this.array[i]['valueLength'] = this.errorMassage("not value length");
                    break;
                }
            }
        }
        return;
    };
    Validators.prototype.getValue = function (data, objData) {
        switch (data) {
            case 'ID':
                var id = this.isValidateId(objData[data]);
                return id ? objData[data] : this.errorMassage("wrong value: " + objData[data]);
            case 'Name':
                var name_1 = this.isValidateName(objData[data]);
                return name_1 ? objData[data] : this.errorMassage("wrong value: " + objData[data]);
            case 'Surname':
                var surname = this.isValidateName(objData[data]);
                return surname ? objData[data] : this.errorMassage("wrong value: " + objData[data]);
            case 'Mail':
                var mail = this.isValidateEmail(objData[data]);
                return mail ? objData[data] : this.errorMassage("wrong value: " + objData[data]);
            case 'Date of Registration':
                var date = this.isValidateDate(objData[data]);
                return date ? objData[data] : this.errorMassage("wrong value: " + objData[data]);
            case 'Phone':
                var phone = this.isValidatePhone(objData[data]);
                return phone ? objData[data] : this.errorMassage("wrong value: " + objData[data]);
            default:
                return;
        }
    };
    Validators.prototype.isValidateEmail = function (email) {
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEmail.test(String(email).toLowerCase());
    };
    Validators.prototype.isValidatePhone = function (number) {
        var regNumber = /\d\d\d\s?\d\d\s?\d\d\d\d\d/;
        return regNumber.test(number);
    };
    Validators.prototype.isValidateLength = function (str, array) {
        if (str.length < array[0] || str.length > array[1]) {
            return false;
        }
        return true;
    };
    Validators.prototype.isValidateDate = function (date) {
        var regDate = /\d\d\S\d\d\S\d\d\d\d/;
        return regDate.test(date);
    };
    Validators.prototype.isValidateId = function (id) {
        return !isNaN(Number(id));
    };
    Validators.prototype.isValidateName = function (name) {
        var regName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u;
        return regName.test(name);
    };
    Validators.prototype.errorMassage = function (str) {
        this.dataError = true;
        console.log("[Error (" + str + ")]");
        return str;
    };
    Validators.prototype.getData = function () {
        var dataError = this.dataError;
        var array = this.array;
        var data = {
            dataError: dataError,
            array: array
        };
        return data;
    };
    Validators.prototype.makeAllValidation = function () {
        this.createObjList();
        this.matchName();
        this.validType();
        this.validValue();
        this.validValueLength();
    };
    return Validators;
}());
fs.createReadStream('Users.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', function (data) {
    var test = new Validators(data, configCsv);
    test.makeAllValidation();
    var obj = test.getData();
    obj.dataError ? negativeResult.push(obj) : positiveResult.push(obj);
})
    .on('end', function () {
    fs.writeFileSync("valid.json", JSON.stringify(positiveResult));
    fs.writeFileSync("not-valid.json", JSON.stringify(negativeResult));
});
//# sourceMappingURL=csvParser.js.map