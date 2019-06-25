"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csv = require("csv-parser");
var fs = require("fs");
var positiveResults = [];
var negativeResults = [];
function validateEmail(email) {
    var reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reEmail.test(String(email).toLowerCase());
}
function validPhoneNumber(number) {
    var reNumber = /\d\d\d\s?\d\d\s?\d\d\d\d\d/;
    return reNumber.test(number);
}
function length(num1, num2, str) {
    if (str.length < num1 || str.length > num2) {
        return false;
    }
    return true;
}
function valiDate(data) {
    var reDate = /\d\d\S\d\d\S\d\d\d\d/;
    return reDate.test(data);
}
fs.createReadStream('./Users.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', function (data) {
    var personalData = [];
    var valid = true;
    var requireId = true;
    for (var key in data) {
        var obj = {
            name: null,
            value: null,
            validators: null,
            description: null
        };
        if (key === "ID") {
            obj.name = key;
            obj.value = data[key];
            if (isNaN(parseInt(data[key])) && requireId) {
                obj.validators = false;
                obj.description = 'ID Error: NaN';
                valid = false;
                personalData.push(obj);
                console.log('ID Error: NaN');
                continue;
            }
            if (!length(1, 4, data[key]) && requireId) {
                obj.validators = false;
                obj.description = 'ID Error: wrong number of symbols';
                valid = false;
                personalData.push(obj);
                console.log('ID Error: wrong number of symbols');
                continue;
            }
            obj.validators = true;
            obj.description = 'good';
            personalData.push(obj);
            continue;
        }
        if (key === "Name") {
            obj.name = key;
            obj.value = data[key];
            if (!length(1, 18, data[key])) {
                obj.validators = false;
                obj.description = 'Name Error: wrong number of symbols';
                valid = false;
                personalData.push(obj);
                console.log('Name Error: wrong number of symbols');
                continue;
            }
            obj.validators = true;
            obj.description = 'good';
            personalData.push(obj);
            continue;
        }
        if (key === "Surname") {
            obj.name = key;
            obj.value = data[key];
            if (!length(1, 18, data[key])) {
                obj.validators = false;
                obj.description = 'Surname Error: wrong number of symbols';
                valid = false;
                personalData.push(obj);
                console.log('Surname Error: wrong number of symbols');
                continue;
            }
            obj.validators = true;
            obj.description = 'good';
            personalData.push(obj);
            continue;
        }
        if (key === "Mail") {
            obj.name = key;
            obj.value = data[key];
            if (!length(6, 18, data[key])) {
                obj.validators = false;
                obj.description = 'Mail Error: wrong number of symbols';
                valid = false;
                personalData.push(obj);
                console.log('Mail Error: wrong number of symbols');
                continue;
            }
            if (!validateEmail(data[key])) {
                obj.validators = false;
                obj.description = 'Mail Error: incorrect email format';
                valid = false;
                personalData.push(obj);
                console.log('Mail Error: incorrect email format');
                continue;
            }
            obj.validators = true;
            obj.description = 'good';
            personalData.push(obj);
            continue;
        }
        if (key === "Date of registration") {
            obj.name = key;
            obj.value = data[key];
            if (data[key].length !== 10) {
                obj.validators = false;
                obj.description = 'Date Error: wrong number of symbols';
                valid = false;
                personalData.push(obj);
                console.log('Date Error: wrong number of symbols');
                continue;
            }
            if (!valiDate(data[key])) {
                obj.validators = false;
                obj.description = 'Date Error: incorrect date format';
                valid = false;
                personalData.push(obj);
                console.log('Date Error: incorrect date format');
                continue;
            }
            obj.validators = true;
            obj.description = 'good';
            personalData.push(obj);
            continue;
        }
        if (key === "Phone") {
            obj.name = key;
            obj.value = data[key];
            if (!length(14, 16, data[key])) {
                obj.validators = false;
                obj.description = 'Phone Error: wrong number of symbols';
                valid = false;
                personalData.push(obj);
                console.log('Phone Error: wrong number of symbols');
                continue;
            }
            if (!validPhoneNumber(data[key])) {
                obj.validators = false;
                obj.description = 'Phone Error: incorrect phone format';
                valid = false;
                personalData.push(obj);
                console.log('Phone Error: incorrect phone format');
                continue;
            }
            obj.validators = true;
            obj.description = 'good';
            personalData.push(obj);
            continue;
        }
    }
    console.log(valid);
    if (valid) {
        positiveResults.push(personalData);
        return;
    }
    negativeResults.push(personalData);
    return;
})
    .on('end', function () {
    fs.writeFileSync("valid.json", JSON.stringify(positiveResults));
    fs.writeFileSync("not-valid.json", JSON.stringify(negativeResults));
});
//# sourceMappingURL=parser.js.map