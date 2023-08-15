const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5005;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const YOUR_DOMAIN = process.env.YOUR_DOMAIN || 'https://6e1f-102-222-221-118.ngrok-free.app ';

const Joi = require('joi');
const productSchema = Joi.object({
  id: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

/**
 * Callback function for the '/checkout-session' route.
 * Creates a checkout session using the Stripe API based on the provided product data.
 * Returns the session ID as a response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object.
 */
app.post('/checkout-session', async (req, res) => {
  const { product } = req.body;

  // Validate product data
  const { error } = productSchema.validate(product);
  if (error) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  try {
    // Create line items
    const lineItems = product.map((product) => ({
      price: product.id,
      quantity: product.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?cancel=true`,
    });

    // Return session ID
    return res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error during payment:', error);
    return res.status(500).json({ message: 'Error during payment' });
  }
});
    
// Listen
app.listen(port, () => console.log(`server is running on port ${port}`));
