var myapp = (function(){
	var socket;

	var initPing = function() {
		socket = io.connect();
		var aveRTT = 0;
		socket.on('pong', function(data) {
        	var rtt = Date.now() - data.timestamp;
        	console.log("Ping RTT (milliseconds): " + rtt);
			console.log("Dat seq: " + data.seq);
			data.seq--;

			if (data.seq >= 1) {
				socket.emit('ping', {timestamp: Date.now(),seq: data.seq});
			}

			aveRTT += rtt;
			console.log(aveRTT);
			console.log(data.seq);

			if (data.seq == 0) {
				aveRTT = aveRTT/5;
				console.log("Final aveRTT: ",aveRTT);
				socket.emit('result', {finalRTT: aveRTT});
				aveRTT = 0;
				//location.reload();
			}

        });
	}

    var start_ping = function() {
    	socket.emit('ping', {timestamp: Date.now(),seq: 5});
    };

    return {
        init: function() {
            console.log("Client-side app starting up");
            jQuery("#startping").click(start_ping);
			initPing();
        }
    }
})();
jQuery(myapp.init);

