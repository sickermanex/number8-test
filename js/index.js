var generateButton = $('#generate-button'); 
var calendar = $('.calendar');

generateButton.on('click',()=>{
    calendar.clndr({
        template: $("#template-calendar").html(),
        lengthOfTime: {
            months: 2,
            interval: 1
        },
        daysOfTheWeek: ['S','M','T','W','T','F','S']
    });
});