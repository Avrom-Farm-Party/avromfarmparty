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
var stripe = Stripe('pk_test_VhcNh7WHsTGlc6eajQSqcjOM00m9S3MAtS');
var lineItems = [];
var earlybirdWeekendPrice = 'price_1P117CHzxwXeISKIvJaguPAK';
var earlybirdFridayPrice = 'price_1P118MHzxwXeISKIZK472Uti';
var earlybirdSaturdayPrice = 'price_1P117dHzxwXeISKIIAVRtfHe';
var weekendPrice = 'price_1P10ywHzxwXeISKIm8nMY7yz';
var fridayPrice = 'price_1P110wHzxwXeISKIzuo3qdQu';
var saturdayPrice = 'price_1P110aHzxwXeISKI1yst0iC2';
var sponsorshipPrice = 'price_1P1125HzxwXeISKI0QXhqPfd';
var mealBundlePrice = 'price_1P112VHzxwXeISKIx8K9OrKv';
var earlybirdWeekendPriceInt = 84.15;
var earlybirdFridayPriceInt = 41.65;
var earlybirdSaturdayPriceInt = 58.65;
var weekendPriceInt = 99.00;
var fridayPriceInt = 49.00;
var saturdayPriceInt = 69.00;
var sponsorshipPriceInt = 200.00;
var mealBundlePriceInt = 80.00;

// Other variables
var ticketPrice = 0;

// ============================
// Calculate ticket order total
// ============================

// Call calculateTotal immediately, just to populate the orderTotal element
calculateTotal();

// Define the calculateTotal function
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
		var sponsorshipItem = {price: sponsorshipPrice, quantity: 1};
		lineItems.push(sponsorshipItem);
	}
	
	// Determine whether meal bundle checkbox is checked
	var isBundlingMeals = mealBundleCheckbox.checked;
	
	// If meal bundle is checked, add it to Stripe line items
	if (isBundlingMeals == true) {
		var mealBundleItem = {price: mealBundlePrice, quantity: parseFloat(ticketQuantity.value)};
		lineItems.push(mealBundleItem);
	}

	// Update DOM with order total
	orderTotal.innerHTML = ((parseFloat(ticketQuantity.value) * (parseFloat(ticketPrice) + (isBundlingMeals ? mealBundlePriceInt : 0))) + (isSponsoring ? sponsorshipPriceInt : 0)).toFixed(2);
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
