const mongoose = require("mongoose");
const { v4 } = require("uuid");

const conversationsSchema = new mongoose.Schema({
    
    participants:[
        {
            type: String,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: String,
            ref: 'Message',
            default: [],
        }
    ]
});

const  Conversation = mongoose.model('Conversation', conversationsSchema);

module.exports = Conversation
