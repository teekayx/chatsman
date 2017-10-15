'use strict';

const helper = require('../helpers');

module.exports = (io,app) => {
    let allrooms = app.locals.chatrooms;

    allrooms.push({
        room: 'Good Food',
        roomID: '0001',
        users : []
    });

    allrooms.push({
            room: 'Cloud Computing',
            roomID: '0002',
            users : []
        });

    io.of('/roomslist').on('connection', socket => {
        socket.on('getRoomsList', () => {
            socket.emit('chatRoomsList', JSON.stringify(allrooms));
        });
        socket.on('createChatRoom', newRoomName => {
            if(!helper.findRoomByName(allrooms,newRoomName)){
                allrooms.push({
                    room: newRoomName,
                    roomID: helper.randomHex(),
                    users: []
                });
                //emit to creator
                socket.emit('chatRoomsList', JSON.stringify(allrooms));
                //emit to all users
                socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
            }
        })
    })
}
