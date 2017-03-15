var fs = require('fs');

function readByLine(filename, callback) {
	var fd = fs.openSync(filename, 'r');
	var bufferSize = 1024;
	var buffer = new Buffer(bufferSize);

	var leftOver = '';
	var read, line, idxStart, idx;

	while ((read = fs.readSync(fd, buffer, 0, bufferSize, null)) !== 0) {
		leftOver += buffer.toString('utf8', 0, read);
		idxStart = 0;

		while ((idx = leftOver.indexOf("\n", idxStart)) !== -1) {
			line = leftOver.substring(idxStart, idx).trim();
			callback(line);
			idxStart = idx + 1;
		}

		leftOver = leftOver.substring(idxStart);
	}
}

var args = process.argv.slice(2);
var userSessions = {};

if (args.length == 0) {
	console.log("specify log to analyze");
	process.exit(1);
}

var filename = args[0];

var endUserSession = (date, sess) => {
	sess.duration = (date - sess.date) / 1000;
	var duration = new Date(null);
	duration.setSeconds(sess.duration);

	console.log(sess.dateStr, '\t', sess.user, duration.toISOString().substr(11, 8), '\t');
};

readByLine(filename, (line) => {
	if (line[0] == '<')
		line = line.substring(line.indexOf('>') + 1);

	var fields = line.split(' ');
	var vpnfields = fields[4]
		.replace(/\]$/, '')
		.replace(/^\[/, '')
		.split('][');

	if (vpnfields[2] === 'SSLTunnel') {
		var dateStr = fields.slice(0, 3).join(' ');
		var date = new Date(dateStr);
		var state = vpnfields[1];
		var user = vpnfields[3].replace(/^\@/, '');

		if (state === 'UP') {
			var sess = userSessions[user];
			if (sess) endUserSession(date, sess);

			userSessions[user] = {
				dateStr: dateStr,
				date: date,
				user: user,
				duration: null
			};
		} else if (state === 'DOWN') {
			var sess = userSessions[user];
			if (sess) endUserSession(date, sess);

			userSessions[user] = null;
		}
	}
});
