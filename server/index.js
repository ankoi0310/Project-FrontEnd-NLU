import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const port = 2001;
const server = http.createServer(express());
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {

    console.log('New connection open!');

    ws.on('message', function(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })

    ws.on('close', function() {
        console.log(`Connection closed!`);
    })
})

server.listen(port, function(err) {
    if (err) {
        throw err;
    }
    console.log(`Server is listening on port ${port}!`);
})
