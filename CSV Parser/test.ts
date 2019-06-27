function getDescription(key, type) {
    let errorMessage = '';

    switch (type) {
      case 'wrongNumber':
        errorMessage = `${key} Error: wrong number of symbols`;
        break;
      case 'NaN':
        errorMessage = `${key} Error: NaN`;
        break;
      case 'format':
        errorMessage = `${key} Error: incorrect ${key.toLocaleLowerCase()} format`
    }
    return errorMessage;
  };

  let errors = {
    wrongNumber: 'wrongNumber',
    format: 'format',
    NaN: 'NaN',
  };

  .on('data', (data:DataDescriptor):void => {

    let personalData:ColumnDescriptor[] = [];
    let valid:boolean = false;
    let requireId:boolean = true;


    for (let key in data) {
      let obj:ColumnDescriptor = {
        name: key,
        value: data[key],
        validators: false,
        description: 'good'
      };

      let errorType = '';

      switch (key ) {
        case "ID":
          if (isNaN(parseInt(data[key])) && requireId) {
            errorType = errors.NaN;
          }
          if(!length(1, 4, data[key]) && requireId) {
            errorType = errors.wrongNumber;
          }
          break;

        case "Name":
          errorType = length(1, 18, data[key]) ? '' : errors.wrongNumber;
          break;

        case "Surname":
          errorType = length(1, 18, data[key]) ? '' : errors.wrongNumber;
          break;

        case "Mail":
          if(!length(6, 18, data[key])) {
            errorType = errors.wrongNumber;
          }
          if (!validateEmail(data[key])) {
            errorType = errors.format;
          }
          break;

        case "Date of registration":
          if(data[key].length !== 10) {
            errorType = errors.wrongNumber;
          }
          if (!valiDate(data[key])) {
            errorType = errors.format;
          }

          break;

        case "Phone":
          if(!length(14, 16, data[key])) {
            errorType = errors.wrongNumber;
          }
          if (!validPhoneNumber(data[key])) {
            errorType = errors.format;
          }

          break;
      }


      if (errorType) {
        obj.description = getDescription(key, errorType);
      } else {
        obj.validators = true;
        valid = true;
      }

      personalData.push(obj);
    }

    console.log(valid);
    if (valid){
      positiveResults.push(personalData);
      return;
    }
    negativeResults.push(personalData);
    return;
  })