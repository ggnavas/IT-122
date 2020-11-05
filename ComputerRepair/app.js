/*
Making important files/packages imports that will be useful while creating the project
*/
var express=require('express');
var path=require('path');             
var bodyParser=require('body-parser');
var nodemailer=require('nodemailer');

var app = express();         // initialising the app

app.set('views',path.join(__dirname,'views')); // going to directory whose name is views
app.set('view engine','jade');// The jade engine will now process the jade file in views directory

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',function(req,res){ // When the user asks for the request which includeds the '/' path we render the following request:-
	res.render('index',{title:'Computer Not Working'});
});

app.get('/about',function(req,res){ // When the user asks for the request which includeds the '/' path we render the following request:-
	res.render('about');
});

app.get('/contact',function(req,res){ // When the user asks for the request which includeds the '/' path we render the following request:-
	res.render('contact');
});

app.get('/virus-removal',function(req,res){ // When the user asks for the request which includeds the '/' path we render the following request:-
	res.render('virus-removal');
});

app.get('/software-issues',function(req,res){ // When the user asks for the request which includeds the '/' path we render the following request:-
	res.render('software-issues');
});

app.get('/hardware-issues',function(req,res){ // When the user asks for the request which includeds the '/' path we render the following request:-
	res.render('hardware-issues');
});


app.post('/contact/send',function(req,res){ // When the user asks for the request which includeds the '/' path we render the following request:-
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'person@gmail.com',
			pass: 'password',
		}
	});

	var mailOptions={
		from:'person <person@gmail.com>',
		to: 'friend_of_person@gmail.com',
		subject:'Website Submission',
		text:'You have a submission with the following details...Name:'+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li></ul><li><ul>'+req.body.message+'</ul></li>'
	};

	transporter.sendMail(mailOptions,function(error,info){
		if(error) {
			console.log(error);
			res.redirect('/');
		}	

		else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}

	});

});


app.listen(3000); // The port on which the website is running
console.log("Server is running on Port:3000");
