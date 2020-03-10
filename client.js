// ============================
// Calculate ticket order total
// ============================

var orderTotal = document.getElementById('checkoutButton');
var ticketQuantity = document.getElementById('ticketQuantity');
var ticketPrice = document.getElementById('ticketPrice');

function calculateTotal() {
  // Only update orderTotal if the ticket price is not NotaNumber
  if (!isNaN(parseInt(ticketPrice.value))) {
    orderTotal.value = "Pay $" + parseInt(ticketQuantity.value) * parseInt(ticketPrice.value);
  }
}

// Bind calculateTotal to form's change event
document.getElementById('ticket-form').addEventListener('change', calculateTotal);

// =============
// Stripe stuff!
// =============

// Define Stripe
// THIS IS A TEST KEY! Replace with prod key
var stripe = Stripe('pk_test_VhcNh7WHsTGlc6eajQSqcjOM00m9S3MAtS');

stripe.redirectToCheckout({
  // Make the id field from the Checkout Session creation API response
  // available to this file, so you can provide it as parameter here
  // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
  sessionId: '{{CHECKOUT_SESSION_ID}}'
}).then(function (result) {
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
});





// Define the form
var form = document.getElementById('ticket-form');

// Bind the form's submit event to an AJAX POST
form.addEventListener('submit', async (event) => {
  // Prevent the form's default submit behavior
  event.preventDefault();

  // Define order variables for sending in JSON string in the POST
  var ticketQuantity = document.getElementById('ticketQuantity').val();
  var ticketPrice = document.getElementById('ticketPrice').val();
  var orderTotal = document.getElementById('orderTotal').val();
  
  // Only submit AJAX POST if orderTotal is not $0
  if (orderTotal == "$0") {
    // Display error message if orderTotal is $0
    document.getElementById('form-errors').html("Please choose your ticket price above.").css("display","block");
  }

  // If orderTotal is not $0…
  else {
  	// Thanks to https://attacomsian.com/blog/xhr-json-post-request for helping wean off jQuery AJAX

  	// Create the JSON payload object
  	var json = {
	    'ticketQuantity': ticketQuantity,
        'ticketPrice': ticketPrice
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
    	.then(res => res.json())
    	.then(res => console.log(res))
    	.catch(err => console.error(err));





  	// Create the AJAX object
  	var ajax = new XMLHttpRequest();

  	

	// Open the AJAX request
	ajax.open('POST', '/.netlify/functions/checkout');

	// Set the Content-Type header
	ajax.setRequestHeader('Content-Type', 'application/json');

	// Send the rquest with JSON payload
	ajax.send(JSON.stringify(json));




        success: function(res){     
            stripe.redirectToCheckout({
              sessionId: JSON.parse(res)
            }).then(function (result) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `result.error.message`.
              alert(result.error.message);
            });
        },
        error: function(){
          $("#form-errors").html("There was an error. Please contact avromfarmparty@penguinmail.com").css("display","block");
        }
    });
  }
});


