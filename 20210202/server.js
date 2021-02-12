let http = require('http');
let express = require('express');
let pug = require('pug');
let csv = require('csv-parser')
let fs = require('fs')

let server=express();
server.set("view engine", "pug");

server.listen(8888);
console.log('Server is running on port 8888');

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://mongoadmin:secret@localhost:27888/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

server.use('/', function(req, res){


    mongoClient.connect(function(err, client){
        const db = client.db("booksdb");
        db.collection("Mybooks").find().toArray( function(err, docs) {
            if (err) {
              // Reject the Promise with an error
              console.log(err)
            }
            res.render('table', {data: docs}); 
          })
        })
});