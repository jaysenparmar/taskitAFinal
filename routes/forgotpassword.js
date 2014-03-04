var nodemailer = require("nodemailer");
var data = require('../data.json');

exports.view = function(req, res){
    console.log('Rendering forgot password');
	res.render('forgotpassword');
};

exports.fogotpass = function(req, res){
    
    
    console.log("Return home");
    res.render('index');
}

exports.forgotpass = function (req,res) {

var useremail = req.query.email;
var userpassword;
    
    var found = false;
    console.log(useremail);
    
    for(var i = 0; i < data.Group.length; i++){
        for(var j = 0; j < data.Group[i].Members.length; j++){
            if(data.Group[i].Members[j].email == useremail){
                found = true;
                console.log("We found him, sending email");  
                userpassword = data.Group[i].Members[j].password;
            }//end if
        }//end j
    }///end i
            
    // create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "taskitapplication@gmail.com",
        pass: "groupgroup"
    }
});


// setup e-mail data with unicode symbols
var mailOptions = {
    
    
    from: "TaskIt <taskitapplication@gmail.com>", // sender address
    to: useremail, // list of receivers
    subject: "Hello", // Subject line
    text: "Join our App", // plaintext body
    html: "<b>Hello, your password is " + userpassword + "." // html body

}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
        res.render('index');
    }
    
    

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
};