var socket = require('socket.io-client')('https://example.com/');
socket.on('connect', function(){
    // var nr = 1;
	console.log("connected");
	console.log("not identifying due to listener-role connection");
    console.log("changing package emission frequency");
    socket.emit("change_frequency", {'interval': 2000});
    // socket.on("package", function (data) {
    //     console.log("received package "+nr+" from "+data.hostname);
    //     nr+=1;
    // });
    // socket.on("active_is", function (data) {
    //     console.log("received active hosts intel");
    //     console.log(data);
    // });
    // console.log("asking who is active");
    // socket.emit("who_is_active");
});
