const User = require("../model/userModel")
const brcypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck)
            return res.json({ msg: "Nome de usuário já existe", status: false })
        const emailCheck = await User.findOne({ email })
        if (emailCheck)
            return res.json({ msg: "Email já existe", status: false })
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (err) {
        next(err)
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "Usuário ou senha incorreta", status: false })
        const isPasswordValid = await brcypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Usuário ou senha incorreta", status: false })
        delete user.password;

        return res.json({ status: true, user });
    } catch (err) {
        next(err)
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet: true,
            avatarImage,
        })

        return res.json({ isSet: userData.isAvatarImageSet, image:userData });
    } catch (err) {
        next(err)
    }
};