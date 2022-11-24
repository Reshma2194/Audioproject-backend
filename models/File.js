let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        name:{type:String, required:true},
        filename:{type:String, required:true},
        rating:{type:Number},
    }
);
let File = mongoose.model("files", schema);
module.exports = File;