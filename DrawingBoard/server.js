
/* 
   getting code of express and socket 
*/

const express = require('express');
const socket=require('socket.io');

/*
  it returns a function
  if we run this app then app gets initialaized 
  server ready using this
*/
const app=express();

app.use(express.static("public"));

let port=process.env.PORT || 3000;
let server=app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})


/* 
  sending instance of server to the socket 
  for creating a connection 
*/

let io=socket(server);
io.on('connection',(socket)=>{
    console.log('made socket connection ');
  
    // to identify if the data has come or not
    // add listener for beginpath as soon as beginPath function is called then it will call this listenr
    // data from frontend that we received.
    socket.on('beginPath',(data)=>{
        // transfer the data received when beginPath function is called 
        // transfer to all the computers connected to this server using socket
        io.sockets.emit('beginPath',data);
    })
    // send all the data to all computers
    socket.on('drawStroke',(data)=>{
        io.sockets.emit('drawStroke',data);
    })
    // when we receive redoUndo operation from frontend
    socket.on('redoUndo',(data)=>{
        io.sockets.emit('redoUndo',data);
    })
})