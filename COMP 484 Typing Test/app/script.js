const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wordCount = document.querySelector(".wordCount");
const firstScore = document.querySelector(".FirstScore");
const secondScore = document.querySelector(".SecondScore");
const thirdScore = document.querySelector(".ThirdScore");


var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var word_count_final = 0;
var final_time = 0;
var currentTime;
var bestScores = [];

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
  if(time < 10){//checks if number is less than 10 
    time = "0" + time;//adds zeros infront of numbers less than 10
  }
  
  return time;//retuns time
}

// Run a standard minute/second/hundredths timer:
function stopWatch(){
  currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);//adds leadingZeros fuinction to each part of the timer
  theTimer.innerHTML = currentTime;//updates timer in the index.html page
  timer[3]++; //updates the hundreth of a millisecond 
  timer[0] = Math.floor((timer[3]/100)/60);//creates the mins of the stopwatch
  timer[1] = Math.floor((timer[3]/100)-(timer[0] * 60));//creates the seconds
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));//creates the mili seconds

}

// Match the text entered with the provided text on the page:
function checkSpelling(){
  var textEntered = testArea.value;//finds value of the typing area
  var originTextMatch = originText.substring(0, textEntered.length);
  
  if(textEntered == originText){ 
    testWrapper.style.borderColor = 'yellow';//if the text area match the original text border color will turn yellow
      best_scores();//call bestscores funcction after original text is matched

    word_count_final = countWords()
    wordCount.innerHTML = word_count_final;
    console.log(typeof(timer[0]));
    clearInterval(interval);
    
  }else{
    if(textEntered == originTextMatch){
      testWrapper.style.borderColor = 'green';//if original text matches while typing the border box wwill be green
      //console.log(interval)
      //console.log(counter)
      
    }else{
      testWrapper.style.borderColor = 'red';//if text does not match the border color will turn red
    }
  }
}

function countWords(){
  var total_min;
  if(timer[0] != 0){ //if mins does not equal 0 
    total_min = timer[0]; 
    var second_count = timer[1] + (total_min *60); //converts the mins into seconds
  }
  else{
      var second_count = timer[1]; 
  }
  var word_count = ((4/second_count) * 60).toFixed(2);//gives us the the words per min with 2 decimals
  return word_count
  
}

function best_scores(){
  
  final_time = (timer[0]*60*100) + (timer[1] * 100) + (timer[2]) //will give time in hundreth
  bestScores.push(final_time)
  bestScores.sort(function(a, b){return a-b}) //sorting the scores

  console.log(bestScores)

  if(bestScores.length == 1){//checks how many scores have been saved
  firstScore.innerHTML = bestScores[0];//sets the first number to the beast number
  secondScore.innerHTML = "NO SCORE YET";
  thirdScore.innerHTML = "NO SCORE YET";

  }
  else if(bestScores.length == 2){
  firstScore.innerHTML = bestScores[0];
  secondScore.innerHTML = bestScores[1];
  thirdScore.innerHTML = "NO SCORE YET";
  }
  
  else{
  firstScore.innerHTML = bestScores[0];
  secondScore.innerHTML = bestScores[1];
  thirdScore.innerHTML = bestScores[2];
  }
  
  final_time = 0;

//return bestScores 
  
}

// Start the timer:
function start() {
var textEnteredLength = testArea.value.length;//gets the value and length of the entered text
  if(textEnteredLength == 0){
    timerRunning = true;//starts the stopwatch 
    interval = setInterval(stopWatch,10);
    
  }
}

// Reset everything:
function reset(){
  clearInterval(interval);//clears the stopwatch
  interval = null;//sets it back to 0
  timer = [0,0,0,0];//sets the array of numbers in the stopwatch back to 0
  timerRunning = false;//stops the stopwatch
  testArea.value = "";//deletes words in the test area
  theTimer.innerHTML = "00:00:00";//sets stopwatch back 00:00:00
  testWrapper.style.borderColor = 'green';//resets when borderColor is green
  wordCount.innerHTML = 0;//sets the word count per min back to 0

}



// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress',start,false);//runs a start function on keypress
testArea.addEventListener('keyup', checkSpelling, false);//runs a checkSpelling fucntion on keyup
resetButton.addEventListener('click', reset ,false);//runs a reset function whenbutton is clicked