exports.ping = function(req) {
    // req is https://github.com/techpines/express.io/tree/master/lib#socketrequest
    console.log("Got ping socket.io callback");
    req.io.emit('pong', req.data);
};

exports.result = function(req) {
    console.log("Got the average RTT");
    var userdb = require('./userdb.js');
    var id = req.session.id;
    var username = userdb.get_user_name(id);
    var latencyTest = userdb.add_latency(id,req.data.finalRTT);
    console.log(username);
    console.log(latencyTest);
};

