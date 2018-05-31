var nodemailer = require('nodemailer');
var user = 'dastat.developers@gmail.com';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dastat.developers@gmail.com',
    pass: 'dastatt12'
  }
});
const mailOptions = {
  from: 'dastat.developers@gmail.com', // sender address
  to: 'mnmostafa.nasr@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
};
module.exports={
  sendmail(to,html){
    transporter.sendMail({
      from: 'dastat.developers@gmail.com',
      to: to,
      subject: 'Subject of your email',
      html: html
    },function(error, info){
      if (error) {
        console.log("error");
        console.log("hhhhhhhh"+error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
  }
  };
  /*
var handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./api/templates/'),
  extName: '.html'
};
*/
//smtpTransport.use('compile', hbs(handlebarsOptions));