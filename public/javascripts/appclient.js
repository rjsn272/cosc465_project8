var myapp = (function(){
	var socket;

	var initPing = function() {
		socket = io.connect();
		var aveRTT = 0;
		var displayLine;
		var testNo;
		socket.on('pong', function(data) {
        	var rtt = Date.now() - data.timestamp;
        	console.log("Ping RTT (milliseconds): " + rtt);
			console.log("Dat seq: " + data.seq);
			if (data.seq == 5) testNo = '1';
			else if (data.seq == 4) testNo = '2';
			else if (data.seq == 3) testNo = '3';
			else if (data.seq == 2) testNo = '4';
			else if (data.seq == 1) testNo = '5';

			displayLine = "Ping/Pong No. " + testNo + " Time: " + rtt + " milliseconds"
			testNo = '#test'+testNo; 
			jQuery(testNo).html(displayLine);
			data.seq--;

			if (data.seq >= 1) {
				socket.emit('ping', {timestamp: Date.now(),seq: data.seq});
			}

			aveRTT += rtt;

			if (data.seq == 0) {
				aveRTT = aveRTT/5;
				socket.emit('result', {finalRTT: aveRTT});
				displayLine = "Average RTT: " + aveRTT + " milliseconds"
				jQuery('#finaltest').html(displayLine);
				aveRTT = 0;
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

