const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://mongoadmin:secret@localhost:27888/";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true });
 
mongoClient.connect(function(err, client){
      
    var db = client.db("booksdb");
    var myobj = { name: "BookC", author: "AuthorC", year:2017 };
    db.collection("Mybooks").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
});