var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(`New connection ${socket.id}`);

    // Listening for chat event
    socket.on('chat', function(data){
        // console.log('chat event trigged at server');
        // console.log('need to notify all the clients about this event');
        io.sockets.emit('chat', data);
    });

    // Listening for typing event
    socket.on('typing', function(data){
        // console.log(`Server received ${data} is typing`);
        // console.log('need to inform all the clients about this');
        io.sockets.emit('typing', data);
        //socket.broadcast.emit('typing', data);
    });

    // Listening for disconnection event
    socket.on('exit', function(data){
        console.log(`${socket.id} disconnected.`);
        io.sockets.emit('exit', data);
        socket.disconnect();
    })

})

server.listen(3000, () => {
    console.log('Socket.io server is listening on port 3000');
})