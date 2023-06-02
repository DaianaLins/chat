const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        max: 50,
    },
   password:{
        type: String,
        required: true,
        min: 3,
        max: 50,
    }, 
    isAvatarImageSet:{
        type: Boolean,
        default: false,
    },
    // avatarImage:{
    //     type: Boolean,
    //     default: "",
    // },
})

module.exports = mongoose.model("Users", useSchema);