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
    function Validators(item, options) {
        this.validators = {};
        this.isValid = true;
        this.regExps = {
            ID: /^\d+$/,
            Name: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u,
            Surname: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u,
            Mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Date of Registration': /\d\d\S\d\d\S\d{4}/,
            Phone: /\d{3}\s?\d\d\s?\d{7}/,
        };
        this.item = item;
        this.options = options;
        this.value = this.item.value.trim();
        this.length = this.value.length;
        this.rules = this.options.rules;
        this.mesages = this.options.messages;
    }
    Validators.prototype.min = function (param) {
        return this.length >= param;
    };
    ;
    Validators.prototype.max = function (param) {
        return this.length <= param;
    };
    ;
    Validators.prototype.match = function (param) {
        // @ts-ignore
        return this.regExps[param].test(this.value);
    };
    ;
    Validators.prototype.createMessage = function (message, settings) {
        for (var key in settings) {
            // @ts-ignore
            console.log("Error " + key + " " + settings[key]);
        }
        return message;
    };
    ;
    Validators.prototype.validate = function () {
        this.value = this.item.value.trim();
        this.length = this.value.length;
        for (var rule in this.rules) {
            // @ts-ignore
            // console.log(typeof this.rules[rule])
            // @ts-ignore
            var param = this.rules[rule];
            // @ts-ignore
            var result = this[rule](param);
            if (result) {
                this.validators[rule] = 'valid';
            }
            if (!result) {
                this.isValid = false;
                // @ts-ignore
                this.validators[rule] = this.mesages[rule];
                // @ts-ignore
                var message = this.createMessage(message, {
                    data: this.value,
                    // @ts-ignore
                    rule: this.mesages[rule]
                });
            }
        }
        return __assign({}, this.item, this.validators);
    };
    ;
    Validators.prototype.getError = function () {
        return this.isValid;
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
        array[i] = { name: null, value: null };
    }
    return array;
}
function matchConfigName(options, array, data) {
    var keys = Object.keys(data);
    for (var i = 0; i < options.length; i++) {
        if (options[i]['name'] === keys[i]) {
            array[i]['name'] = keys[i];
            array[i]['value'] = data[keys[i]];
            continue;
        }
        array[i]['name'] = "not value " + options[i]['name'];
        console.log("not value " + options[i]['name']);
    }
    return array;
}
function validatWithConfig(array, options) {
    var vadlidWithConfig = [];
    var validError = true;
    for (var i = 0; i < options.length; i++) {
        if (options[i]['name'] === array[i]['name']) {
            var item = new Validators(array[i], options[i]['validators']);
            var obj = item.validate();
            vadlidWithConfig.push(obj);
            if (validError) {
                validError = item.getError();
            }
            continue;
        }
        validError = false;
        vadlidWithConfig.push(array[i]);
    }
    if (validError) {
        positiveResult.push(vadlidWithConfig);
        return;
    }
    negativeResult.push(vadlidWithConfig);
    return;
}
//# sourceMappingURL=csvParser.js.map