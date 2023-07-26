// models/purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    amount:{
        type:Number,
        required:true
    },
    orderedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
}, {timestamps:true});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
