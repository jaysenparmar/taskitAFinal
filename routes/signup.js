// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
    //console.log('Rendering signup');
	res.render('signup');
};

exports.signup = function(req,res){
    //console.log("Signing Up");

    var username = req.query.name;
    var useremail = req.query.email;
    var userpw = req.query.password;
    var vuserpw = req.query.vpassword;
    var grname = req.query.gname;
    var grpw = req.query.gpassword;
    var vgrpw = req.query.vgpassword;
    console.log("Name: " + username + " Email: " + useremail + " Pass: " + userpw + " vPass " + vuserpw + " GName: " + grname +  " GPass: " + grpw + " vGPass: " + vgrpw);
    
    var uadded = false;
    var gadded = false;
    
    if(userpw == vuserpw && grpw == vgrpw){
        
        var newUser = {
            "id": 0, 
            "name": username,
            "email": useremail,
            "password": userpw,
                "Tasks": [
                        //Check if tasks are added correctly to new user
                ]
        }
      //} Check here for errors

        var newGroup = { 
            "groupname": grname,
            "grouppassword": grpw,
                "Members":[
                    newUser
                ]
        }


    for(var i = 0; i < data.Group.length; i++){
        var atEndOfMembers = data.Group[i].Members.length;
        //var atEndOfGroups = data.Group[i].length;
        console.log("Members's length: " + atEndOfMembers);
        //console.log("Group length: " + atEndOfGroups);
            //Groupname already exists
            if(data.Group[i].groupname == grname && data.Group[i].grouppassword == grpw){
                console.log("Ready to push newUser to existing Group");
                uadded = true;
                data.Group[i].Members.push(newUser); //may need to find end of Members
                newUser.id = atEndOfMembers;
                if(uadded){
                    console.log("Added new user with following details: " + data.Group[0].Members);
                    console.log(data.Group[0].Members);
                    res.render('index.handlebars');
                  }
            }
            else if(!uadded){ //New Group name created
                console.log("Ready to push newUser to a new Group");
                gadded = true;
                data.Group.push(newGroup);
                if(gadded){
                   // console.log("Added new group with following details: " + data.Group[2].groupname);
                    res.render('index.handlebars');
                }
            }
            else{
                console.log("Something went terribly wrong! Returning to Login Page");
                res.render('index.handlebars');
            }
        
            if(uadded || gadded){
                break;
            }
    }//end i
    }
    else{
        console.log("Please check the passwords and try again");
        res.render('signup');
    }
}