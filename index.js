const express = require("express");
require("dotenv").config()
const cors = require("cors")
const { connection } = require("./config/db");
const { userRoute } = require("./route/user.route");
const { blogRoute } = require("./route/blog.route");

const app= express()
app.use(express.json())
app.use(cors())

app.use("/api",userRoute)

app.use("/api/blogs",blogRoute)

app.listen(process.env.PORT || 4000, async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Your server is running at port ${process.env.PORT}`)
    } catch (error) {
        console.log("Cannot Connected to DB")
        console.log(error.message)
    }
})