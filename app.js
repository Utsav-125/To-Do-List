const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items=["Buy Food", "Cook Food" , "Eat Food"];
let workItems=[];

app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("css"));

app.get("/", function (req, res) {
    let today= new Date();
    
    let options={
        weekday: "long", 
        day: "numeric",
        month: "long"
    };
    let day=today.toLocaleDateString("en-US", options);
    
    res.render("list",{ListTitle: day , newlistItems: items});
});

app.post("/",function(req,res){
    
    let item=req.body.newItem;
    if(req.body.list==="Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work",function(req,res){
    res.render("list",{ListTitle: "Work List", newlistItems: workItems});
});

app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});