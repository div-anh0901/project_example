var Notification = require('../../model/Notification');

module.exports = {
    addNoti: async (data) => {
        try {
            await Notification.findOneAndUpdate({ user_id: data.id }, {//id của người nhân
                $push: {
                    notis: {
                        type_noti: data.type_noti,
                        sender: data.sender,
                        content: data.content,
                        Email: data.Email,
                        Username: data.Username,
                        Avatar: data.Avatar
                    }
                }
            });
            console.log("success")
        } catch (err) {
            console.log(err.message)
        }
    },
    getNoti: async (data) => {
        try {
            var result = await Notification.findOne({ user_id: data.id });
            console.log(result)
        } catch (err) {
            console.log(err.message);
        }
    }

}