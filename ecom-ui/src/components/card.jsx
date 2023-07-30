import  { useState } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { loadStripe } from "@stripe/stripe-js";

const StripePayment = () => {
  const [product, setProduct] = useState({
    name: "iphone",
    price: 1000,
    productOwner: "APPLE",
    description: "THIS COMPANY OF ONE OF THE BEST DOCS",
    quantity: 1,
  });

  const handlePayment = async () => {
    const stripe = await loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");
    const body = { product }; // Use the product state variable here
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img src="https://images.pexels.com/photos/16004744/pexels-photo-16004744/free-of-apple-iphone-14-pro-max-mobile-phone.jpeg?auto=compress&cs=tinysrgb&w=600" />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <Button variant="primary" onClick={handlePayment}>ADD TO CART {product.price}</Button>
      </Card.Body>
    </Card>
  );
};

export default StripePayment;
