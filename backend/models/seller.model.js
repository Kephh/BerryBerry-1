import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    isSeller: { type: Boolean, default: true }
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;