const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.get('/signup', (req, res) => {
    res.render('auth/signup');
})


router.post('/signup', async (req, res, next) => {

    try {
        const { username, email, password, role } = req.body;
        const user = new User({ username, email, role });
        const newUser = await User.register(user, password);

        req.login(newUser, function(err){
            if(err){
                return next(err)
            }

            req.flash('success', 'Welcome, You are Registered Successfully!');
            res.redirect('/products');
        });

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
});


router.post('/login',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/login',
            failureFlash: true
        }
    ),
    (req, res) => {

        req.flash('success', `Welcome ${req.user.username}!`);

        // let redirectUrl = req.session.tempUrl;
        // console.log("redirect url : "+redirectUrl);


        // res.redirect(redirectUrl);
        res.redirect('/products');
    });


router.get('/logout', (req, res, next) => {
    
    req.logout(function (err) {
        if (err) { return next(err); }

        req.flash('success', 'Successfully Logged Out!!');
        // console.log('You have Logged Out!');
        res.redirect('/products');
    });
})

module.exports = router;