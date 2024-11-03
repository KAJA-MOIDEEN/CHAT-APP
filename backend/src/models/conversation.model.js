const mongoose = require("mongoose")

const conversationsSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: [],
        }
    ]
});

const  Conversation = mongoose.model('Conversation', conversationsSchema);

module.exports = Conversation;