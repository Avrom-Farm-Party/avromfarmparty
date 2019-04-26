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

	// Stripe integration
	var stripe = Stripe('pk_test_VhcNh7WHsTGlc6eajQSqcjOM00m9S3MAtS');

	// Stripe Checkout function
	function callStripe() {
		stripe.redirectToCheckout({
		  sessionId: '{{CHECKOUT_SESSION_ID}}',
		}).then(function (result) {
		  // If `redirectToCheckout` fails due to a browser or network
		  // error, display the localized error message to your customer
		  // using `result.error.message`.
		  alert(result.error.message);
		});
	}

	// Bind ticket form to Stripe Checkout function
	// document.getElementById("ticket-form").addEventListener("submit", callStripe);
})();