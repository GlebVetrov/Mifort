interface ColumnDescriptor {
    name: string,
    validators: Validators    
}

interface Validators {
    rules: IRules    
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


let configCsv: ColumnDescriptor[] = [
    {
        name: "ID",
        validators: {
            rules: {
                min: {
                    value: 1,
                    textError: 'Поле должно содержать больше 1 символов'
                }, 
                max: {
                    value: 4,
                    textError: 'Поле не должно содержать больше 4 символов'
                },
                match: {
                    value: /^\d+$/,
                    textError: 'Поле должно содержать валидный id'
                }
              }
        }
    },
    {
        name: "Name",
        validators: {
            rules: {
                min: {
                    value: 1,
                    textError: 'Поле должно содержать больше 1 символов'
                },
                max: {
                    value: 18,
                    textError: 'Поле не должно содержать больше 18 символов'
                },
                match: {
                    value: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u,
                    textError: 'Поле должно содержать валидный Имя'
                }
              }
        }
    },
    {
        name: "Surname",
        validators: {
            rules: {
                min: {
                    value: 1,
                    textError: 'Поле должно содержать больше 1 символов'
                },
                max: {
                    value: 18,
                    textError: 'Поле не должно содержать больше 18 символов'
                },
                match: {
                    value: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u,
                    textError: 'Поле должно содержать валидный Фамилию'
              }
            }
        }
    },
    {
        name: "Mail",       
        validators: {
            rules: {
                min: {
                    value: 6,
                    textError: 'Поле должно содержать больше 6 символов'
                },
                max: {
                    value: 18,
                    textError: 'Поле не должно содержать больше 18 символов'
                },
                match: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    textError: 'Поле должно содержать валидный Mail'
                }
              }
        }
    },
    {
        name: "Date of Registration",
        validators: {
            rules: {
                min: {
                    value: 8,
                    textError: 'Поле должно содержать больше 8 символов'
                },
                max: {
                    value: 10,
                    textError: 'Поле не должно содержать больше 10 символов'
                },
                match: {
                    value: /\d\d\S\d\d\S\d{4}/,
                    textError: 'Поле должно содержать валидный Дату'
              },
            }
        }
    },
    {
        name: "Phone",
        validators: {
            rules: {
                min: {
                    value: 14,
                    textError: 'Поле должно содержать больше 14 символов'
                },
                max: {
                    value: 16,
                    textError: 'Поле не должно содержать больше 16 символов'
                },
                match: {
                    value: /\d{3}\s?\d\d\s?\d{7}/,
                    textError: 'Поле должно содержать валидный Телефон'
              }
              }
        }
    },
]



module.exports = configCsv;