exports.ping = function(req) {
    // req is https://github.com/techpines/express.io/tree/master/lib#socketrequest
    console.log("Got ping socket.io callback");
    req.io.emit('pong', req.data);
};

exports.result = function(req) {
    var userdb = require('./userdb.js');
    var id = req.session.id;
    userdb.add_latency(id,req.data.finalRTT);
};

