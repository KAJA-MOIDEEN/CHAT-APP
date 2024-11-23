const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

const sendMessage = async(req,res)=>{
    try {
        const { message } = req.body;
        const senderId = req.user._id;
        const { id: receiverId } = req.params;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            messages: message
        });
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(),newMessage.save()]);
        
        res.status(201).json({
            newMessage
        });
    } catch (error) {
        console.error("Error sending message",error.message);
        res.status(500).json({message:"Error sending message"});
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params;
        console.log(userToChat);

        const senderId = req.user?._id;
        console.log(senderId);
        
        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChat] },
        }).populate("messages"); // Populating the actual messages
        
        console.log(conversation);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        res.status(200).json({ messages: conversation.messages });
    } catch (error) {
        console.error("Error in GetMessages controllers: ", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = {sendMessage, getMessages};
