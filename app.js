const express = require("express");
const hbs = require('hbs');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
// Setting view engiine to hbs
app.set("view engine","hbs");

mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.DB_LINK}`)
.then(() => console.log("Connected to atlas!!!"))
.catch((err) => console.log(err));

const userSchema = {
  name : String,
  email : String,
  msg : String
}

const user = mongoose.model("user",userSchema);

app.post("/",(req,res)=>{
    let newUser = new user({
      name : req.body.name,
      email : req.body.email,
      msg : req.body.msg
    })
    newUser.save();
    res.render("index");
})

// Setting default views to templates
const templatePath = path.join(__dirname,"/templates/views");
app.set("views",templatePath);

// Partials 
const partialsPath = path.join(__dirname,"/templates/partials");
hbs.registerPartials(partialsPath);

// For static paths
const staticPath = path.join(__dirname,"public");
app.use(express.static(staticPath));

// app.get("/index",(req,res)=>{
//        res.render("index");
// })



app.get("/my-projects",(req,res)=>{
  res.render("projects",small_data)})

  app.listen(6969,()=>{
    console.log("Running on 6969");
  })
