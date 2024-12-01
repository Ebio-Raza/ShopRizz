const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title:String,
    highlights:String,
    photos:[String],
    category:String,
    category_id:mongoose.Schema.Types.ObjectId,
    seller_id:mongoose.Schema.Types.ObjectId,
    rating:Number,
    price:Number,
    discount_price:Number,
    TotalQty:Number,
    SoldQty:Number,
    Status:String,
    SellerStatus:String,
    deliveryDays:Number,
    deliveryCharges:Number,
    PaymentMethod:String
});
module.exports = mongoose.model("products",ProductSchema);