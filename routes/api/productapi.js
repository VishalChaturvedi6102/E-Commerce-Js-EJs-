const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const { isLoggedIn } = require('../../middleware');



router.post('/product/:productId/like', isLoggedIn, async (req, res) => {

    const { productId } = req.params;
    const user = req.user;
    const isLike = user.wishList.includes(productId);

    // if (isLike) {
    //     req.user = await User.findByIdAndUpdate(req.user._id, { $pull: { wishList: productId } }, {new:true});
    // }
    // else {
    //     req.user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: productId } }, {new:true});
    // }

    const option = isLike ? '$pull' : '$addToSet';
    req.user = await User.findByIdAndUpdate(req.user._id, { [option]: { wishList: productId } }, { new: true });


    res.send('like API');
})


module.exports = router;