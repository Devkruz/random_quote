import $ from 'jquery';
import './App.css';
import {useState, useEffect} from "react";

function App() {

  let quotesData = null;
  // const [quotesData, setQuotesData] = useState(null);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

// fetch for the quote and set it to quotesData state
function getQuotes() {
  console.log('getQuotes')
  return fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',{headers: {Accept: 'application/json'}})
};

  // get a random quote from quotesData 
 async function getRandomQuote() {
   const quoteLen = await quotesData.quotes.length
    const rand = Math.floor(Math.random() * );
    console.log("getRandQuote")
    console.log(quotesData.quotes[rand], quotesData.quotes.length, rand)
    return quotesData.quotes[rand];
  };

 // use the random quote to update the UI
  function getQuote() {
    console.log("getQuote")
    let randomQuote = getRandomQuote();
  
    setCurrentQuote(randomQuote.quote);
    setCurrentAuthor(randomQuote.author);
    console.log(currentQuote)
    console.log(currentAuthor)

    $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
  
    $('#tumblr-quote').attr(
      'href',
      'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(currentAuthor) +
        '&content=' +
        encodeURIComponent(currentQuote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );
  
    $('.quote-text').animate({ opacity: 0 }, 400, function () {
      $(this).animate({ opacity: 1 }, 400);
      $('#text').text(currentQuote);
    });
  
    $('.quote-author').animate({ opacity: 0 }, 500, function () {
      $(this).animate({ opacity: 1 }, 400);
      $('#author').html(currentAuthor);
    });

  
    var randomColor = Math.floor(Math.random() * colors.length);


    $('html body').animate(
      {
        background: colors[randomColor],
        color: colors[randomColor]
      },
      1000
    );
    $('.button').animate(
      { 
        background: colors[randomColor]
      },
      1000
    );
  };


useEffect(()=> {

  getQuotes().then((data) => {
      return data.json();
      // return JSON.parse(data)

  }).then(function(parseQuote) {
        console.log("parseQuote:", parseQuote)
        quotesData = parseQuote;
        // setQuotesData(parseQuote);
       
  }).then(function(){
    console.log("stateData:", quotesData)
    // getQuote();
  })

  
},[null]);



 



  return (
    <div id="wrapper">

    <div id="quote-box">
      <div className="quote-text">
        <i className="fa fa-quote-left"></i>
        <span id="text"></span>
      </div>
      <div className="quote-author">- <span id="author"></span></div>
      <div className="buttons">

        <div className="share-btn">
            <a
              href=""
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
               href=""
              className="button"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              target="_blank"
            >
              <i className="fa fa-tumblr"></i>
            </a>
        </div>
  
        <div className="new-quote-btn">
          <button className="button" id="new-quote" onClick={getQuote}>New quote</button>
        </div> 

      </div>
    </div>
  
    <div className="footer">by <a href="https://codepen.io/Kruze-Development/">tonyKuz</a></div>
  </div>
  );
}

export default App;
