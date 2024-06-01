import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    quantity: Number,
    category: [String],
    likesCount: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

export default Product;