var userdb = require ('./userdb.js');

exports.index = function (req, res) {
    var username = userdb.get_user_name(req.session.id);
	if (req.user) {
		var new_name = req.user.emails[0].value;
		userdb.change_user(req.session.id,new_name);
		username = new_name;
	}
    res.render('index', {title: "Speed tests", message: "Hello, world", user: username})};

exports.tests = function (req, res) {
    var username = userdb.get_user_name(req.session.id);
    res.render('tests', {title: "Speed tests", message: "Hello, world", user: username})};
