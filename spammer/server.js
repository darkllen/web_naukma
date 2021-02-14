var nodemailer = require('nodemailer');
function send_mail(mails, text) {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "498c9e645300e3",
      pass: "8ec58cca1c09c4"
    }
  });
  var mailOptions = {
    from: 'from@example.com',
    to: mails,
    subject: 'Spam',
    text: text
  };
  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });  
}

let express = require('express');
let pug = require('pug');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://root:example@localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
function add_email_to_mongo(name, surname, patronymic, email) {
  mongoClient.connect(function(err, client){
    var db = client.db("mails");
    var myobj = {first_name:name,patronymic_name:patronymic, last_name: surname, email:email };
    db.collection("Mymails").update({email:email}, myobj, {upsert: true}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
  })

}
function delete_mongo(email) {
  mongoClient.connect(function(err, client){
    var db = client.db("mails");
    var myquery = { email: email };
    db.collection("Mymails").deleteMany(myquery, function(err, res) {
        if (err) throw err;
        console.log("deleted");
    });
  })
}

let server=express();
server.set("view engine", "pug");
server.use(express.urlencoded());
server.use(express.json());
server.listen(8888);
console.log('Server is running on port 8888');

server.get('/', function(req, res){
  mongoClient.connect(function(err, client){
    const db = client.db("mails");
    db.collection("Mymails").find().toArray( function(err, mails) {
        if (err) {
          console.log(err)
        }
        db.collection("Myshemas").find().toArray( function(err, shemas) {
          if (err) {
            console.log(err)
          }
          res.render('table', {emails: mails, shemas:shemas}); 
        })
      })
    })
});

server.post('/send', function(req, res){
  mails = req.body['emails']
  text = req.body['text']
  send_mail(mails, text)
})

server.post('/add', function(req, res){
  console.log(req.body)
  if( req.body['email'] != ''){
    add_email_to_mongo(req.body['name'], req.body['surname'], req.body['p_name'], req.body['email'])
    res.redirect('http://localhost:8888/')
  }
})

server.post('/delete', function(req, res){
  console.log(req.body);
  delete_mongo(req.body['email']);
})