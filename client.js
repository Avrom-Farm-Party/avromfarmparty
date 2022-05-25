// ============
// Da variables
// ============

// Form elements
var form = document.getElementById('ticket-form');
var formError = document.getElementById('formError');
var ticketType = ''; // must be queried in the function itself due to nature of radio buttons
var ticketQuantity = document.getElementById('ticketQuantity');
var sponsorshipCheckbox = document.getElementById('sponsorshipCheckbox');
var orderTotal = document.getElementById('orderTotal');
var checkoutButton = document.getElementById('checkoutButton');

// Stripe variables
var stripe = Stripe('pk_live_ecGmKZ3U8636cHWaaoEoIEPD007kMBdziI');
var lineItems = [];
var ticketPriceFull = 'price_1L2STzHzxwXeISKIRVUYROoE';
var ticketPriceFriday = 'price_1L2SUpHzxwXeISKIVx2jQRRw';
var ticketPriceSaturday = 'price_1L2SVMHzxwXeISKIxmWXXRkF';
var ticketPriceFullInt = 125;
var ticketPriceFridayInt = 90;
var ticketPriceSaturdayInt = 90;
var sponsorshipPrice = 'price_1L3Pb9HzxwXeISKIRSSHdIhx';
var sponsorshipPriceInt = 200;

// Other variables
var ticketPrice = 0;

// ============================
// Calculate ticket order total
// ============================

// Call calculateTotal immediately, just to populate the orderTotal element
calculateTotal();

function calculateTotal() {
	// Reset formErrors (hide it)
	formError.style.display = "none";
	
	// Reset lineItems
	lineItems = [];
	
	// Fetch the current ticket type
	ticketType = document.querySelector('input[name="ticketType"]:checked').value;
	
	// Update ticketPrice based on current ticket type
	switch (ticketType) {
		case ticketPriceFull:
			ticketPrice = ticketPriceFullInt;
			break;
		case ticketPriceFriday:
			ticketPrice = ticketPriceFridayInt;
			break;
		case ticketPriceSaturday:
			ticketPrice = ticketPriceSaturdayInt;
	}
	
	// Add tickets to Stripe line items
	var ticketsItem = {price: ticketType, quantity: parseInt(ticketQuantity.value)};
	lineItems.push(ticketsItem);
	
	// Determine whether sponsorship checkbox is checked
	var isSponsoring = sponsorshipCheckbox.checked;
	
	// If sponsorship is checked, add it to Stripe line items
	if (isSponsoring == true) {
		var sponsorshipItem = {price: sponsorshipPrice, quantity: 1}
		lineItems.push(sponsorshipItem);
	}

	// Update DOM with order total
	orderTotal.innerHTML = parseInt(ticketQuantity.value) * parseInt(ticketPrice) + (isSponsoring ? sponsorshipPriceInt : 0);
}

// Bind calculateTotal to form's change event
document.getElementById('ticket-form').addEventListener('input', calculateTotal);

// =============
// Stripe stuff!
// =============

checkoutButton.addEventListener('click', function () {		
	console.log("Checkout button clicked");
	console.log(lineItems);
	
	stripe.redirectToCheckout({
	  lineItems: lineItems,
	  mode: 'payment',
	  /*
	   * Do not rely on the redirect to the successUrl for fulfilling
	   * purchases, customers may not always reach the success_url after
	   * a successful payment.
	   * Instead use one of the strategies described in
	   * https://stripe.com/docs/payments/checkout/fulfill-orders
	   */
	  successUrl: window.location.protocol + '//avromfarmparty.com/success',
	  cancelUrl: window.location.protocol + '//avromfarmparty.com/',
	})
	.then(function (result) {
	  if (result.error) {
		/*
		 * If `redirectToCheckout` fails due to a browser or network
		 * error, display the localized error message to your customer.
		 */
		formError.textContent = result.error.message + ' Please <a href="mailto:admin@avromfarmparty.com?subject=Website error">contact us</a>.';
	  }
	});
});
