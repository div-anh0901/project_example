var Notification = require('../model/Notification');



module.exports = {
    createNoti: async (req, res, next) => {
        try {
            var noti = await Notification.findOne({ user_id: req.body.id });
            if (noti) {
                return res.status(400).json({ success: true });
            }

            await Notification.create({ user_id: req.body.id });
            return res.status(200).json({ success: true });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    addNoti: async (req, res, next) => {
        try {
            await Notification.findOneAndUpdate({ user_id: req.params.id }, {
                $push: {
                    notis: {
                        type_noti: req.body.type_noti,
                        sender: req.body.sender,
                        content: req.body.content,
                        Email: req.body.Email,
                        Username: req.body.Username,
                        Avatar: req.body.Avatar
                    }
                }
            });
            return res.status(200).json({ success: true, message: "Create success" });
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    },
    getNotiByUserId: async (req, res, next) => {
        try {
            var result = await Notification.findOne({ user_id: req.user.id });
            return res.status(200).json({ success: true, result });
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    },
    updateStatuShow: async (req, res, next) => {
        try {

            /// làm tiếp
            await Notification.findOneAndUpdate({ user_id: req.user.id, "notis._id": req.body.id }, {
                $set: {
                    "notis.$.status_show": 1
                }
            });

            return res.status(200).json({ success: true });
        } catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }

}




