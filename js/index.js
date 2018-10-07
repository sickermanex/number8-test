let generateButton = $('#generate-button'); 
let calendar = $('.calendar');
let startDate = $('#start-date');
let numberOfDays = $('#days-number');
let countryCode = $('#country-code');
let clndrInstance = null;

generateButton.on('click',()=>{    
    let date = dateIsValid(startDate.val());
    let days = parseInt(numberOfDays.val());
    let country = countryCode.val();
    let formValid = errorMessagesHandler(date,days,country);

    if(formValid){
        if(clndrInstance === null){
            clndrInstance = generateCalendar(date,days);
        }
        else{
            clndrInstance.options.startWithMonth = moment(date);
            clndrInstance.render();
        }
    }
});

function errorMessagesHandler(date,days,code){
    let valid = false;
    if(date === 'Invalid Date'){
        startDate.parent().find('span.error.required-field').addClass('active');
        valid = false;
    }
    else{
        startDate.parent().find('span.error.required-field').removeClass('active');
        valid = true;
    }
    if(isNaN(days)){
        numberOfDays.parent().find('span.error.required-field').addClass('active');
        valid = false;
    }
    else{
        numberOfDays.parent().find('span.error.required-field').removeClass('active');
        valid = true;
    }
    if(code.length < 2){
        countryCode.parent().find('span.error.required-field').addClass('active'); 
        valid = false;
    }
    else{
        countryCode.parent().find('span.error.required-field').removeClass('active');
        valid = true;
    }
    return valid;
}

numberOfDays.on('keypress',e=>{
    let charCode = e.which || e.keyCode;                        
    if (charCode > 31 && (charCode < 47 || charCode > 57))
        return false;
    if (e.shiftKey) 
        return false;
    return true;
})

function generateCalendar(startDate,numberOfDays){
    let start = moment(startDate);
    let end = moment(start.toDate()).add(numberOfDays,'days');
    let months = Math.round(moment(end.toDate()).diff(start.toDate(),'months',true));
    months += (numberOfDays+start.date()-1 > start.daysInMonth() && numberOfDays+start.date()-1 % start.daysInMonth() >= 15) || months === 0 ? 1: 0;

    return calendar.clndr({
        daysOfTheWeek: ['S','M','T','W','T','F','S'],
        startWithMonth: start,
        weekOffset: 0,
        lengthOfTime: {
            months: months
        },
        extras: {
          startDate: start,
          endDate: end  
        },
        template: $("#template-calendar").html()
    });
}

function dateIsValid(date){
    let validDate = false;
    let currentDate = 'Invalid Date';
    let daysMap = {
        1: 31,
        2: {
            'noleap': 28,
            'leap': 29
        },
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }
    let splittedDate = date.split('/');
    if(splittedDate.length != 3){
        return currentDate;
    }
    else{
        let month = splittedDate[0];
        let day = parseInt(splittedDate[1]);
        let year = splittedDate[2];
        if(parseInt(month) < 1 || parseInt(month) > 12){
            return currentDate;
        }
        else if(year.length != 4){
            return currentDate;
        }
        else{
            month = parseInt(month);
            year = parseInt(year);
            if(month === 2){
                if(year % 400 === 0){             
                    if(day <= daysMap[month]['leap']){
                        validDate = true;
                    }
                }
                else if(year % 100 === 0){
                    if(day <= daysMap[month]['noleap']){
                        validDate = true;
                    }
                }   
                else if(year % 4 === 0){
                    if(day <= daysMap[month]['leap']){
                        validDate = true;
                    }
                }
                else{
                    if(day <= daysMap[month]['noleap']){
                        validDate = true;
                    }
                }
                
            }
            else{
                if(day <= daysMap[month]){
                    validDate = true;
                }
            }
        }
        currentDate = validDate ? new Date(date) : currentDate;
        return currentDate;
    }
}