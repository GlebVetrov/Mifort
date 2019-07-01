import csv = require('csv-parser');
import fs = require('fs');
let configCsv = require('./config.js');

let positiveResult:Array<IData>=[];
let negativeResult:Array<IData>=[];

interface IValidData {
  array:any[];
  dataError:boolean;
  objData: any;
  options: IConf[];
}

interface IData {
  dataError:boolean,
  array:any[]
}   

interface IGetData {
  getValue(data: string, objData: object):string;
  getData():IData;
}

interface IIsValidate {
  isValidateEmail(email:string):boolean;
  isValidatePhone(number:string):boolean;
  isValidateLength(str:string, array:number[]):boolean;
  isValidateDate(date:string):boolean;
  isValidateId(id:string):boolean;
  isValidateName(name:string):boolean;
}

interface IValidators extends IValidData, IData, IGetData, IIsValidate {    
  createObjList():void;
  matchName():void;
  validType():void;
  validValue():void;
  validValueLength():void;    
  errorMessage(str:string):string;
  makeAllValidation():void
}

interface IConf {
  name: string,
  type: string,
  validators: number[]
}
interface IObjData {
  ID: string,
  Name: string,
  Surname: string,
  Mail: string,
  'Date of Registration': string,
  Phone: string
}

class Validators implements IValidators {
  array:any[] = [];
  dataError:boolean = false;
  objData:any;
  options:IConf[];

  constructor(_objData:any, _options:IConf[]) {
      this.objData = _objData;
      this.options = _options;
      
  }

  createObjList():void {
      for (let i = 0; i < this.options.length; i++) {
          this.array[i] = {};
      }
  }

  matchName():void {
      for (let i = 0; i < this.options.length; i++) {
          for (let data in this.objData) {
              if (this.options[i]['name'] === data) {
                  this.array[i]['name'] = data;
                  break;
              }
              if (this.options.length === i) {
                  this.array[i]['name'] = this.errorMessage(`not name: ${this.options[i]['name']}`);                    
                  break;
              }
          }
      }
      return;
  }

  validType():void {
      for (let i = 0; i < this.options.length; i++) {
          for (let data in this.objData) {
              if (this.options[i]['type'] === typeof data && this.options[i]['name'] === data) {
                  this.array[i]['type'] = typeof data;
                  break;
              }
              if (this.options.length === i) {
                  this.array[i]['type'] = this.errorMessage(`wrong type: not ${typeof data}`);                    
                  break;
              }
              
          }
      }
      return;
  }

  validValue():void {
      for (let i = 0; i < this.options.length; i++) {
          for (let data in this.objData) {
              if (this.options[i]['name'] === data) {
                  this.array[i]['value'] = this.getValue(data, this.objData);
                  break;
              }
              if (this.options.length === i) {
                  this.array[i]['value'] = this.errorMessage(`not value`);
                  break;
              }
          }
      }
      return;
  }

  validValueLength():void {
      for (let i = 0; i < this.options.length; i++) {
          for (let data in this.objData) {
              if (this.options[i]['name'] === data) {
                  this.array[i]['valueLength'] = this.isValidateLength(this.objData[data], this.options[i]['validators']) ? 
                  'length valid' : this.errorMessage('length not valid');
                  break;
              }
              if (this.options.length === i) {
                  this.array[i]['valueLength'] = this.errorMessage(`not value length`);
                  break;
              }
          }
      }
      return;
  }

  getValue(data: string, objData: any):string {
      switch (data) {
          case 'ID':
              let id = this.isValidateId(objData[data]);
              return id ? objData[data] : this.errorMessage(`wrong value: ${objData[data]}`);
          case 'Name':
              let name = this.isValidateName(objData[data]);
              return name ? objData[data] : this.errorMessage(`wrong value: ${objData[data]}`);
          case 'Surname':
              let surname = this.isValidateName(objData[data]);
              return surname ? objData[data] : this.errorMessage(`wrong value: ${objData[data]}`);
          case 'Mail':
              let mail = this.isValidateEmail(objData[data]);
              return mail ? objData[data] : this.errorMessage(`wrong value: ${objData[data]}`);
          case 'Date of Registration':
              let date = this.isValidateDate(objData[data]);
              return date ? objData[data] : this.errorMessage(`wrong value: ${objData[data]}`);
          case 'Phone':
              let phone = this.isValidatePhone(objData[data]);
              return phone ? objData[data] : this.errorMessage(`wrong value: ${objData[data]}`);
          default:
              return;
      }
  }

  isValidateEmail(email:string):boolean {
      let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regEmail.test(String(email).toLowerCase());
  }

  isValidatePhone(number:string):boolean {
      let regNumber = /\d\d\d\s?\d\d\s?\d\d\d\d\d/;
      return regNumber.test(number);
  }

  isValidateLength(str:string, array:number[]):boolean {
      if (str.length < array[0] || str.length > array[1]) {
          return false;
      }
      return true;
  }

  isValidateDate(date:string):boolean {
      let regDate = /\d\d\S\d\d\S\d\d\d\d/;
      return regDate.test(date);
  }

  isValidateId(id:string):boolean {
      return !isNaN(Number(id));
  }

  isValidateName(name:string):boolean {
      let regName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u;
      return regName.test(name);
  }

  errorMessage(str:string):string {
      this.dataError = true;
      console.log(`[Error (${str})]`);
      return str;
  }

  getData():IData {
      const dataError = this.dataError;
      const array = this.array;

      const data:IData = {
          dataError,
          array
      }

      return data;
  }

  makeAllValidation():void {
    this.createObjList();
    this.matchName();
    this.validType();
    this.validValue();
    this.validValueLength();
  }
}

fs.createReadStream('Users.csv')
  .pipe(csv({separator: ';'}))
  .on('data', (data: any) => {
    let test:Validators = new Validators(data, configCsv);
    test.makeAllValidation();
    let obj = test.getData();
    obj.dataError ? negativeResult.push(obj) : positiveResult.push(obj);    
  })
  .on('end', () => {
        fs.writeFileSync("valid.json", JSON.stringify(positiveResult));
        fs.writeFileSync("not-valid.json", JSON.stringify(negativeResult));
  });
