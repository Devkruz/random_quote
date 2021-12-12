//import necessary dependencies

import $ from 'jquery';
import './App.css';
import {useState, useEffect} from "react";

function App() {
// initializing state and variables
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [currentColor, setCurrentColor] = useState("blue");
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
  async function getQuotes(animation) {
    animation()
    try{
      // ,{headers: {Accept: 'application/json'}}
      const data = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      const quote =  await data.json();
      // get a random quote from quotesData 
      let randomQuote = (function() {
       const quoteLen =  quote.quotes.length;
       const rand = Math.floor(Math.random() * quoteLen);
       return quote.quotes[rand];
     })();
     let randColor = (function() {
         return  Math.floor(Math.random() * colors.length);
     })();
      setCurrentColor(colors[randColor])
      setCurrentQuote(randomQuote.quote);
      setCurrentAuthor(randomQuote.author);
      console.log(currentColor)
    }catch(err){
      console.log(err)
    }
  };


  



 // animate
  function animation() {
   

    $('.quote-text').animate({ opacity: 0 }, 10, function(){
       $(this).animate({opacity:1}, 600)
    });
    $('.quote-author').animate({ opacity: 0}, 10, function() {
       $(this).animate({opacity:1}, 600)
    });
   

  };


  useEffect(()=> {
    getQuotes(animation);
  }, []);

  return (
  

    
    <div id="wrapper" style={{background:currentColor}}>
    <div className="container">

       
          <div id="quote-box">
            <div className="quote-text" style={{opacity:0}}>
              <i className="fa fa-quote-left" style={{color:currentColor}}></i>
              <span id="text" style={{color:currentColor}}>{currentQuote ? currentQuote: "Loading..." }</span>
            </div>
            <div className="quote-author" style={{color:currentColor, opacity: 0}}>- <span id="author">{currentAuthor ? currentAuthor : "Loading..."}</span></div>
            <div className="buttons">

              <div className="share-btn">
                  <a
                   style={{background:currentColor}}
                    href={ 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                    encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)}
                    className="button"
                    id="tweet-quote"
                    title="Tweet this quote!"
                    target="_top"
                    rel="noreferrer noopener" 
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    style={{background:currentColor}}
                    href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                    encodeURIComponent(currentAuthor) +
                    '&content=' +
                    encodeURIComponent(currentQuote) +
                    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'}
                    className="button"
                    id="tumblr-quote"
                    title="Post this quote on tumblr!"
                    target="_blank"
                    rel="noreferrer noopener" 
                  >
                    <i className="fa fa-tumblr"></i>
                  </a>
              </div>
        
              <div className="new-quote-btn">
                <button className="button" id="new-quote"  style={{background:currentColor}} onClick={()=> getQuotes(animation)}>New quote</button>
              </div> 

            </div>
    </div>
  
      <div className="footer">by <a href="https://codepen.io/Kruze-Development/">tonyKuz</a></div>
    </div>
  </div>
  );
}


//render the root ui to the DOM
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
