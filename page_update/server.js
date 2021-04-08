let express = require('express');
let pug = require('pug');
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://root:example@localhost:27017/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

function add_paper_to_mongo(title, annotation, text) {
  mongoClient.connect(function(err, client){
    var db = client.db("news");
    var myobj = {title:title,annotation:annotation, text: text};
    db.collection("papers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
  })

}
let server=express();
server.set("view engine", "pug");
server.use(express.urlencoded());
server.use(express.json());
server.listen(8888);
console.log('Server is running on port 8888');

server.get('/client', function(req, res){
    res.render('client'); 
});

server.get('/admin', function(req, res){
    res.render('admin'); 
})

server.post('/add', function(req, res){
  if( req.body['title'] != '' && req.body['text']!= '' && req.body['annotation']!=''){
    add_paper_to_mongo(req.body['title'], req.body['annotation'], req.body['text'])
  }
  res.redirect('http://localhost:8888/admin')
})

server.get('/get_all_cards', function(req, res){
    mongoClient.connect(function(err, client){
        const db = client.db("news");
        db.collection("papers").find().toArray( function(err, news) {
            if (err) {
              console.log(err)
            }
            res.send(news);
          })
        })
    
})