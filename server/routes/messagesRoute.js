const { addMessage, getMessage} = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.get("/getmsg/", getMessage);


module.exports = router;