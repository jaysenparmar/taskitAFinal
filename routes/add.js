var data = require('../data.json');


//CORNER CASES _ duplicates Need confirmation

exports.view = function(req, res){
    
    req.session.userID;
    
   // console.log(req.session.userID);
	res.render('add', data.Group[req.session.groupID]);
}




