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


// Make the ticket count increase/decrease buttons work

var ticketCount = 1;

function decrement() {
  ticketCount = document.getElementById('ticketQuantity').value;
    if (ticketCount > 1) {
      ticketCount--;
    }
    document.getElementById('ticketQuantity').value = ticketCount;
    calculateTotal();
}

function increment() {
  ticketCount = document.getElementById('ticketQuantity').value;
    ticketCount++;
    document.getElementById('ticketQuantity').value = ticketCount;
    calculateTotal();
}

document.getElementById('ticket-count-increase').addEventListener("click", increment);
document.getElementById('ticket-count-decrease').addEventListener("click", decrement);


// Restrict the form inputs to specific character sets
// https://stackoverflow.com/questions/22708434/restrict-characters-in-input-field

$('#ticketQuantity').bind('blur', function () {
  if (!this.value.match(/\d/)) {
    this.value = this.value.replace(/\D/g, '');
    this.value = 1;
  } else if (this.value < 1) {
    this.value = 1;
  } else if (this.value.match(/^[a-zA-Z0-9]*$/)) {
    this.value = this.value.replace(/\D/g, '');
  }
  calculateTotal();
});

$('#ticketPrice').bind('blur', function () {
  if (!this.value.match(/\d/)) {
    this.value = this.value.replace(/\D/g, '');
    this.value = 25;
  } else if (this.value < 25) {
    this.value = 25;
  } else if (this.value.match(/^[a-zA-Z0-9]*$/)) {
    this.value = this.value.replace(/\D/g, '');
  }
  calculateTotal();
});


// Calculate ticket order total

var orderTotal = document.getElementById('orderTotal');
var ticketQuantity = document.getElementById('ticketQuantity');
var ticketPrice = document.getElementById('ticketPrice');

function calculateTotal() {
  orderTotal.value = "$" + parseInt(ticketQuantity.value) * parseInt(ticketPrice.value);
  
  // Reset error message
  $("#form-errors").css("display","none");
}

// Bind calculateTotal to form's change event
document.getElementById('ticket-form').addEventListener('change', calculateTotal);


// Submit form data on checkout button click
// https://medium.com/calyx/serverless-contact-forms-with-aws-lambda-79959cd1a6cd

// Define Stripe
var stripe = Stripe('pk_live_ecGmKZ3U8636cHWaaoEoIEPD007kMBdziI');

// Find the form in DOM and bind an AJAX POST to submit event
const form = document.getElementById('ticket-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Define order variables for sending in JSON string in the POST
  var ticketQuantity = $("#ticketQuantity").val();
  var ticketPrice = $("#ticketPrice").val();
  var orderTotal = $("#orderTotal").val();
  
  // Only submit AJAX POST if orderTotal is not $0
  if (orderTotal == "$0") {
    // Display error message if orderTotal is $0
    $("#form-errors").html("Please choose your ticket price above.").css("display","block");
  } else {
    // If the above test is passed, submit the AJAX POST
    $.ajax({
        type: 'POST',
        url: '/checkout',
        contentType: 'application/json',
        data: JSON.stringify({
            'ticketQuantity': ticketQuantity,
            'ticketPrice': ticketPrice
        }),
        success: function(res){        
            stripe.redirectToCheckout({
              sessionId: res
            }).then(function (result) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `result.error.message`.
              alert(result.error.message);
            });
        },
        error: function(){
          $("#form-errors").html("There was an error. Please contact hello@avromfarm.com").css("display","block");
        }
    });
  }
});
