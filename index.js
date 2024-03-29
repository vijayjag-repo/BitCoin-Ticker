//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  var crypto = req.body.crypto;
  var fiat = req.body.currencies;
  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+crypto+fiat,function(error,response,body){
    var data = JSON.parse(body);
    var price = data.last;
    var date = data.display_timestamp;
    console.log(price);
    res.write("<p><h1>Current Date is "+date+"<h1></p>");
    res.write("<h1>Current price of "+crypto+" is "+price+" in "+fiat+"</h1>");
    res.send();
  });

});
app.listen(3000,function(){
  console.log("Server Running");
});
