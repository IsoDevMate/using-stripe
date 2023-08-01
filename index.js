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

const YOUR_DOMAIN = process.env.YOUR_DOMAIN || 'https://d232-102-222-221-118.ngrok-free.app';

// Routes here
app.get('/', (req, res, next) => {
  res.render('index page', { title: 'welcome to home Page' });
  next();
});

app.post('/checkout-session', async (req, res) => {
  const { product } = req.body;

  if (!product || !Array.isArray(product)) {
    return res.status(400).json({ message: 'Invalid product data' });
  }
  try {
    const lineItems = product.map((product) => ({
      price: product.id,
      quantity: product.quantity,
    
    }));

    const session = await stripe.checkout.sessions.create({
      
      payment_method_types: ['card'],
      line_items: lineItems[0],
      mode: 'payment',
     /*  payment_status: 'unpaid', */
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?cancel=true`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error during payment:', error);
    res.status(500).json({ message: 'Error during payment' });
  }
});

app.listen(port, () => console.log(`server is running on port ${port}`));
