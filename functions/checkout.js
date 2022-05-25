// Get Stripe secret key from environment
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.handler = async function(event) {
  const req = JSON.parse(event.body); // Parse the stringified JSON request body
  const ticketQuantity = parseInt(req.ticketQuantity); // Using parseInt because the parsed JSON is a string
  const ticketPrice = parseInt(req.ticketPrice) * 100;

  // Checks if ticketPrice is greater than $25 minimum
  if (ticketPrice >= 2500) {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://avromfarmparty.com/success",
      cancel_url: "https://avromfarmparty.com",
      payment_method_types: ["card"],
      line_items: [{
        name: "Avrom Farm Party 2021 Admission",
        amount: ticketPrice,
        images: ["https://avromfarmparty.com/assets/logo.png"],
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

  else {
    return { statusCode: 200, body: JSON.stringify("ticketPrice below 2500") };
  }
}