const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    register: async (req, res, next) => {
        try {
            var { Username, Email, Password } = req.body;
            var emailConfirm = await Users.findOne({ Email });
            if (emailConfirm) {
                return res.status(400).json({ success: false, msg: "Email Already" });
            }
            var passwordHash = await bcrypt.hash(Password, 10);
            var newUser = new Users({
                Username, Email, Password: passwordHash
            });
            const result = await newUser.save();
            return res.status(200).json({ success: true, msg: result });
        } catch (err) {
            return res.status(400).json({ success: false, msg: err });
        }
    },
    login: async (req, res, next) => {
        try {
            var { Email, Password } = req.body;
            var FindEmail = await Users.findOne({ Email });
            if (!FindEmail) {
                return res.status(400).json({ success: false, msg: "Email not found" });
            }
            var comparePassword = await bcrypt.compare(Password, FindEmail.Password);
            if (!comparePassword) {
                return res.status(400).json({ success: false, msg: "Password not match" });
            }
            var access_token = createToken({
                id: FindEmail._id,
                email: FindEmail.Email
            })
            return res.status(200).json({ success: true, access_token });
        } catch (err) {
            return res.status(200).json({ success: false, msg: err });
        }
    },
    profile: async (req, res, next) => {
        try {
            const id = req.user.id;
            var findUser = await Users.findOne({ _id: id }).select("-Password");
            return res.status(200).json({ success: true, msg: findUser });
        } catch (err) {
            return res.status(200).json({ success: false, msg: err.message });
        }
    },
    uploadAvatar: async (req, res, next) => {
        try {
            const id = req.user.id;
            await Users.findByIdAndUpdate(id, { Avatar: req.body.file });
            return res.status(200).json({ success: true, file: req.body.file });
        } catch (err) {
            return res.status(200).json({ success: false, msg: err.message });
        }
    }

}


const createToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "7d"
    });
}





