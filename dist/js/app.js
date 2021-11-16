console.log('app.js is connected');
//create a url for the api fetch
const API_URL = 'https://api.quotable.io/random?minLength=100';
//going to query for the display container quote
const displayQuote = document.querySelector('.display-container-quote');
//going to query for the user input in the text area
const userInput = document.querySelector('.display-container-quote-input');
//going to try creating an array that will hold all boolean values true and false
//the array will be the length of the character quote array
//everytime the user gets the input correct we set the index to true
//at the end of the input update we check if all the values in the array are true
//if all the values are true then 
let booleanArray = [];
//create an array that will hold the characters of the quote string
let quoteArray = []; //initially the quote is just blank
//creating a counter for the progress bar
let progressBarCounter = 0;
//query for the progress bar
const progresBar = document.querySelector('.progress-bar-container-bar');
//query for the timer 
const timer = document.querySelector('.timer-container-timer');
//create a variable that will be the starting time
let startingClock = 5; //60seconds to complete the quote
//create a async function 
const fetchApi = async () => {
    //read in the quote
    try {
        //fetch api
        const response = await fetch(API_URL);
        //take json input parse it and convert it into javascript object
        //save into data
        const data = await response.json();
        //set the quote string equal to my array and call the split function to get every character
        quoteArray = data.content.split('');
        //need to loop through this array and create a span for every single character
        for(let ch of quoteArray){
            let span = document.createElement('span');
            span.innerText = ch;
            displayQuote.append(span);
            //the length of this array will be the length of our boolean array so just push false
            booleanArray.push(false); //everytime it loops false will be pushed in to initialize 
        }
        console.log(booleanArray);
        //i want to see if this worked so i am going to print the array
        // console.log(quoteArray);
    } catch(error){
        console.log(error);
    }
}
//when the page finisheds loading i want to call the fetch api to update the quote on screen
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    //call the function to fetch the api
    fetchApi();
    //call the timer and interval to start the clock
    var clock = setInterval(function(){
        startingClock--;
        if(startingClock === 0){
            clearInterval(clock);
        }
        //decrement the time
        //update the text of the timer
        timer.textContent = startingClock;
    }, 1000);

});
//add an event listener to the text area
//whenever the user updates or does anything the text area this event listener should be triggered
userInput.addEventListener('input', (e) => {
    //test to see if the event listener is working
    // console.log(e.target.value);
    //whenever this function is called it means that the text area has been changed
    //everytime this function is called we are going to create a new array of characters built from the text area
    const textAreaArrray = e.target.value.split('');
    //lets see if this works so print the array 
    // console.log(textAreaArrray);

    //call the function to compare characters
    compareArrays(textAreaArrray);
    //call the boolean array lets see whats inside
    // console.log(booleanArray);
    //filter the boolean array for false 
    const result = booleanArray.filter(boolean => boolean == false);
    console.log(result);
    if(result.length === 0){
        prompt('you have completed the quote');
    }
})
//now we should probably create a function that compares the span with th text area array 
// if they are equal add the correct class if they are not add the wrong class
//create a function that takes in two arrays
const compareArrays = (arr1) => {
    //arr 1 is going to be the user
    //i need to query for all the spans's i created
    const chSpans = displayQuote.querySelectorAll('span');
    //loop through the text area array and see if the text is equal to the ch.innerhtml
    for(let i = 0; i < arr1.length; i++){
        //if the characters are equal to each other add the correct class to the chSpan
        if(arr1[i] === chSpans[i].innerText){
            chSpans[i].classList.add('correct');
            //remove the wrong class if it was already on
            chSpans[i].classList.remove('wrong');
            //change the index value boolean array to true
            booleanArray[i] = true;
            const result = booleanArray.filter(boolean => boolean == true);
            let width = result.length / booleanArray.length;
            width = width * 100;
            progresBar.style.width = width + '%';
        } else if (arr1[i] !== chSpans[i].innerText){
            chSpans[i].classList.add('wrong');
            chSpans[i].classList.remove('correct');
            booleanArray[i] = false;
        } else if (arr1[i] === null) {
            chSpans[i].classList.remove('correct');
            chSpans[i].classList.remove('wrong');
        }
    }
    
}
//create a function that subtracts the time
const tiktok = () => {
    //timeOut();
    if(startingClock === 0){
        clearInterval(timer);
    }
    //decrement the time
    startingClock--;
    //update the text of the timer
    timer.textContent = startingClock;
}
//the key input should also check if the user has won 
//if clock reaches 0 the user has lost 
//if user is at the end of the string the user has won

//this is a function that checks if the clock has run out
const timeOut = () => {
    if(startingClock === 0){
        prompt('you lost time has run out');
    }
}