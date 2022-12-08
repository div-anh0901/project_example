const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    Username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Status: {
        type: Number,
        default: 1
    },
    Avatar: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png"
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("User", UserSchema);
