var nodemailer = require("nodemailer");
var data = require('../data.json');

exports.view = function(req, res){
    //console.log('Rendering invitefriends');
	res.render('invitefriends');
};


exports.mail = function (req,res) {

var name1 = req.query.friend1name;    
var email1 = req.query.friend1email;
console.log("first email" + email1 + "first name" + name1);
            
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
    to: email1, // list of receivers
    subject: "Hello", // Subject line
    text: "Join our App", // plaintext body
    html: "<b>Hello " + name1 +", your friend has just sent you an invitation to join our app at taskitapplication.herokuapp.com.</b>" // html body

}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
        res.render('dashboard', data.Group[req.session.groupID]);
    }
    
    

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
};