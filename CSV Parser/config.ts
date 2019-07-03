interface ColumnDescriptor {
    name: string,
    validators: Validators
    
}

interface Validators {
    length: number[],
    type: string
}

let configCsv: ColumnDescriptor[] = [
    {
        name: "ID",
        validators: {
            length: [1, 4],
            type: "ID"
        }
    },
    {
        name: "Name",
        validators: {
            length: [1, 18],
            type: "Name"
        }
    },
    {
        name: "Surname",
        validators: {
            length:[1, 18],
            type: "Surname"
        }
    },
    {
        name: "Mail",       
        validators: {
            length: [6, 18],
            type: "Mail"
        }
    },
    {
        name: "Date of Registration",
        validators: {
            length: [8, 10],
            type: "Date of Registration",
        }
    },
    {
        name: "Phone",
        validators: {
            length: [14, 16],
            type: "Phone"
        }
    },
]



module.exports = configCsv;