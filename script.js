const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function hideLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoading();
  // Pic a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author filed is empty and replace it with unknow
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //Check quote length to determine style
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set quote, hide loader
  quoteText.textContent = quote.text;
  hideLoading();
}

// Get quotes from API
async function getQuotes() {
  showLoading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
    //Catch Error Here
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

//New quote Click Event handler
newQuoteBtn.addEventListener("click", newQuote);

//Tweet click Event handlre
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
