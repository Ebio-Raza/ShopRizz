const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact_no:String,
    address:String,
    store_name:String
});
module.exports = mongoose.model("sellers",sellerSchema);
