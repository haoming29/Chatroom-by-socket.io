var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000,function(){
    console.log("listening on port 3000");
});

var online_users = online_users[0];

io.on('connection', function(socket){
    var user_name = 'User';
    io.emit('connectivity', "A client connected.");
    online_users.push(socket.id);
    io.emit('user status',online_users);
    console.log("A client connected");

    socket.on('user name', function(name){
        user_name = name;
    });

    socket.on('disconnect',function(){
        io.emit('connectivity', user_name + " disconnected.");
        online_users.push.pop(socket.id);
        io.emit('user status',online_users);
        console.log(user_name + " is disconnected");
    });

    socket.on('chat message', function(msg){
        console.log('message from ' + user_name +': ' + msg);
        socket.broadcast.emit('chat message', msg,user_name);
    });

});