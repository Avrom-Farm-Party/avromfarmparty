// ----------------------------
// Calculate ticket order total
// ----------------------------

var orderTotal = document.getElementById('checkoutButton');
var ticketQuantity = document.getElementById('ticketQuantity');
var ticketPrice = document.getElementById('ticketPrice');

function calculateTotal() {
  // Only update orderTotal if the ticket price is not NotaNumber
  if (!isNaN(parseInt(ticketPrice.value))) {
    orderTotal.value = "Pay $" + parseInt(ticketQuantity.value) * parseInt(ticketPrice.value);
  }
}

// Bind calculateTotal to form's change event
document.getElementById('ticket-form').addEventListener('change', calculateTotal);