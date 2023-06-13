const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs")

const app = express();
app.use(bodyParser.urlencoded ({extended:true}))
app.use(express.static(__dirname+'/public'));
app.set('view engine', "ejs");
var iteams = ["Buy foods","Cook food","Eat food"];
app.get("/",function(req,res){
  var today = new Date()
  var option ={
    week : "long",
    day : "numeric",
    month : "long",
    year : "numeric"
  }
  var day = today.toLocaleDateString("en-us" , option)
  res.render("list",{kindOfDay : day , newListIteams: iteams})
})


app.post("/",function(req,res){
//  console.log(req.body.newIteam)
 var iteam = req.body.newIteam
 iteams.push(iteam) 
 res.redirect("/")
})







app.listen(3000,function(){
    console.log("your server is locally hosted on port 3000 ")
})