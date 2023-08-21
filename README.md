# using-stripe

<img src="./ecom-ui/src/images/Screenshot%20(282).png"/>

## Summary
The code snippet is a functional component in React that handles the payment process using Stripe. It allows the user to add a product to the cart, update the quantity, and proceed to checkout.

## Example Usage
```javascript
<StripePayment />
```

## Code Analysis
### Inputs
The code snippet takes no inputs.
___
### Flow
1. The component initializes the state variables `product` and `isProcessing` using the `useState` hook.
2. The `handlePayment` function is called when the user clicks the "ADD TO CART" button.
3. Inside the `handlePayment` function:
   - The `isProcessing` state is set to `true` to indicate that the payment is being processed.
   - The Stripe library is loaded using the `loadStripe` function.
   - The product details are passed to the backend server using an HTTP POST request.
   - If the request is successful, the session ID is obtained from the response.
   - The user is redirected to the Stripe checkout page using the obtained session ID.
   - If there is an error during the redirection, it is logged to the console and the `isProcessing` state is set to `false`.
   - If there is an error during the HTTP request, an error message is displayed to the user and the `isProcessing` state is set to `false`.
4. The `updateProductQuantity` function is called when the user clicks the "Increase Quantity" or "Decrease Quantity" buttons. It updates the `quantity` property of the `product` state.
5. The component renders a card with the product image, name, description, and buttons for adding to the cart and updating the quantity.
___
### Outputs
The code snippet renders a card component with the product details and buttons for adding to the cart and updating the quantity. When the user clicks the "ADD TO CART" button, the payment process is initiated using Stripe. The user is redirected to the Stripe checkout page where they can complete the payment.
___
## BACKEND CODE 
![Postman Image](./ecom-ui/src/images/Screenshot%20(283).png)


## Summary
The code snippet is a callback function for the '/checkout-session' route in an Express.js application. It creates a checkout session using the Stripe API based on the provided product data and returns the session ID as a response.

## Example Usage
```javascript
// Request body
const reqBody = {
  product: [
    { id: 'product_1', quantity: 2 },
    { id: 'product_2', quantity: 1 }
  ]
};

// Response
const resBody = {
  id: 'session_12345'
};
```

## Code Analysis
### Inputs
- The request object (`req`) containing the product data in the request body.
___
### Flow
1. The code extracts the `product` array from the request body.
2. It validates the product data using the `productSchema` defined using the Joi library.
3. If the product data is invalid, it sends a 400 response with an error message.
4. If the product data is valid, it creates an array of line items using the `product` array.
5. It then creates a checkout session using the Stripe API, specifying the payment method types, line items, success URL, and cancel URL.
6. If the session creation is successful, it sends a 200 response with the session ID.
7. If there is an error during the payment or session creation, it sends a 500 response with an error message.
___
### Outputs
- The response object (`res`) with a session ID in the body if the session creation is successful.
- A 400 response with an error message if the product data is invalid.
- A 500 response with an error message if there is an error during the payment or session creation.
___


