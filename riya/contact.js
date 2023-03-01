var express = require('express');
var app = express();
var path = require('path');
const mongoose=require("mongoose")
const validator=require("validator");
const bodyParser=require('body-parser');
var staticpath = path.join(__dirname, '/');
console.log(__dirname);
mongoose.connect("mongodb://localhost:27017/gym",{useNewUrlParser:true,useUnifiedTopology:true }).then(() => console.log("coonection successful party")).catch((err) => console.log(err));
app.use('/', express.static(staticpath));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/contact',function(req,res){
res.sendFile(path.join(staticpath,'contact.html'));
})

const ad=path.join(staticpath,'contact.html');

const data = mongoose.Schema({
    name:{
        type:String,require:true
        
    },
    email:{
        type:String,require:true
        
    },
    subject:{
      type:String,
    },message:{
     type:String
    }
})

const Data =  mongoose.model("Data",data); 

app.post("/contact/post", function(req,res) {
  let newd=new Data({
      name:req.body.name,
      email:req.body.email,
      subject:req.body.subject,
      message:req.body.message  });
  newd.save();
  res.redirect('/') ;

})

app.listen(2010,() => {console.log("port 2010");})