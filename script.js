$(document).ready(function() {
    const t = false;
    const now = moment().format('MMMM Do YYYY');
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
  
    if (t) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
    //Header with Today's date
    let $dateHeading = $('#navbar-subtitle');
    $dateHeading.text(now);

    //Storing and Saving Daily Plans
    const saveIcon = "./images/save-regular.svg"; 
    let userPlans = JSON.parse(localStorage.getItem("userPlans"));
    if (t) { console.log(userPlans); }
  
    if (userPlans !== null) {
      planTextArr = userPlans;
    } else {
      planTextArr = new Array(9);
      planTextArr[4] = "Take a Lunch Break!"; //example text to show user to type
    }
  
    if (t) { console.log("full array of planner text",planTextArr); }
    let $plannerDiv = $('#plannerContainer');
    $plannerDiv.empty();
    
    //Setting the time on the left side of the planner
    if (t) { console.log("current time",nowHour12); }
    for (let hour = 9; hour <= 17; hour++) {
      let index = hour - 9;
      
      //Upon loading the page, this creates each time slot/planning space
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      let $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
    
      const $timeBoxSpn = $('<span>');
      $timeBoxSpn.attr('class','timeBox');
      
      //If function to set AM and PM variables
      let hourAMPM = 0;
      let ampm = "";
      if (hour >= 12) { 
        hourAMPM = hour - 12;
        if (hourAMPM === 0){
            hourAMPM = 12
        }
        ampm = "pm";
      } else {
        hourAMPM = hour;
        ampm = "am";
      }
      
      //Time portion of left side
      $timeBoxSpn.text(`${hourAMPM} ${ampm}`);
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);

      //Input portion of container
      let $dailyPlanSpn = $('<input>');
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
      $dailyPlanSpn.val( planTextArr[index] );
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
  
      // Save portion of the right side of container
      let $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
  
      // Color coding the rows based on the current time
      rowTimeColor($rowDiv, hour);
      $plannerDiv.append($rowDiv);
    };
    function rowTimeColor ($hourRow,hour) { 
      if (t) { console.log("rowColor ",nowHour24, hour); }
      if ( hour < nowHour24) {
        if (t) { console.log("lessThan"); }
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        if (t) { console.log("greaterthan"); }
        $hourRow.css("background-color","lightgreen")
      } else {
        if (t) { console.log("equal"); }
        $hourRow.css("background-color","violet")
      }
    };
  
    // Function to save the user input for their planning
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (t) { console.log('click pta before '+ planTextArr); }
      let $index = $(this).attr('save-id');
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
      planTextArr[$index] = $value;
      if (t) { console.log('value ', $value); }
      if (t) { console.log('index ', $index); }
      if (t) { console.log('click pta after '+ planTextArr); }
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("userPlans", JSON.stringify(planTextArr));
    });  
    
    // If the user changes their input, this function will save the color change
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      if (t) { console.log('onChange'); }
      if (t) { console.log('id', $(this).attr('hour-index')); }
      let i = $(this).attr('hour-index');
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });