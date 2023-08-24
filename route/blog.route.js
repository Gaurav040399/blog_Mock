const express = require("express");
const { Blog } = require("../model/blog.model");
const { auth } = require("../middleware/auth");
const blogRoute = express.Router();
// blogRoute.use(auth)
blogRoute.get("/",async(req,res)=>{
    try {
        let blogs = await Blog.find()
        res.status(200).send({msg:"All Blogs",blogs:blogs})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// filter the blogs based title
blogRoute.get("/",async(req,res)=>{
    try {
      const {title} = req.query;

      const data = await Blog.find({title:{$regex:title,$options:"i"}})
      res.status(200).send({msg:`All ${title} of data`, data:data});
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// filter the blogs based category
blogRoute.get("/",async(req,res)=>{
    try {
        const {category} = req.query;
        const data = await Blog.find({category:{$regex:category,$options:"i"}})
        res.status(200).send({msg:`All ${title} of data`, data:data});
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// sort base on date
blogRoute.get("/",async(req,res)=>{
    try {
        const {sort,order} = req.query;

        if(order == "asc"){
            const data = await Blog.find().sort({date:1})
            res.status(200).send({msg:"All Data in Ascending Order", data:data})
        }else{
            const data = await Blog.find().sort({date:-1})
            res.status(200).send({msg:"All Data in Descending Order", data:data})
        }
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// Post method for creating blogs
blogRoute.post("/",async(req,res)=>{
    // console.log({...req.body})
    try {
            let data = new Blog({...req.body});
        await data.save();
        console.log(data)
        res.status(200).send({msg:"New Blog Created", blog:data})       
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
    
})

// Update blog by it's id
blogRoute.patch("/:id",async(req,res)=>{
    try {
      const {id}= req.params;

      const data = await Blog.findByIdAndUpdate({_id:id},{...req.body});
      res.status(200).send({msg:"Blog Update Successfully",data:data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// delete blog by it's id
blogRoute.delete("/:id",async(req,res)=>{
    try {
        const {id}= req.params;
        const data = await Blog.findByIdAndDelete({_id:id});
        res.status(200).send({msg:"Blog Delete Successfully",data:data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// update likes
blogRoute.patch("/:id/like",async(req,res)=>{
    try {
        const {id}= req.params;
        const data = await Blog.findById({_id:id},{likes:likes+1})
        res.status(200).send({msg:"Likes Update", data:data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

// updates comments
blogRoute.patch("/:id/comment",async(req,res)=>{
    try {
      const {id}= req.params;
      const {username,content} = req.body
      const data = await Blog.findByIdAndUpdate({_id:id},{$push:{comments:{username,content}}})
      res.status(200).send({msg:"Likes Update", data:data})
    } catch (error) {
        res.status(400).send({msg:"Something went wrong", error:error.message})
    }
})

module.exports = {blogRoute}