// ============
// Da variables
// ============

// Form elements
var form = document.getElementById('ticketForm');
var formError = document.getElementById('formError');
var ticketType = ''; // must be queried in the function itself due to nature of radio buttons
var ticketQuantity = document.getElementById('ticketQuantity');
var sponsorshipCheckbox = document.getElementById('sponsorshipCheckbox');
var orderTotal = document.getElementById('orderTotal');
var checkoutButton = document.getElementById('checkoutButton');

// Stripe variables
var stripe = Stripe('pk_live_ecGmKZ3U8636cHWaaoEoIEPD007kMBdziI');
var lineItems = [];
var earlybirdWeekendPrice = 'price_1MyU6uHzxwXeISKIEhATFkeY';
var earlybirdWeekendPriceLastCall = 'price_1NAQbsHzxwXeISKIZCdHBwTo';
var earlybirdFridayPrice = 'price_1MyU6uHzxwXeISKIZKilwxvR';
var earlybirdSaturdayPrice = 'price_1MyU7bHzxwXeISKIOrMjSchD';
var weekendPrice = 'price_1MyU82HzxwXeISKIdj4jpzVu';
var fridayPrice = 'price_1MyU8FHzxwXeISKIqiTK0p18';
var saturdayPrice = 'price_1MyU8bHzxwXeISKIRqgSHOri';
var sponsorshipPrice = 'price_1MyUDVHzxwXeISKIivV5y2xZ';
var earlybirdWeekendPriceInt = 80.75;
var earlybirdWeekendPriceLastCallInt = 90;
var earlybirdFridayPriceInt = 38.25;
var earlybirdSaturdayPriceInt = 55.25;
var weekendPriceInt = 95;
var fridayPriceInt = 45;
var saturdayPriceInt = 65;
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
		case earlybirdWeekendPrice:
			ticketPrice = earlybirdWeekendPriceInt;
			break;
		case earlybirdWeekendPriceLastCall:
			ticketPrice = earlybirdWeekendPriceLastCallInt;
			break;
		case earlybirdFridayPrice:
			ticketPrice = earlybirdFridayPriceInt;
			break;
		case earlybirdSaturdayPrice:
			ticketPrice = earlybirdSaturdayPriceInt;
			break;
		case weekendPrice:
			ticketPrice = weekendPriceInt;
			break;
		case fridayPrice:
			ticketPrice = fridayPriceInt;
			break;
		case saturdayPrice:
			ticketPrice = saturdayPriceInt;
	}
	
	// Add tickets to Stripe line items
	var ticketsItem = {price: ticketType, quantity: parseFloat(ticketQuantity.value)};
	lineItems.push(ticketsItem);
	
	// Determine whether sponsorship checkbox is checked
	var isSponsoring = sponsorshipCheckbox.checked;
	
	// If sponsorship is checked, add it to Stripe line items
	if (isSponsoring == true) {
		var sponsorshipItem = {price: sponsorshipPrice, quantity: 1}
		lineItems.push(sponsorshipItem);
	}

	// Update DOM with order total
	orderTotal.innerHTML = parseFloat(ticketQuantity.value) * parseFloat(ticketPrice) + (isSponsoring ? sponsorshipPriceInt : 0);
}

// Bind calculateTotal to form's change event
document.getElementById('ticketForm').addEventListener('input', calculateTotal);

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
