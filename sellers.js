const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact_no: { type: String },
    address: { type: String },
    store_name: { type: String },
    is_verified: { type: Boolean, default: false }, // For account verification
    refresh_token: { type: String }, // For managing refresh tokens
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("sellers", sellerSchema);
