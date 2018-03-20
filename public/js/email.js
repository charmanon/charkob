var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'char.m.anon@gmail.com',
		pass: 'Cano941518'
	}
});

const mailOptions = {
	from: 'char.m.anon@gmail.com', // sender address
	to: 'sharloteean@gmail.com', // list of receivers
	subject: 'How are you', // Subject line
	html: '<p>Hey you!</p>' // plain text body
};

transporter.sendMail(mailOptions, function(err, info) {
	if (err) console.log(err);
	else console.log(info);
});
