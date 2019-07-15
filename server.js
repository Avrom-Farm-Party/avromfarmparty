// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// this is necessary for receiving the form input in the /checkout route
app.use(express.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/success', function(request, response) {
  response.sendFile(__dirname + '/views/success.html');
});


// Define Stripe object for routes
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// provide route for checkout
app.post('/checkout', (req, res) => {
  
  (async () => {
    var ticketQuantity = req.body.ticketQuantity;
    var ticketPrice = req.body.ticketPrice * 100;

    const session = await stripe.checkout.sessions.create({
      success_url: "https://avromfarmparty.com/success",
      cancel_url: "https://avromfarmparty.com",
      payment_method_types: ["card"],
      line_items: [{
        name: "Admission",
        amount: ticketPrice,
        images: ["https://avromfarmparty.com/img/logo.png"],
        currency: "usd",
        quantity: ticketQuantity
      }]
    });

    // Once the Stripe.checkout.sessions.create promise is fulfilled, send the response back to client
    res.json(session.id);
  })();
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
