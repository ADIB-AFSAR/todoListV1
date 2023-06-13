const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs")
const date = require(__dirname+"/date.js")

const app = express();
app.use(bodyParser.urlencoded ({extended:true}))
app.use(express.static(__dirname+'/public'));
app.set('view engine', "ejs");


const iteams = ["Self Shopping"];
app.get("/",function(req,res){
    const day = date.getDay();
    const onDate = date.getDate();
  res.render("list",{kindOfDay : day ,onDate : onDate, newListIteams: iteams})
})


app.post("/",function(req,res){
 const iteam = req.body.newIteam
 iteams.push(iteam) 
 res.redirect("/")
})







app.listen(3000,function(){
    console.log("your server is locally hosted on port 3000 ")
})