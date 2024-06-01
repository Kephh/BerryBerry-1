import Product from '../models/product.model.js';

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        // console.log('Fetched products:', products); // Log products before returning the response
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};


const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.path : null;
        const product = new Product({ name, description, price, category, image });
        await product.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, category, image } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price, category, image }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
