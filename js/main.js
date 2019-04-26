// self executing function here
(function() {
	// Hide the scroll hint arrow on scroll (via W3Schools)
	var prevScrollpos = window.pageYOffset;
	window.onscroll = function() {
	  var currentScrollPos = window.pageYOffset;
	  if (prevScrollpos > currentScrollPos) {
	    document.getElementById("scroll-arrow").style.opacity = "1";
	  } else {
	    document.getElementById("scroll-arrow").style.opacity = "0";
	  }
	  prevScrollpos = currentScrollPos;
	}

	// Make the ticket count increase/decrease buttons work
	var ticketCount = 1;
    function decrement() {
    	ticketCount = document.getElementById('ticketQuantity').value;
        if (ticketCount > 1) {
        	ticketCount--;
        }
        document.getElementById('ticketQuantity').value = ticketCount;
        calculateTotal();
    }
    function increment() {
    	ticketCount = document.getElementById('ticketQuantity').value;
        ticketCount++;
        document.getElementById('ticketQuantity').value = ticketCount;
        calculateTotal();
    }
    document.getElementById('ticket-count-increase').addEventListener("click", increment);
    document.getElementById('ticket-count-decrease').addEventListener("click", decrement);

    // Restrict the form inputs to specific character sets
	// https://stackoverflow.com/questions/22708434/restrict-characters-in-input-field
	$('#ticketQuantity').bind('blur', function () {
	  if (!this.value.match(/\d/)) {
	    this.value = this.value.replace(/\D/g, '');
	    this.value = 1;
	  } else if (this.value < 1) {
	  	this.value = 1;
	  } else if (this.value.match(/^[a-zA-Z0-9]*$/)) {
	  	this.value = this.value.replace(/\D/g, '');
	  }
	  calculateTotal();
	});

	$('#ticketPrice').bind('blur', function () {
	  if (!this.value.match(/\d/)) {
	    this.value = this.value.replace(/\D/g, '');
	    this.value = 25;
	  } else if (this.value < 25) {
	  	this.value = 25;
	  } else if (this.value.match(/^[a-zA-Z0-9]*$/)) {
	  	this.value = this.value.replace(/\D/g, '');
	  }
	  calculateTotal();
	});

    // Calculate ticket order total
    function calculateTotal() {
    	if (ticketPrice.value < 1) {
    		orderTotal.value = "$0"
    	} else {
    		orderTotal = document.getElementById('orderTotal');
    		orderTotal.value = "$"+parseInt(ticketQuantity.value)*parseInt(ticketPrice.value);
    	}
    }
    document.getElementById('ticket-form').addEventListener('change', calculateTotal);

    // Submit form data on checkout button click
    // https://medium.com/calyx/serverless-contact-forms-with-aws-lambda-79959cd1a6cd
    $("#checkout-button").click(function(e) {
        e.preventDefault();

        var ticketQuantity = $("#ticketQuantity").val(),
            ticketPrice = $("#ticketPrice").val();

        $.ajax({
            type: "POST",
            url: '.netlify/functions/checkout',
            contentType: 'application/json',
            data: JSON.stringify({
                'ticketQuantity': ticketQuantity,
                'ticketPrice': ticketPrice
            }),
            success: function(res){
            	// Stripe integration
				var stripe = Stripe('pk_test_VhcNh7WHsTGlc6eajQSqcjOM00m9S3MAtS');
                var sessionID = res.trim(); // get rid of weird 0A 0A line break problem at end of session id
                console.log(sessionID);
                stripe.redirectToCheckout({
				  sessionId: sessionID
				}).then(function (result) {
				  // If `redirectToCheckout` fails due to a browser or network
				  // error, display the localized error message to your customer
				  // using `result.error.message`.
				  alert(result.error.message);
				});
            },
            error: function(){
                //$('#form-response').text('There was an error. Please contact hello@avromfarm.com');
            }
        });

    })
})();