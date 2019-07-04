import csv = require('csv-parser');
import fs = require('fs');
let configCsv : ColumnDescriptor[] = require('./config.js');

let positiveResult : Array < object >= [];
let negativeResult : Array < object >= [];

interface ColumnDescriptor {
    name: string,
    validators: Validators    
}

interface Validators {
    rules: IRules,
    messages: IMessages
}

interface IRules {
    min: number,
    max: number,
    match: string
}

interface IMessages {
    min: string,
    max: string,
    match: string
}

interface IValidData {
    item : IArrayData;
    value: string;
    length: number;
    mesages: object;    
    isValid : boolean;    
    options : Validators;
    regExps:IRegExps ;
}


interface IValidators extends IValidData {
    min(param: number) : boolean;
    max(param: number) : boolean;
    match(param: string) : boolean;
    createMessage (message: string, settings: object):string;
    validate(): object;
    getError() : boolean;
}


interface IUser {
    ID : string;
    Name : string;
    Surname : string;
    Mail : string;
    'Date of Registration' : string;
    [Phone : string] : string;
}

interface IRegExps {
    ID : RegExp;
    Name : RegExp;
    Surname : RegExp;
    Mail : RegExp;
    'Date of Registration' : RegExp;
    Phone : RegExp;
}

class Validators implements IValidators {    

    options : Validators;
    validators : object = {
    }
    isValid : boolean = true;
    item : IArrayData;
    value: string;
    length: number;
    mesages: object;
    regExps:IRegExps= {
        ID: /^\d+$/,
        Name: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u,
        Surname: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u,
        Mail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,        
        'Date of Registration': /\d\d\S\d\d\S\d{4}/,
        Phone: /\d{3}\s?\d\d\s?\d{7}/,

    }

    constructor(item : IArrayData, options : Validators) {
        this.item = item;
        this.options = options;

        this.value = this.item.value.trim();
        this.length = this.value.length;
        this.rules = this.options.rules;
        this.mesages = this.options.messages;
    }

    min(param: number) : boolean {
        return this.length >= param;
      };

    max(param: number) : boolean {
        return this.length <= param;
      };
    match(param: string) : boolean {        
        return this.regExps[param].test(this.value);
      };

    createMessage (message: string, settings: object):string {
        for (var key in settings) {            
            console.log( `Error ${ key } ${ settings[key] }` )
        }
        return message;
      };

      validate(): object {
        this.value = this.item.value.trim();
        this.length = this.value.length;        
        for (let rule in this.rules) {
            let param = this.rules[rule];
            let result = this[rule](param);
            if (result) {
                this.validators[rule] = 'valid';
            }
            if (!result) {
                this.isValid = false;
                this.validators[rule] = this.createMessage(this.mesages[rule], {
                  data: this.value,                  
                  rule: this.mesages[rule]
                });
              }
          }
          return {...this.item, ...this.validators};
      };
    
    getError() : boolean {
        return this.isValid;
    }

}

interface IArrayData {
    name: string,
    value: string
}

fs
    .createReadStream('Users.csv')
    .pipe(csv({separator: ';'}))
    .on('data', (data : IUser) => {
        let validArray : Array < IArrayData > = createObjList(configCsv);
        validArray = matchConfigName(configCsv, validArray, data); validatWithConfig(validArray, configCsv);
    })
    .on('end', () => {
        fs.writeFileSync("valid.json", JSON.stringify(positiveResult));
        fs.writeFileSync("not-valid.json", JSON.stringify(negativeResult));
    });

function createObjList(options : ColumnDescriptor[]) : Array < IArrayData > {
    let array : Array < IArrayData > = [];
    for (let i = 0; i < options.length; i++) {
        array[i] = { name: null, value: null};
    }
    return array;
}

function matchConfigName(options : Array < ColumnDescriptor >, array : Array < IArrayData >, data : IUser) : Array < IArrayData > {     
    let keys = Object.keys(data);    
    for(let i = 0; i < options.length; i++) {
            if (options[i]['name'] === keys[i]) {
                array[i]['name'] = keys[i];
                array[i]['value'] = data[keys[i]];
                continue;
            }
            array[i]['name'] = `not value ${options[i]['name']}`;
            console.log(`not value ${options[i]['name']}`);
       }
    return array;
}

function validatWithConfig(array : Array < IArrayData >, options : Array < ColumnDescriptor >) {
    let vadlidWithConfig: Array<object> = [];
    let validError = true; 
    for (let i = 0; i < options.length; i++) {
            if (options[i]['name'] === array[i]['name']) {
                let item = new Validators(array[i], options[i]['validators']);
                let obj = item.validate();
                vadlidWithConfig.push(obj);
                if (validError) {
                    validError = item.getError();
                }
                continue;
            } 
            validError = false;   
            vadlidWithConfig.push(array[i]);
        }       
    sortData(validError, vadlidWithConfig);
}

function sortData(isError:boolean, array: Array<object>): void {
    if (isError) {
        positiveResult.push(array);
        return;
    }
    negativeResult.push(array);
    return;
}