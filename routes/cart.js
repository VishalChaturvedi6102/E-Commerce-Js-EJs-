const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { isLoggedIn } = require('../middleware');

// Add an item to the cart
router.post('/user/:productId/add', isLoggedIn, async (req, res) => {

    try {
        // Get the product ID from the route parameter
        const { productId } = req.params;

        // Get the user ID from the session or authentication mechanism
        const userId = req.user._id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the product is already in the user's cart
        const cartItem = user.cart.find((item) => item.productId.toString() === productId);

        if (cartItem) {
            // If the product is already in the cart, increase the quantity
            cartItem.quantity++;
        } else {
            // If the product is not in the cart, add it
            user.cart.push({ productId });
        }

        // Save the user's updated cart to the MongoDB database
        await user.save();

        req.flash('success', 'Added item to the cart successfully');
        res.redirect('back'); // Redirect to the cart page
    }
    catch (error) {
        console.error('Error adding item to the cart:', error);
        res.sendStatus(500); // Internal Server Error
    }

});

router.post('/user/:productId/remove', isLoggedIn, async (req, res) => {

    try {
        // Get the product ID from the route parameter
        const { productId } = req.params;

        // Get the user ID from the session or authentication mechanism
        const userId = req.user._id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the product is already in the user's cart
        const cartItem = user.cart.find((item) => item.productId.toString() === productId);

        if (cartItem && cartItem.quantity > 1) {
            // If the product is already in the cart, increase the quantity
            cartItem.quantity--;
        }

        // Save the user's updated cart to the MongoDB database
        await user.save();

        req.flash('success', 'Removed item from the cart successfully');
        res.redirect('back'); // Redirect to the cart page
    }
    catch (error) {
        console.error('Error removing item from the cart:', error);
        res.sendStatus(500); // Internal Server Error
    }

});

router.post('/user/:productId/delete', isLoggedIn, async (req, res) => {

    try {
        // Get the product ID from the route parameter
        const { productId } = req.params;

        // Get the user ID from the session or authentication mechanism
        const userId = req.user._id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the product is already in the user's cart
        const itemIndex = user.cart.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex !== -1) {
            user.cart.splice(itemIndex, 1);
        }

        // Save the user's updated cart to the MongoDB database
        await user.save();

        req.flash('success', 'Removed item from the cart successfully');
        res.redirect('back'); // Redirect to the cart page
    }
    catch (error) {
        console.error('Error removing item from the cart:', error);
        res.sendStatus(500); // Internal Server Error
    }

});


router.get('/user/cart', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.productId');

    let totalAmount = 0;
    user.cart.forEach(item => {
        totalAmount += item.quantity * item.productId.price;
    });

    let purchasedItems = user.cart.map(product => {
        const item = { 
            productId: product.productId._id, 
            quantity: product.quantity
        }
        return item;
    });

    const productsInCart = JSON.stringify(purchasedItems);
    res.render('cart/index', { user, totalAmount, productsInCart});
})


module.exports = router;