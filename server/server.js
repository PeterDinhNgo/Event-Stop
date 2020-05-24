const cors = require("cors");
const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const stripe = require('stripe')('sk_test_cZqw9wy2skTNiXMrxU529l4M006vqhrkdS');



app.use(express.static(publicPath));

app.use(express.json());
app.use(cors());

app.get('*', (req, res) => { // request object'req' and response object'res
    res.sendFile(path.join(publicPath, 'index.html'));
}); //function to run when someone makes a get request to our server.



app.post('/signed_in/home', async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { product, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: product.price,
        currency: 'aud',
        payment_method_types: ['card'],
        receipt_email: token.email,
      });
  
      
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        }
      );
    console.log("Charge:", { paymentIntent });
        status = "success";
    } catch (error) {
      console.error("Error:", error);
        status = "failure";
    }
    res.json({ error, status });
});


app.listen(port, () => {
    console.log('Server is up!');
});

