const sendMessage = (req,res)=>{
    try {
        const {message} = req.body;
        const user = req.user;
        const {id} = req.params
        
        res.status(200).json({
            message,
            senderId:user._id,
            receiverId:id
        })   
    } catch (error) {
        console.error(error);
    }
}

module.exports = sendMessage;
