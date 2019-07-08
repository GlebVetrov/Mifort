var configCsv = [
    {
        name: "ID",
        validators: {
            rules: {
                // min: 1, 
                max: 4,
                match: /^\d+$/
            },
            messages: {
                // min: 'Поле должно содержать больше 1 символов',
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
                match: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u
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
                match: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u
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
                match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
                match: /\d\d\S\d\d\S\d{4}/
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
                match: /\d{3}\s?\d\d\s?\d{7}/
            },
            messages: {
                min: 'Поле должно содержать больше 14 символов',
                max: 'Поле не должно содержать больше 16 символов',
                match: 'Поле должно содержать валидный Телефон'
            }
        }
    },
];
module.exports = configCsv;
//# sourceMappingURL=config.js.map