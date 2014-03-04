var data = require('../data.json');


//CORNER CASES _ duplicates Need confirmation

exports.view = function(req, res){
	res.render('remove', data);
}


