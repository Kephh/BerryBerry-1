import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true, required: true },
    gender: String,
    password: { type: String, required: true, minlength: 6 },
    profilePicture: String
});

const User = mongoose.model('User', userSchema);

export default User;