

//                  Script is divided into sections                    //



// ******************************************************************* //
//                                                                     //
//               Core functionality delivery section                   //
//                                                                     //
// ******************************************************************* //


var express = require('express')();
var cors = require('cors');
express.use(cors());
var server = require('http').Server(express);
var io = require('socket.io')(server);
server.listen(60808);
var active_hosts = [];



// ******************************************************************* //
//                                                                     //
//             Elasticsearch Cluster configuration section             //
//                                                                     //
// ******************************************************************* //


// Establishing ES cluster connection
const db_address = "http://elasticsearch:9200";
// const db_address = "https://ws.techbranch.net/es/";
var elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({
    host: db_address //,
    // log: 'trace'      // leaves very verbose logs of cluster operations
});

// Inspecting ES cluster ability to serve
// Measuring response time
esClient.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('Elastic cluster is all well');
    }
});

// Checking if required index is available
esClient.indices.create({
    index: 'utils'
},function(err,resp,status) {
    if(err) {
        console.log("All clear, index -utils- is probably already created");
    }
    else {
        console.log("Created index -utils- ",resp);
    }
});





// ******************************************************************* //
//                                                                     //
//           WebSocket configuration and preparation section           //
//                                                                     //
// ******************************************************************* //


// SOCKET.IO
express.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log("New connection");

    socket.on('change_frequency', function (data) {
        console.log("Changing frequency to "+data.interval+"ms");
        io.emit("pkg_freq", data);
    });
    
    socket.on('who_is_active', function () {
        console.log("Returning active hosts ");
        io.emit("active_is", active_hosts);
    });

    socket.on('message', function (data) {
        console.log("\nbroadcasting pkg to clients");
        socket.broadcast.emit("package", data);
        console.log("saving pkg in ES");
        esClient.index({
          index: 'utils',
          type: 'default',
          body: data
        },function (error) {
            if (error){
                console.log("error occurred while posting pkg to ES")
            }
        });
    });

    socket.on('identification', function (data) {
        console.log("New identification");
        console.log(socket.id+" identified as "+data.hostname);
        var socketid = (socket.id).toString();
        var dat = {"socket": socketid, "name": data.hostname};
        active_hosts.push(dat);
    });

    socket.on("disconnect", function () {
        var socketid = (socket.id).toString();
        console.log(socketid+" disconnected");
        for (var i=0; i<active_hosts.length; ++i){
            if (active_hosts[i].socket == socketid){
                active_hosts.splice(i,1)
            }
        }
    });
});
