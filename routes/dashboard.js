// Get all of our friend data
var data = require('../data.json');
var fs = require('fs');

exports.view = function(req, res) { 
    /*
	if(!req.session.userID || req.session.userID == -1){
		res.render('./index');
	}*/
      //  var rmv = false;
        data.Group[req.session.groupID].viewAddLink = false;
        res.render('dashboard', data.Group[req.session.groupID]);
    
}

exports.viewAddLink = function(req, res) { 
    /*
	if(!req.session.userID || req.session.userID == -1){
		res.render('./index');
	}*/
      //  var rmv = false;
        data.Group[req.session.groupID].viewAddLink = true;
        res.render('dashboard', data.Group[req.session.groupID]);
    
}

exports.login = function(req,res){
    //console.log("Attempting to login");
	var user = req.query;
    
    var found = false; 
    for (var i = 0; i < data.Group.length; i++){
     //   console.log("1st for loop");
        for (var j = 0; j < data.Group[i].Members.length; j++){
           // console.log("2nd for loop");
            if(user.email == data.Group[i].Members[j].email && user.password == data.Group[i].Members[j].password) {
                //console.log(" " + user.email + data.Group[i].Members[j].email + user.password + data.Group[i].Members[j].password);
                req.session.userID = data.Group[i].Members[j].id;
                req.session.groupID = i;
                found = true;
              //  console.log("Rendering dashboard Grouppage");
                
                //Need to render dashboard page correctly with handlebars
                if(found){
                 /*    $('.invite').click(function(e){ 
                    ga("send","event","inviteFriends","click");
                    });*/
                res.render('dashboard', data.Group[req.session.groupID]);
                   
                    
                }
                break;
            }	
            if(found){
                break;
            }
        }
    }

    if(!found){
    console.log("Username or password not valid, please check and try again");
	res.render('index');
    }
}

exports.addTask = function(req, res) {
    
	var newTask = req.query.taskname;
	var userinfo = req.query.id;
    var found = false;
    var name = "";
    var usernum = userinfo[0];
    console.log("adding task");
    
    for(var k = 2; k < userinfo.length; k++){
        console.log(userinfo[k]);
        name = name + userinfo[k];
        console.log(name);
    }
    console.log("Chore = " + newTask + " Roomie = " + name + " num = " + usernum);
    
    for(var i = 0; i < data.Group.length; i++){
        for(var j = 0; j < data.Group[i].Members.length; j++){
            if(data.Group[i].Members[j].id == usernum && data.Group[i].Members[j].name == name) {
                found = true;
                
                var task = {
                    "Date": "", //Grab today's date and insert into DB
                    "taskid": data.Group[i].Members[j].Tasks.length,
                    "taskname": newTask,
                    "ownerid": usernum
                }
                
                data.Group[i].Members[j].Tasks.push(task);
                console.log(data.Group[i].Members[j].Tasks);
                if(found){
                res.render('dashboard', data.Group[req.session.groupID]);
                }
                break;
            }	
        }
    }
    
    if(!found){
        console.log("Could not add the selected task to the user's list, please try again");
        res.render('add');
    }
}

exports.removeTask = function(req, res) {

   // console.log("removeTask");
   // rmv = true;
  //  var name = req.query.taskname;
    var ownernum = req.query.ownerid;
	var tasknum = req.query.id;
    var oname = req.query.ownername;
    var hide = false;//thought, variable to hide remove button should be set once removeTask function is called
    
    //console.log("ownerid: " + ownernum + " taskid: " + tasknum + " ownername: " + oname);
    
    var found = false;
    
    for(var i = 0; i < data.Group.length; i ++){
        for(var k = 0; k < data.Group[i].Members.length; k++){
            for(var j = 0; j < data.Group[i].Members[k].Tasks.length; j++){
                //console.log("Before: " + data.Group[i].Members[k].Tasks[j].taskname);
                if(data.Group[i].Members[k].Tasks[j].taskid == tasknum && 
                   data.Group[i].Members[k].Tasks[j].ownerid == ownernum && 
                   data.Group[i].Members[k].Tasks[j].ownername == oname){
                        found = true;
                        hide = true;
                       // console.log("Removing task");
                        delete data.Group[i].Members[k].Tasks[j].taskname;
                        //console.log("After: " + data.Group[i].Members[k].Tasks[j].taskname);
                        res.render('dashboard', data.Group[req.session.groupID]);
                    
                }//end if
            } //end j        
        }//end k
    }//end i
    
    //console.log("Something went terribly wrong");
}

