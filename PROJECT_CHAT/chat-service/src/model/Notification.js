const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    notis: [
        {
            type_noti: Number,
            sender: {
                type: String
            },
            Email: {
                type: String
            },
            Username: {
                type: String
            },
            Avatar: {
                type: String
            },
            content: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            status_show: {
                type: Number,
                default: 0//0 none  , //1 show
            },
            status_view: {
                type: Number,
                default: 0 //0 chưa xem, // 1 đã xem
            }
        }
    ]

});


module.exports = mongoose.model("Notification", NotificationSchema);