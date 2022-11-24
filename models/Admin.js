let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        name:{type:String, required:true},
        username:{type:String, required:true},
        password:{type:String, required:true},
    }
);
let Admin = mongoose.model("admins", schema);
module.exports = Admin;