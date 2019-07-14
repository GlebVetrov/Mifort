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
    min?: IOptions,
    max?: IOptions,
    match?: IOptions
}

interface IOptions {
    value: number | RegExp,
    textError: string
}

interface IMessages {
    min?: string,
    max?: string,
    match?: string
}

interface IValidData {
    item : IArrayData;
    value: string;
    length: number;
    mesages: object;    
    isValid : boolean;    
    options : Validators;
}


interface IValidators extends IValidData {
    min(param: number) : boolean;
    max(param: number) : boolean;
    match(param: RegExp) : boolean;
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


class Validators implements IValidators {    

    options : Validators;
    validators : object = {
    }
    isValid : boolean = true;
    item : IArrayData;
    value: string;
    length: number;
    mesages: object;
    
    constructor(item : IArrayData, options : Validators) {
        this.item = item;
        this.options = options; 
        
        this.value = this.item.value.trim();
        this.length = this.value.length;
        this.rules = this.options.rules;
    }

    min(param: number) : boolean {
        return this.length >= param;
      };

    max(param: number) : boolean {
        return this.length <= param;
      };
    match(param: RegExp) : boolean {        
        return param.test(this.value);
      };

    createMessage (message: string, settings: object):string {
        for (let key in settings) {            
            console.log( `Error ${ key } ${ settings[key] }` )
        }
        return message;
      };

      validate(): object {
        for (let rule in this.rules) {
            let param = this.rules[rule]['value'];
            let result = this[rule](param);
            if (result) {
                this.validators[rule] = 'valid';
            }
            if (!result) {
                this.isValid = false;
                this.validators[rule] = this.createMessage(this.rules[rule]['textError'], {
                  data: this.value,                  
                  rule: this.rules[rule]['textError']
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
        validArray = matchConfigName(configCsv, validArray, data);        
        validatWithConfig(validArray, configCsv);
    })
    .on('end', () => {
        fs.writeFileSync("valid.json", JSON.stringify(positiveResult));
        fs.writeFileSync("not-valid.json", JSON.stringify(negativeResult));
    });

function createObjList(options : ColumnDescriptor[]) : Array < IArrayData > {    
    return options.map(() => {
        return { name: null, value: null};
    });    
}

function matchConfigName(options : Array < ColumnDescriptor >, array : Array < IArrayData >, data : IUser) : Array < IArrayData > {
    out: for (var i = 0; i < options.length; i++) {        
        for (let key in data){
            if (options[i]['name'] === key) {
                array[i]['name'] = key;
                array[i]['value'] = data[key];
                continue out;
            }           
        }
        array[i]['name'] = "not value " + options[i]['name'];
        console.log("not value " + options[i]['name']); 
    }
    return array;
}

function validatWithConfig(array : Array < IArrayData >, options : Array < ColumnDescriptor >):void {    
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

module.exports = {
    createObjList,
    matchConfigName,
    validatWithConfig,
    sortData,
    Validators
};
