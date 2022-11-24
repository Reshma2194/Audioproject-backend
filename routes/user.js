let express = require("express");
let bodyparser = require("body-parser");
let User = require("../models/User");
let File = require("../models/File");
let router = express.Router();
let fs = require("fs");

router.post("/login", async(req, res)=>{
    try{
        let body = req.body;
        let user = await User.findOne({username:body.data.username});
        if(user == null)
        {
            res.end(JSON.stringify({status:"failed", data:"Username doesn't exist"}));
        }
        else{
            if(user.password == body.data.password){
                res.end(JSON.stringify({status:"success", data:user}));
            }
            else{
                res.end(JSON.stringify({status:"failed", data:"Invalid password"})); 
            }
        }
    }    
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
    }
});


router.post("/upload", async(req, res)=>{
    try{
        let body = req.body;        
        let base64 = body.data.audio.replace(/^data:audio\/mpeg;base64,/, "");
        filename = "audiofiles/" + Math.random().toString(36).substring(2, 7) + ".mp3";
        fs.writeFile("public/" + filename, base64, 'base64', function (err) {            
        });
        let file = new File(
            {
                name:body.data.name,
                filename:filename,
                rating:0
            }
        )
        file.save().then((result)=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, (err)=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        })
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
    }
});


module.exports = router;