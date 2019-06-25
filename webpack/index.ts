"use strict";

import csv = require('csv-parser');
import fs = require('fs');
const results:any = [];
 
fs.createReadStream('./Users.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });

// const data:Array<object> = require('./Users.csv');

// console.log(data)

// let csv: ColumnDescriptor[] = [
//     {
//     name: "ID",
//     type: ID,
//     validators: [
//     length(1,4),
//     require,
//     ]
//     },
//     {
//     name: "Name",
//     type: "string",
//     validators: [
//     length(1,18),
//     ]
//     },
//     {
//     name: "Surname",
//     type: "string",
//     validators: [
//     length(1,18),
//     ]
//     },
//     {
//     name: "Mail",
//     type: Mail,
//     validators: [
//     length(6,18),
//     ]
//     },
//     {
//     name: "Date of Registration",
//     type: "date",
//     validators: [
//     fooValidator
//     ]
//     },
//     {
//     name: "Phone",
//     type: Phone,
//     validators: [
//     length(14,16),
//     ]
//     },
//     ]
    
//     interface ColumnDescriptor {
//     name: string,
//     type: CsvType | string,
//     validators: Validators[]
//     },
    
//     interaface CsvType {
//     parseString(str: string): this;
//     }
    
//     interface Validators<T> {
    
//     /** if return empty array then object valid */
//     validate(value: T) : string[];
    
//     }
    
//     let database = [ 
//     { 
//     name: "ID", 
//     type: ID, PRIMARY KEY, 
//     data: "ID"
//     }, 
//     { 
//     name: "Name", 
//     type: VARCHAR, 
//     data: "Name"
//     }, 
//     { 
//     name: "Surname", 
//     type: VARCHAR, 
//     data: "Surname"
//     }, 
//     { 
//     name: "Mail", 
//     type: VARCHAR, 
//     data: "Mail"
//     }, 
//     { 
//     name: "Date", 
//     type: DATE, 
//     data: "Date of registration"
//     }, 
//     { 
//     name: "Phone", 
//     type: INT, 
//     data: "Phone"
//     }, 
//     ]