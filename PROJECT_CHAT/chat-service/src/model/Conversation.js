const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    user_Id: {
        type: String
    },
    members: [
        {
            friendId: {
                type: String,
                default: null
            },
            CreatedAt: {
                type: Date,
                default: Date.now()
            },
            status_send: {
                type: Number,
                default: 0,
            },
            status_receiver: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    timeseries: true
});

module.exports = mongoose.model('Conversation', ConversationSchema);

