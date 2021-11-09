console.log('app.js is connected');
//create a url for the api fetch
const API_URL = 'https://api.quotable.io/random?minLength=100';
//going to query for the display container quote
const displayQuote = document.querySelector('.display-container-quote');
//going to query for the user input in the text area
const userInput = document.querySelector('.display-container-quote-input');

//create an array that will hold the characters of the quote string
let quoteArray = []; //initially the quote is just blank
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
        }
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
    compareArrays(textAreaArrray);

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
        } else if (arr1[i] !== chSpans[i].innerText){
            chSpans[i].classList.add('wrong');
            chSpans[i].classList.remove('correct');
        } else if (arr1[i] === null) {
            chSpans[i].classList.remove('correct');
            chSpans[i].classList.remove('wrong');
        }
    }
}