const express = require('express')
const app = express()

const cors = require("cors"); 

require("dotenv").config()
const port = process.env.PORT || 5005

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//middeware 
app.use(express.json())
app.use(cors())



// Routes here 
app.post("/checkout-session", async(req,res)=>{
   
  const { product, items } = req.body; // Destructure product and items from req.body
  console.log("Product:", product);
  console.log("Items:", items);
    //let items= req.body.items
    let lineItems =[]
      items.ForEach((item)=>lineItems.push(

        {
          price:item.id,
          quantity:item.quantity,
          name:item.name,
          desc:item.description
        }
      ))


    
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], 
        //an array of req.body.items from the frontend
        //we create  another array called line_items and store items from the frontend
          /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]

    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
      /*   line_items: [ 
            { 
              price_data: { 
                currency: "usd", 
                product_data: { 
                  name: product.name, 
                }, 
                unit_amount: product.price * 100, 
              }, 
              quantity: product.quantity, 
            }, 
          ],  */
        line_items:lineItems,
          mode: "payment", 
          payment_status:'unpaid',
          success_url: "http://localhost:3000/success", 
          cancel_url: "http://localhost:3000/cancel", 
        }); 
        res.json({ id: session.id }); 
      }); 

app.listen(port, ()=>
console.log(`server is running on port ${port}`)
)
