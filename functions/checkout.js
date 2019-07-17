// Add Stripe
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async function(event) {
	const req = JSON.parse(event.body); // parse the stringified JSON request body
	const ticketQuantity = parseInt(req.ticketQuantity); // using parseInt because the parsed JSON is a string
	const ticketPrice = parseInt(req.ticketPrice) * 100;

	const session = await stripe.checkout.sessions.create({
	  success_url: "https://avromfarmparty.com/success",
	  cancel_url: "https://avromfarmparty.com",
	  payment_method_types: ["card"],
	  line_items: [{
	    name: "Avrom Farm Party 2019 Admission",
	    amount: ticketPrice,
	    images: ["https://avromfarmparty.com/img/logo.png"],
	    currency: "usd",
	    quantity: ticketQuantity
	  }]
	});

	const response = {
		statusCode: 200,
		body: JSON.stringify(session.id),
	};

	return response;
}
