$(document).ready(function() {
    const test = false;
    const now = moment().format('MMMM Do YYYY');
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
  
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
    //Header with Today's date
    let $dateHeading = $('#navbar-subtitle');
    $dateHeading.text(now);

    //Storing and Saving Daily Plans
    const saveIcon = "./images/save-regular.svg"; 
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
    if (test) { console.log(storedPlans); }
  
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      planTextArr = new Array(9);
      planTextArr[4] = "Take a Lunch Break!"; //example text to show user to type
    }
  
    if (test) { console.log("full array of planner text",planTextArr); }
    let $plannerDiv = $('#plannerContainer');
    $plannerDiv.empty();
    
    //Setting the time on the left side of the planner
    if (test) { console.log("current time",nowHour12); }
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
      let displayHour = 0;
      let ampm = "";
      if (hour >= 12) { 
        displayHour = hour - 12;
        if (displayHour === 0){
            displayHour = 12
        }
        ampm = "pm";
      } else {
        displayHour = hour;
        ampm = "am";
      }
      
      //Time portion of left side
      $timeBoxSpn.text(`${displayHour} ${ampm}`);
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
      updateRowColor($rowDiv, hour);
      $plannerDiv.append($rowDiv);
    };
    function updateRowColor ($hourRow,hour) { 
      if (test) { console.log("rowColor ",nowHour24, hour); }
      if ( hour < nowHour24) {
        if (test) { console.log("lessThan"); }
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        if (test) { console.log("greaterthan"); }
        $hourRow.css("background-color","lightgreen")
      } else {
        if (test) { console.log("equal"); }
        $hourRow.css("background-color","violet")
      }
    };
  
    // Function to save the user input for their planning
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (test) { console.log('click pta before '+ planTextArr); }
      let $index = $(this).attr('save-id');
      let inputId = '#input-'+$index;
      let $value = $(inputId).val();
      planTextArr[$index] = $value;
      if (test) { console.log('value ', $value); }
      if (test) { console.log('index ', $index); }
      if (test) { console.log('click pta after '+ planTextArr); }
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // If the user changes their input, this function will save the color change
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      if (test) { console.log('onChange'); }
      if (test) { console.log('id', $(this).attr('hour-index')); }
      let i = $(this).attr('hour-index');
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });