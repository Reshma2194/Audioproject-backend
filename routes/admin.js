let express = require("express");
let bodyparser = require("body-parser");
let Admin = require("../models/Admin");
let File = require("../models/File");
let router = express.Router();

router.post("/login", async(req, res)=>{
    try{
        let body = req.body;
        let admin = await Admin.findOne({username:body.data.username});
        if(admin == null)
        {
            res.end(JSON.stringify({status:"failed", data:"Username doesn't exist"}));
        }
        else{
            if(admin.password == body.data.password){
                res.end(JSON.stringify({status:"success", data:admin}));
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


router.get("/files", async(req, res)=>{
    try{
        let files = await File.find();
        res.end(JSON.stringify({status:"success", data:files}));
    }    
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
    }
});

router.get("/file/:id", async(req, res)=>{
    try{
        let file = await File.findById(req.params.id);
        res.end(JSON.stringify({status:"success", data:file}));
    }    
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
    }
});

router.post("/rating", async(req, res)=>{
    try{
        let body = req.body;
        let file = await File.findById(body.data.id);
        file.rating = body.data.rating;
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