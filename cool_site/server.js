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
    from: 'books_no_reply@com.ua',
    to: mails,
    subject: 'Confirmation',
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



const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://root:example@localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

function add_request_to_mongo(object) {
  mongoClient.connect(function(err, client){
    var db = client.db("cool_site");
    db.collection("requests").insertOne(object, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
  })
}
function add_book_to_mongo(object) {
    mongoClient.connect(function(err, client){
      var db = client.db("cool_site");
      db.collection("books").insertOne(object, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
      });
    })
}
function delete_mongo(id) {
  mongoClient.connect(function(err, client){
    var db = client.db("cool_site");
    var myquery = { _id: new mongodb.ObjectID(id) };
    db.collection("requests").deleteOne(myquery, function(err, res) {
        if (err) throw err;
        console.log("deleted");
    });
  })
}

process.env.PWD = process.cwd()
let express = require('express');
let pug = require('pug');
let server=express();
server.use(express.static(process.env.PWD + '/public'));
server.set("view engine", "pug");
server.use(express.urlencoded());
server.use(express.json());
server.listen(8888);
console.log('Server is running on port 8888');

const path = require('path')
const i18n = require('i18n')
i18n.configure({
  locales: ['en', 'ukr'],
  directory: path.join(__dirname, 'locales'),
  register: global

})
i18n.setLocale('en')

const fs = require('fs');



server.get(['/main','/'], function(req, res){
  let config = JSON.parse(fs.readFileSync('config.json'));
  lang = req.query['lng']
  if (lang != 'en' && lang != 'ukr') {i18n.setLocale('en')} else {i18n.setLocale(lang)}
  res.render('main', {config:config}); 
});

server.get(['/aboutus'], function(req, res){
  let config = JSON.parse(fs.readFileSync('config.json'));
  lang = req.query['lng']
  if (lang != 'en' && lang != 'ukr') {i18n.setLocale('en')} else {i18n.setLocale(lang)}
  res.render('aboutus', {config:config}); 
});


server.get(['/books'], function(req, res){
  mongoClient.connect(function(err, client){
    const db = client.db("cool_site");
    db.collection("books").find().toArray( function(err, books) {
        if (err) {
          console.log(err)
        }
        let config = JSON.parse(fs.readFileSync('config.json'));
        lang = req.query['lng']
        if (lang != 'en' && lang != 'ukr') {i18n.setLocale('en')} else {i18n.setLocale(lang)}

        if (lang=='ukr')
          books.forEach(x=> {x['title']=x['title_ukr']; x['short_info']=x['short_info_ukr']; x['full_info']=x['full_info_ukr']})
        res.render('books', {config:config, books:books});
      })
    })


});

server.get(['/admin'], function(req, res){
  mongoClient.connect(function(err, client){
    const db = client.db("cool_site");
    db.collection("requests").find().toArray( function(err, requests) {
        if (err) {
          console.log(err)
        }
        let config = JSON.parse(fs.readFileSync('config.json'));
        lang = req.query['lng']
        if (lang != 'en' && lang != 'ukr') {i18n.setLocale('en')} else {i18n.setLocale(lang)}
        console.log(requests)
        res.render('admin', {config:config, requests:requests});
      })
    })

});

server.post('/send_text', function(req, res){
  add_request_to_mongo(req.body);
})

var base64js = require('base64-js')
server.post('/send_mail', function(req, res){
  data = (Base64Encode(JSON.stringify(req.body)));
  url_send = 'http://localhost:8888/confirm_message?data='+data;
  send_mail(req.body.email, url_send)
})

server.get('/confirm_message', function(req, res){
  let config = JSON.parse(fs.readFileSync('config.json'));
  console.log(req.query.data)
  data = (Base64Decode(req.query.data));
  data = JSON.parse(data);
  add_request_to_mongo(data);
  res.render('main', {config:config, alert:true})
})

server.post('/add_book', function(req, res){
  add_book_to_mongo(req.body);
})

server.post('/delete_request', function(req, res){
  delete_mongo(req.body['id']);
})


function Base64Encode(str, encoding = 'utf-8') {
  var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);
  return base64js.fromByteArray(bytes);
}

function Base64Decode(str, encoding = 'utf-8') {
  var bytes = base64js.toByteArray(str);
  return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
}