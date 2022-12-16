const express = require("express");
const hbs = require('hbs');
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const port = 3000 || process.env.PORT;
require('dotenv').config();

// BodyParser
app.use(bodyParser.urlencoded({ extended : true }))

// Setting view engiine to hbs
app.set("view engine","hbs");

// Setting default views to templates
const templatePath = path.join(__dirname,"/templates/views");
app.set("views",templatePath);

// Partials 
const partialsPath = path.join(__dirname,"/templates/partials");
hbs.registerPartials(partialsPath);

// For static paths
const staticPath = path.join(__dirname,"public");
app.use(express.static(staticPath));
const staticImagePath = path.join(__dirname,"public/images");
app.use(express.static(staticImagePath));

// Routes
const routes = require("./server/routes/user");
app.use("/",routes)

// Database
const pool = mysql.createPool({
  connectionLimit : 100,
  host : process.env.DB_HOST,   
  user : process.env.DB_USER,  
  password : process.env.DB_PASS,   
  database : process.env.DB_NAME    
});

pool.getConnection((err,connection)=>{
  if(err) throw err;
  console.log("Connected as ID " + connection.threadId);
});

// var small_data = {
//   data: [
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "This awesom!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "This awesom!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "Nice!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "This awesom!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "Nice!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "This awesom!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "Nice!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "This awesom!!!" },
//       {url: "https://images.unsplash.com/photo-1670431757843-e8fd3f24490f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", content: "Nice!!!" },
//   ]
// };

app.get("/my-projects",(req,res)=>{
  res.render("projects",small_data)})

app.listen(port,()=>{
  console.log(`Listening to the port ${port}`);
});
