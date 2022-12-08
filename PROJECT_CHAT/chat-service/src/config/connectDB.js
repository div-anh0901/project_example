const mongoose = require('mongoose');

module.exports = connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("success");
    } catch (err) {
        console.log(err);
    }
}