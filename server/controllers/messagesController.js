const messageModel = require("../model/messageModel")

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from  , to],
      sender: from,
    });
    if (data) return res.json({ msg: "Menssagem enviada" })
    return res.json({ msg: "Houve uma falha ao enviar a mensagem" })
  } catch (ex) {
    next(ex)
  }
};
module.exports.getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.query
    const messages = await messageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from ,
        message: msg.message.text,
      }
    })
    
    return res.json(projectMessages)
  } catch (ex) {
    next(ex)
  }
};
