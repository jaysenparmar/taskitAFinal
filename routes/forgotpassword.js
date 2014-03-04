// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    console.log('Rendering forgot password');
	res.render('forgotpassword');
};

exports.fogotpass = function(req, res){
    var useremail = req.query.email;
    var found = false;
    console.log(useremail);
    
    for(var i = 0; i < data.Group.length; i++){
        for(var j = 0; j < data.Group[i].Members.length; j++){
            if(data.Group[i].Members[j].email == useremail){
                found = true;
                console.log("We found him, sending email");                
            }//end if
        }//end j
    }///end i
    
    console.log("Return home");
    res.render('index');
}