import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo Connected")
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDatabase;