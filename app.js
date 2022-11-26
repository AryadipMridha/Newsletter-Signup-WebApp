var http = require('http');
const express=require("express");
const bodyParser = require('body-parser');
const request=require("request");
const client=require("@mailchimp/mailchimp_marketing");

const port=process.env.PORT || 3000


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));



app.get("/",function(req, res) {
    res.sendFile(__dirname+"/signup.html");    
});

app.post("/",function(req,res){
    const fname=req.body.FirstName;
    const lname=req.body.LastName;
    const email=req.body.MailId;
    console.log(fname,lname,email)

    const data=[{ 
        email_address:email, 
        status:"subscribed", 
        merge_fields:{ 
            FNAME:fname, 
            LNAME:lname
        }
      }]   
      const run = async () => {  
        
       try {
        const response = await client.lists.batchListMembers("e012398973", 
        {members: data});        
        console.log(res.statusCode);
        res.sendFile(__dirname+"/success.html"); 
        
        }   
        
        catch (error) {
        res.sendFile(__dirname+"/failure.html");       
        console.log(error);       
        }
        
        };
        run()
      });
       
      app.post("/success",function(req,res){
        res.redirect("/");
      })
      
     

           
        

app.listen (port,()=>{
    console.log("Listeneing to port "+port);
})


client.setConfig({
  apiKey: "51e19115d4c7c4ea18a1852ea48d00d0-us21", //"YOUR_API_KEY",
  server: "us21"   //"YOUR_SERVER_PREFIX",
});





// apiKey=51e19115d4c7c4ea18a1852ea48d00d0-us21
//list id e012398973