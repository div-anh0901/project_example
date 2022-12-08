const socket = require('socket.io');
//const crypto = require("crypto");
const noti = require('../src/function-socket/noti/noti');
const axios = require('axios');
var url = "http://localhost:5000";
var userOnline = [];
const addUser = (userId, socketId) => {
    !userOnline.some(user => user.userId === userId) && userOnline.push({ userId, socketId })
}
const getUser = userId => {
    return userOnline.find(user => user.userId === userId);
}
const removeUser = (socketId) => {
    userOnline = userOnline.filter(user => user.socketId !== socketId);
}
module.exports = (server) => {
    var arrFriend = [];
    var io = socket(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });



    io.on('connection', (socket) => {
        console.log("socket id : " + socket.id)
        socket.emit("socketid", socket.id)
        socket.on("addUser", id => {
            addUser(id, socket.id);
            socket.emit("getUser", userOnline);
        });


        for (var i = 0; i < arrFriend.length; i++) {
            var checkUserOnline = getUser(arrFriend[i].friendId);
            if (checkUserOnline) {
                arrFriend[i]["online"] = true;
            } else {
                arrFriend[i]["online"] = false;
            }
        }
        socket.emit("friends", arrFriend)

        socket.on("sendRequestFriend", data => {
            var receiverId = getUser(data.receiver);
            //console.log(receiverId)
            socket.to(receiverId.socketId).emit("receiverRequestFriend", { user: data.user });
        });

        socket.on("addFriendSuccess", data => {
            var receiverId = getUser(data.receiver);
            //console.log(receiverId)
            socket.to(receiverId.socketId).emit("on-addFriendSuccess", { user: data.user });
        });

        socket.on('emit-notication', data => {
            var receiverId = getUser(data.receiver);
            switch (data.type) {
                case 1:
                    socket.to(receiverId.socketId).emit("on-notification", { content: "send you a friend request", Email: data.Email, Username: data.Username, Avatar: data.Avatar, sender: data.sender, type_noti: data.type_noti, id: data.receiver });
                    noti.addNoti({ content: "send you a friend request", Email: data.Email, Username: data.Username, Avatar: data.Avatar, sender: data.sender, type_noti: data.type_noti, id: data.receiver })
                    return;
                case 2:
                    socket.to(receiverId.socketId).emit("on-notification", { content: "friend request accepted", Email: data.Email, Username: data.Username, Avatar: data.Avatar, sender: data.sender, type_noti: data.type_noti, id: data.receiver });
                    noti.addNoti({ content: "friend request accepted", Email: data.Email, Username: data.Username, Avatar: data.Avatar, sender: data.sender, type_noti: data.type_noti, id: data.receiver })
                    return;
                default:
                    break;
            }
        });


        socket.on("disconnect", () => {
            arrFriend = [];
            removeUser(socket.id)
            console.log("disconnectd : " + socket.id); // undefined
        });
    });

}