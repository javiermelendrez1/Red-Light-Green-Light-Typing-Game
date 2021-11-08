console.log('app.js is connected');
//create a url for the api fetch
const API_URL = 'https://api.quotable.io/random?minLength=100';
//going to query for the display container quote
const displayQuote = document.querySelector('.display-container-quote');
//create a async function 
const fetchApi = async () => {
    //read in the quote
    try {
        //fetch api
        const response = await fetch(API_URL);
        //take json input parse it and convert it into javascript object
        //save into data
        const data = await response.json();
        //change the display quote to the quote of the fetched api
        displayQuote.textContent = data.content;
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