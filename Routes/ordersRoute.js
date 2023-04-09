const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const order=require('../Models/orderModel')
const stripe = require('stripe')('sk_test_51MrDgDSHxYJ0zyNYba1Awz8qDrbY8qjHBqVcJBsrwnovRVkJfONWpEDbJADf3tl520BIouECwYs5cGrHFwBSgAMX00WGUcHNXG')

router.post('/placeorder', async (req, res) => {
    const { token, subtotal, currentUser, cartItems } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        
        const payment = await stripe.charges.create({
            amount: subtotal * 100,
            currency: 'USD',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })
        
        if (payment) {

         const newOrder=new order({
            name: currentUser.name,
            email: currentUser.email,
            userid: currentUser._id,
            orderItems: cartItems,
            orderAmount: subtotal,
            shippingAddress: {
                street:token.card.addresss_line1,
                city:token.card.address_city,
                country: token.card.address_country,
                pincode: token.card.address_zip
            },
            transaction: payment .source.id
         })

            await newOrder.save();
            res.send('Order Placed Successfully')
        } else {
            res.send('Order Failure')
        }
    } catch (error) {
        return res.status(400).json({ message: 'Something Went Wrong' })
       
    }

})


router.post('/getuserorders',async (req, res) => {
    const {userid}=req.body

    try{
      const orders=await Order.find({userid: userid}).sort({_id: -1})
    res.send(orders)
    } catch (error){
  return res.status(400).json({message: 'Something error while fetch orders'})
    }
})

module.exports = router