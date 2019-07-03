import csv = require('csv-parser');
import fs = require('fs');
let configCsv : ColumnDescriptor[] = require('./config.js');

let positiveResult : Array < object >= [];
let negativeResult : Array < object >= [];

interface ColumnDescriptor {
    name : string,
    validators : Validators

}

interface Validators {
    length : number[],
    type : string
}

interface IValidData {
    dataError : boolean;
    objData : {
        name?: string,
        value?: string
    };
    options : Validators;
    validTypes : any;
}

interface IIsValidate {
    isValidateEmail(email : string) : boolean;
    isValidatePhone(number : string) : boolean;
    isValidateLength() : boolean;
    isValidateDate(date : string) : boolean;
    isValidateId(id : string) : boolean;
    isValidateName(name : string) : boolean;
}

interface IValidators extends IValidData,
IIsValidate {
    validationType(): void;
    errorMessage(str : string): string;
    getData(): object;
}

interface IValidTypes {
    ID : (id : string) => boolean;
    Name : (name : string) => boolean;
    Surname : (name : string) => boolean;
    Mail : (email : string) => boolean;
    'Date of Registration' : (date : string) => boolean;
    Phone : (number : string) => boolean;
}

interface IUser {
    ID : string,
    Name : string,
    Surname : string,
    Mail : string,
    'Date of Registration' : string,
    [Phone : string] : string
}

class Validators implements IValidators {

    isValidateLength = () : boolean => {
        let {length} = this;
        let {value} = this.objData;
        if (value.length < length[0] || value.length > length[1]) {
            return false;
        }
        return true;
    }

    validationType = () : boolean => {
        let {validTypes} = this;
        let {name, value} = this.objData;
        for (let key in validTypes) {
            if (key === name) {
                return validTypes[key](value);
            }
        }
        return true;
    }

    dataError : boolean = false;
    objData : {
        name?: string,
        value?: string
    };
    validObj : any = {
        validators: {

        }
    };
    options : Validators;
    validators : any = {
        length: this.isValidateLength,
        type: this.validationType
    }
    validTypes : any = {
        ID: this.isValidateId,
        Name: this.isValidateName,
        Surname: this.isValidateName,
        Mail: this.isValidateEmail,
        'Date of Registration': this.isValidateDate,
        Phone: this.isValidatePhone
    }

    constructor(_objData : {
        name?: string,
        value?: string
    }, _options : Validators) {
        this.length = _options.length;
        this.objData = _objData;
        this.options = _options;
    }

    validation() : void {
        let {options, validators, validObj} = this;
        for (let key in options) {
            for (let val in validators) {
                if (key === val) {
                    if (validators[val]()) {
                        validObj['validators'][val] = 'valid';
                        break;
                    }
                    validObj['validators'][val] = this.errorMessage(`${val} not valid`);
                    break;
                }
            }
        }
    }

    isValidateEmail(email : string) : boolean {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEmail.test(String(email).toLowerCase());
    }

    isValidatePhone(number : string) : boolean {
        let regNumber = /\d{3}\s?\d\d\s?\d{7}/;
        return regNumber.test(number);
    }

    isValidateDate(date : string) : boolean {
        let regDate = /\d\d\S\d\d\S\d{4}/;
        return regDate.test(date);
    }

    isValidateId(id : string) : boolean {
        return !isNaN(Number(id));
    }

    isValidateName(name : string) : boolean {
        let regName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u;
        return regName.test(name);
    }

    errorMessage(str : string) : string {
        this.dataError = true;
        console.log(`[Error (${str})]`);
        return str;
    }

    getError() : boolean {
        return this.dataError;
    }

    getData() : object {
        let {validObj, objData} = this;
        validObj = {
            ...objData,
            ...validObj
        }
        return validObj;
    }

}

fs
    .createReadStream('Users.csv')
    .pipe(csv({separator: ';'}))
    .on('data', (data : IUser) => {
        let validArray : Array < object > = createObjList(configCsv);
        validArray = matchConfigName(configCsv, validArray, data);
        validatWithConfig(validArray, configCsv);
    })
    .on('end', () => {
        fs.writeFileSync("valid.json", JSON.stringify(positiveResult));
        fs.writeFileSync("not-valid.json", JSON.stringify(negativeResult));
    });

function createObjList(options : ColumnDescriptor[]) : object[] {
    let array : Array < {
        name?: string,
        value?: string
    } > = [];
    for (let i = 0; i < options.length; i++) {
        array[i] = {};
    }
    return array;
}

function matchConfigName(options : Array < ColumnDescriptor >, array : Array < {
    name?: string,
    value?: string
} >, data : IUser) : Array < object > {
    for(let i = 0; i < options.length; i++) {
        for (let key in data) {
            if (options[i]['name'] === key) {
                array[i]['name'] = key;
                array[i]['value'] = data[key];
                break;
            }
            if (options.length - 1 === i) {
                array[i]['name'] = errorMessage(`not data: ${options[i]['name']}`);
                break;
            }
        }
    }
    return array;
}

function errorMessage(str : string) : string {return str;}

function validatWithConfig(array : Array < {
    name?: string,
    value?: string
} >, options : Array < ColumnDescriptor >) {
    let vadlidWithConfig: Array<object> = [];
    let validError = false; 
    for (let i = 0; i < options.length; i++) {
            if (options[i]['name'] === array[i]['name']) {
                let item = new Validators(array[i], options[i]['validators']);
                item.validation();
                vadlidWithConfig.push(item.getData());
                if ( !validError ){
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