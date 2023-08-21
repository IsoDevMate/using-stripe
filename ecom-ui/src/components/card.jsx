import  { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { loadStripe } from '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import IMG from '../images/iphone.jpg';

export const StripePayment = () => {
  const [product, setProduct] = useState([{
    name: 'iphone-13pro-max',
    id: "price_1NZG7VCZYEjq9G2u5VogGRYM",
    price: product.id,
    /*  productOwner: 'APPLE',
    description: 'THIS COMPANY OF ONE OF THE BEST DOCS', */
    quantity: 1,
  }]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    const stripe = await loadStripe(
      'pk_test_51NGYDuCZYEjq9G2uxPaav5ZKYWVuVhhzrPPQDKBlUfJT8EhSfsCdq3GsVxPz012amQ904zC0lLuFrpktDrFGsJ7f006j7FHyhK'
    );
    //pass product details to backend
    const body = {  product };
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('http://localhost:5005/api/checkout-session', body, {
        headers: headers,
      });

      const session = response.data;

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed. Please try again later.');
      setIsProcessing(false);
    }
  };

  const updateProductQuantity = (newQuantity) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantity: newQuantity,
    }));
  };

  return (
    <Card style={{ width: '18rem', backgroundColor: '#f0f0f0', color: '#333', margin: '1rem' }}>
     <Card.Img
  variant="left"
  src={IMG}
  style={{
    width: '80%',
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block' // To center the image horizontally
  }}
/>

      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : `ADD TO CART ${product.price}`}
        </Button>
        <Button variant="secondary" onClick={() => updateProductQuantity(product.quantity + 1)}>
          Increase Quantity
        </Button>
        <Button
          variant="secondary"
          onClick={() => updateProductQuantity(product.quantity - 1)}
          disabled={product.quantity === 1}
        >
          Decrease Quantity
        </Button>
      </Card.Body>
    </Card>
  );
};
