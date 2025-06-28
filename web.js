// Adding font to the document
let fa = document.createElement('style');
    fa.textContent = '@font-face { font-family: i eat crayons; src: url("'
        + chrome.runtime.getURL('fonts/i eat crayons.ttf')
        + '"); }';
document.head.appendChild(fa);

function changeFont(){
	// Selecting all tweets on the page and iterating through them
	let content = document.querySelectorAll('[data-testid="tweet"]');
	for(let i=0; i<content.length;i++){
		let post = content[i]

		// Get all span elements within the tweet
		let spans = post.querySelectorAll('span');
		let username = null;
		
		// Find the span whose inner text starts with '@'
		for(let j=0; j<spans.length; j++){
			if(spans[j].innerText && spans[j].innerText.charAt(0) === '@'){
				username = spans[j];
				break;
			}
		}
		
		// Checking if the username is '@realDonaldTrump'
		if(username && username.innerText == '@realDonaldTrump'){
			let tweetTextElements = post.querySelectorAll('[data-testid="tweetText"]');

			// Applying styles to the tweet text
			if(tweetTextElements.length > 0) {
				let text = tweetTextElements[0].childNodes[0];
				text.style.fontFamily = "'i eat crayons', sans-serif";
				text.style.color = 'darkred';
				text.style.fontSize = '24px';
			}
		}
	}
}

// Calling changeFont on mutations
MutationObserver = window.MutationObserver;
let observer = new MutationObserver(function(mutations, observer) {
    changeFont();
});

// Defining mutation observer to watch for changes in the document
observer.observe(document, {
  subtree: true,
  attributes: true
});