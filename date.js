 exports.getDate = function(){
    let today = new Date()
    let options ={
    month : "long",
    day : "numeric"
    
  }
     return day = today.toLocaleDateString("en-us" , options)
 
}


exports.getDay = function(){
    let today = new Date()
    let options ={
     weekday : "long",
  }
     return day = today.toLocaleDateString("en-us" , options)
 
}