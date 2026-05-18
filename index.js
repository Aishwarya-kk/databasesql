const express=require("express");
const app=express();
const port=3030;
const path=require("path");
const mysql=require("mysql2");

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"parent",
    password:"shalini"

});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));



app.listen(port,()=>{
    console.log(`server ${port} is working`);
})

app.get("/",(req,res)=>{
    res.send("server is working");
})

app.get("/user",(req,res)=>{
    const q="SELECT * FROM parent";
    connection.query(q,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).sned("database error");
        }
        console.log(result);
      res.render("home.ejs",{result});  
    });
    
})