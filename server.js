const express = require('express');
const cors = require('cors')



const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const STATIC_CHANNELS = [{
    name: 'General',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'H.S.',
    participants: 0,
    id: 2,
    sockets: []
}];

const server = express()
    .use(cors({origin: "*"}))
    .use((req, res) => {
        switch (req.url) {
            case '/getChannels':
            res.json({
                channels: STATIC_CHANNELS
            })
            break
        }
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });
    socket.on('send-message', message => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });
});
