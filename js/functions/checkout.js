exports.handler = function(event, context, callback) {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_NxBFZhiuRth7jsK4JGmaDoDS00ebRADj39");

    var obj = JSON.parse(event.body);
    var ticketQuantity = obj.ticketQuantity;
    var ticketPrice = obj.ticketPrice * 100;

    stripe.checkout.sessions.create({
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
      payment_method_types: ["card"],
      line_items: [{
        name: "Avrom Farm Party 2019",
        amount: ticketPrice,
        images: ["https://avromfarmparty.netlify.com/img/logo.png"],
        currency: "usd",
        quantity: ticketQuantity
      }]
    }, function(err, session) {
      console.log("Stripe session created");
      console.log("Session identifier: " + session.id);
      console.log("Ticket quantity: " + session.display_items[0].quantity);
      console.log("Ticket price: " + session.display_items[0].amount);

      callback(null, {
        statusCode: 200,
        body: session.id
      });
    });
}
