exports.handler = function(event, context, callback) {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_NxBFZhiuRth7jsK4JGmaDoDS00ebRADj39");

    (async () => {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: 'T-shirt',
          description: 'Comfortable cotton t-shirt',
          images: ['https://example.com/t-shirt.png'],
          amount: 500,
          currency: 'usd',
          quantity: 1,
        }],
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
    })();

    callback(null, {
    statusCode: 200,
    body: "Hello, World"
    });
}
