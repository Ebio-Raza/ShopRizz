const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact_no: { type: String },
    address: { type: String },
    is_verified: { type: Boolean, default: false }, // Optional field for email/phone verification
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Optional field for user roles
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("customers", UserSchema);
