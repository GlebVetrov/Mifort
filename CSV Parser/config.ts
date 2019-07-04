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

let configCsv: ColumnDescriptor[] = [
    {
        name: "ID",
        validators: {
            rules: {
                min: 1,
                max: 4,
                match: 'ID'
              },
            messages: {
                min: 'Поле должно содержать больше 1 символов',
                max: 'Поле не должно содержать больше 4 символов',
                match: 'Поле должно содержать валидный id'
              }  
        }
    },
    {
        name: "Name",
        validators: {
            rules: {
                min: 1,
                max: 18,
                match: 'Name'
              },
            messages: {
                min: 'Поле должно содержать больше 1 символов',
                max: 'Поле не должно содержать больше 18 символов',
                match: 'Поле должно содержать валидный Имя'
              }
        }
    },
    {
        name: "Surname",
        validators: {
            rules: {
                min: 1,
                max: 18,
                match: 'Surname'
              },
            messages: {
                min: 'Поле должно содержать больше 1 символов',
                max: 'Поле не должно содержать больше 18 символов',
                match: 'Поле должно содержать валидный Фамилию'
              }
        }
    },
    {
        name: "Mail",       
        validators: {
            rules: {
                min: 6,
                max: 18,
                match: 'Mail'
              },
            messages: {
                min: 'Поле должно содержать больше 6 символов',
                max: 'Поле не должно содержать больше 18 символов',
                match: 'Поле должно содержать валидный Mail'
              }
        }
    },
    {
        name: "Date of Registration",
        validators: {
            rules: {
                min: 8,
                max: 10,
                match: 'Date of Registration'
              },
            messages: {
                min: 'Поле должно содержать больше 8 символов',
                max: 'Поле не должно содержать больше 10 символов',
                match: 'Поле должно содержать валидный Дату'
              }
        }
    },
    {
        name: "Phone",
        validators: {
            rules: {
                min: 14,
                max: 16,
                match: 'Phone'
              },
            messages: {
                min: 'Поле должно содержать больше 14 символов',
                max: 'Поле не должно содержать больше 16 символов',
                match: 'Поле должно содержать валидный Телефон'
              }
        }
    },
]



module.exports = configCsv;