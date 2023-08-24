const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    username:String,
    content:String
})
const blogSchema =  mongoose.Schema({
    username : String,
    title : String,
    content : String,
    category: {type:String,enum:["Business", "Tech", "Lifestyle","Entertainment"]},
    date : {type:Date, default:Date.now()},
    likes : Number,
    comments:[commentsSchema],
    userID : {type: mongoose.Schema.Types.ObjectId, ref:"user"}
})

const Blog = mongoose.model("blog", blogSchema);

module.exports = {Blog}

