import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import Seller from '../models/seller.model.js';

const searchComponents = {
    searchProductsByRegex: async (query) => {
        try {
            return await Product.find({ name: { $regex: query, $options: 'i' } });
        } catch (error) {
            throw new Error('Error searching products');
        }
    },
    
    searchUsersByRegex: async (query) => {
        try {
            return await User.find({ name: { $regex: query, $options: 'i' } });
        } catch (error) {
            throw new Error('Error searching users');
        }
    },
    
    searchSellersByRegex: async (query) => {
        try {
            return await Seller.find({ name: { $regex: query, $options: 'i' } });
        } catch (error) {
            throw new Error('Error searching sellers');
        }
    }
};

export default searchComponents;
