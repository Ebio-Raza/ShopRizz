const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    customerID:mongoose.Schema.Types.ObjectId,
    product_IDs: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }]
});
module.exports = mongoose.model("carts",CartSchema);
