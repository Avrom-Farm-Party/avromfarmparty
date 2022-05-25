// ==================
// Reusable variables
// ==================

// Define the order form variables
var ticketQuantity = document.getElementById('ticketQuantity');
var ticketPrice = document.getElementById('ticketPrice');
var orderTotal = document.getElementById('orderTotal');
var checkoutButton = document.getElementById('checkoutButton');

// ===================
// Display form errors
// ===================

// Define the form error element
var formError = document.getElementById('formError');

// Define the error handling function
function handleError(err,displayMessage) {
  console.error("handleError message: " + err);
  formError.style.display = "block"; // Also referred to in calculateTotal()

  if (displayMessage) {
  	formError.innerHTML = err;
  }
  
  else {
  	formError.innerHTML = 'There was an error. Please <a href="mailto:avromfarmparty@penguinmail.com?subject=Website error">contact us</a>.';
  }
}

// ============================
// Calculate ticket order total
// ============================

function calculateTotal() {
	// Reset formErrors (hide it)
	formError.style.display = "none";

	// Only update orderTotal if the ticket price is not NotaNumber
	if (!isNaN(parseInt(ticketPrice.value))) {
 		orderTotal.value = parseInt(ticketQuantity.value) * parseInt(ticketPrice.value);
 		checkoutButton.value = "Pay $" + orderTotal.value;
	}
}

// Bind calculateTotal to form's change event
document.getElementById('ticket-form').addEventListener('input', calculateTotal);

// =============
// Stripe stuff!
// =============

// Define Stripe
var stripe = Stripe('pk_live_ecGmKZ3U8636cHWaaoEoIEPD007kMBdziI');

// Define the form
var form = document.getElementById('ticket-form');

// Bind the form's submit event to an AJAX POST
form.addEventListener('submit', async (event) => {
	// Prevent the form's default submit behavior
	event.preventDefault();
  
	// Display error if orderTotal is null or 0
	if (orderTotal.value == null || orderTotal.value == 0) {
		handleError("Please choose a ticket price.", true);
	}

	// Display error if orderTotal is less than $25 minimum
	// Not a security measure - actual price checking to be done on server side
	else if (orderTotal.value < 25) {
		handleError("Please choose a valid ticket price.", true);
	}

	// If the other tests are passed, do the AJAX POST
	else {
		// Thanks to https://attacomsian.com/blog/xhr-json-post-request for helping wean off jQuery AJAX

		// Create the JSON payload object
	  	var json = {
		    'ticketQuantity': ticketQuantity.value,
	        'ticketPrice': ticketPrice.value
	    };

	    // Define the Fetch API request options
		var fetchOptions = {
		    method: 'POST',
		    body: JSON.stringify(json),
		    headers: {
		        'Content-Type': 'application/json'
		    }
		};

		// Send the POST requst using Fetch API
		fetch('/.netlify/functions/checkout', fetchOptions)
			.then(res => {
		        if (res.ok) {
		            return res.json();
		        } else {
		            return Promise.reject(res.status);
		        }
		    })
		    .then(json => {
		    	console.log("Stripe Checkout Session ID: " + json);

		    	stripe.redirectToCheckout({
				  sessionId: json
				}).then(function (result) {
				  handleError(result.error.message);
				});
		    })
			.catch(err => handleError(err));
	}
});
