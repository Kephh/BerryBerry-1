import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try{
        // connect to local database
        await mongoose.connect("mongodb://localhost:27017/BerryBerry");
        // await mongoose.connect("mongodb+srv://kaifalkhan786:5wXKiDJy6TRTla3z@cluster0.3dryqbq.mongodb.net/BerryBerry?retryWrites=true&w=majority&appName=Cluster0");
        // await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
}

export default connectToMongoDB;