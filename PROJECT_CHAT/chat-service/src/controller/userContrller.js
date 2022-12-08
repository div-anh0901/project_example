const User = require('../model/users');
const ApiFeatures = require('../utils/apiFeatures');
const Conversation = require('../model/Conversation');


module.exports = {
    getAllUser: async (req, res, next) => {
        try {
            var apiFeatures = new ApiFeatures(User.find({}), req.query).search();
            const result = await apiFeatures.query;
            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                data: "",
                msg: err
            });
        }
    },
    addFriend: async (req, res, next) => {
        const id = req.user.id;
        try {
            var data = await Conversation.findOneAndUpdate({ user_Id: id }, {
                $push: {
                    members: {
                        friendId: req.body.friendId,
                        status_send: 1
                    }
                }
            });
            await Conversation.findOneAndUpdate({ user_Id: req.body.friendId }, {
                $push: {
                    members: {
                        friendId: id,
                        status_receiver: 1
                    }
                }
            });
            return res.status(200).json({
                success: true,
                data: data
            });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg: err,
                data: ""
            });
        }
    },
    getOneConvasation: async (req, res, next) => {
        const id = req.user.id;
        try {
            var convasation = await Conversation.findOne({ user_Id: id });
            return res.status(200).json({ success: true, result: convasation });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg: err,
                data: ""
            });
        }
    },
    newConversation: async (req, res, next) => {
        const id = req.body.id;
        try {
            var checkConversation = await Conversation.findOne({ user_Id: id });
            if (checkConversation) {
                return res.status(200).json({ success: true });
            }

            var bodyConvasation = new Conversation({
                user_Id: id
            });
            await bodyConvasation.save();
            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg: err,
                data: ""
            });
        }
    },
    sendChangeStatus: async (req, res, next) => {
        const id = req.user.id;
        try {
            await Conversation.findOneAndUpdate({ user_Id: id, "members._id": req.params.friendId }, {
                $set: {
                    "members.$.status_send": 1
                }
            });
            return res.status(200).json({ success: true, result: "update status success" });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg: err,
                data: ""
            });
        }
    },
    receiverChangeStatus: async (req, res, next) => {
        const id = req.user.id;
        try {
            await Conversation.findOneAndUpdate({ user_Id: id, "members.friendId": req.body.friendId }, {
                $set: {
                    "members.$.status_send": 1
                }
            });
            await Conversation.findOneAndUpdate({ user_Id: req.body.friendId, "members.friendId": id }, {
                $set: {
                    "members.$.status_receiver": 1
                }
            });
            return res.status(200).json({ success: true, result: "update status success" });
        } catch (err) {
            return res.status(400).json({
                success: false,
                msg: err,
                data: ""
            });
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const id = req.params.id;
            var findUser = await User.findOne({ _id: id }).select("-Password");
            return res.status(200).json({ success: true, msg: findUser });
        } catch (err) {
            return res.status(200).json({ success: false, msg: err });
        }
    },
    getFriendByUserId: async (req, res, next) => {
        const id = req.user.id;
        try {
            const data = await Conversation.findOne({ user_Id: id });
            return res.status(200).json({ success: true, msg: data });
        } catch (err) {
            return res.status(200).json({ success: false, msg: err.message });
        }
    }

}