const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const mongoose =  require("mongoose");
const _ = require("lodash")
const date = require(__dirname+"/date.js")
const app = express();
app.use(bodyParser.urlencoded ({extended:true}))
app.use(express.static(__dirname+'/public'));
app.set('view engine', "ejs");


mongoose.connect("mongodb+srv://afsaradib786:RasBVfh5KcaAnxws@cluster0.ktocygs.mongodb.net/todolistDB")
 .then(function(rs){
   console.log("connected to mongodb server!!");
 }).catch(function(err){
  console.log("connection failed")
 })

 const itemsSchema =   {
  name:String
 }
   
 const Item = new mongoose.model("Item",itemsSchema);

 const item1 =  new Item({
   name:"Wlcome to todo list",
 })
  const item2 =  new Item({
  name:"start wrting from below",
})
  
const defaultItems = [item1];
 


app.get("/",function(req,res){
    const day = date.getDay();
    const onDate = date.getDate();


    
    
    Item.find({}).then(function(foundItems){
      if(foundItems.length==0){
        Item.insertMany(defaultItems).then(function(){console.log("documents inserted")})
 .catch(function(){console.log("insertion failed");})
      res.redirect("/")
      }else{
       res.render("list",{kindOfDay:day,onDate:onDate,listTitle:"Today",newListItems:foundItems})}
    })
})

const listSchema = {
  name: String,
  items: [itemsSchema]
}
const List = mongoose.model("List",listSchema)

app.post("/", async function(req,res){
  const addedIteam = req.body.newIteam;
  const listName = req.body.list;
   const item = new Item ({
     name:addedIteam
   });
 
   if(listName==="Today"){
   item.save();
    res.redirect("/")}else{
    List.findOne({name:listName}).then((foundList)=>{
     foundList.items.push(item);
     foundList.save()
     res.redirect("/"+listName)
    }).catch((err)=>{console.log(err);})
  }
 })


 app.post("/delete",function( req,res) {
  const checkedId = (req.body.checkbox);
  const listName = req.body.listName;
if(listName === "Today"){
    Item.findByIdAndRemove(checkedId).then(function(){
    console.log("deleted");
  res.redirect("/")
});
  
}else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id: checkedId}}}).catch(err);{
      res.redirect("/"+listName)
    }
}})


 
app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name:customListName}).then(function(foundList){
  if(!foundList){
   console.log("doest exist")
    const list = new List({
    name:customListName,
    items:defaultItems})
   list.save();
   console.log("created");
   res.redirect("/"+customListName) 
 }else{
   console.log("exist!!")
   const day = date.getDay();
   const onDate = date.getDate();
   res.render("list",{listTitle : foundList.name ,kindOfDay:day,onDate:onDate,newListItems:foundList.items})
 }
}) 
})

app.listen(3000,function(){
    console.log("your server is locally hosted on port 3000 ")
})




 
