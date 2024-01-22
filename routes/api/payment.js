const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware');
const Razorpay = require('razorpay');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;


const instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET
});

router.get('/getkey', (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_KEY_ID
    })
})

router.post('/checkout', isLoggedIn, (req, res) => {
    const { amount } = req.body;
    // console.log(amount);
    const options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
    };
    // const order = await instance.orders.create(options);
    instance.orders.create(options, function (err, order) {
        // console.log(order);
        res.status(200).json({
            success: true,
            order
        })
    });

})

router.post('/paymentverification', (req, res) => {
    // console.log(req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const isValid = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, RAZORPAY_KEY_SECRET);

    if(isValid){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(400).json({
            success: false
        })
    }

    
})

module.exports = router;