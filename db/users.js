const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact_no:String,
    address:String,
});
module.exports = mongoose.model("customers",UserSchema);
