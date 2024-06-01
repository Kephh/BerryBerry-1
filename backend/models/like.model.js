import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

const Like = mongoose.model('Like', likeSchema);
export default Like;
