const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }
}, { timeseries: true });

module.exports = mongoose.model("Message", MessageSchema);