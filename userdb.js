var userhash = { };
var next_anonymous = 1; 

var add_user = function(id, user) {
    if (userhash[id] === undefined) {
        if (!user) {
            user = "anonymous" + next_anonymous;
            next_anonymous += 1;
        }
        userhash[id] = {
            'id': id,
            'user': user,
            'latency_results': []
        };
    }
    return userhash[id];
};
exports.add_user = add_user;

exports.get_user_name = function(id) {
    if (userhash[id] === undefined) {
        add_user(id, undefined);
    }
    return userhash[id].user;
};

exports.add_latency = function(id,rtt) {
    var user = userhash[id];
    var idx = user.latency_results.length;
    user.latency_results[idx] = rtt;
    return user.latency_results;
};

exports.return_latency = function(id) {
    var user = userhash[id];
    var idx = user.latency_results.length; 
    if (idx == 0) {
        return "Have not tested yet."
    }
    return user.latency_results[idx-1];
}

