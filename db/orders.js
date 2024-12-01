const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    customerID: mongoose.Schema.Types.ObjectId,
    product_IDs: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }]
});
module.exports = mongoose.model("orders",OrderSchema);