const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT
const cors = require('cors')

const data = require('./data.json')

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

app.get('/', (req, res) => {

    let blogs = data.blogs
    let featuredBig = blogs.filter(blog => blog.featured === "big")[0]
    let featuredSmall = blogs.filter(blog => blog.featured === "small")
    let breaking = blogs.filter(blog => blog._id === "blog05a")[0]

    let responseData = {
        tab_title: "Home", 
        blogs,
        featuredBig,
        featuredSmall,
        breaking
    }

    res.render('home', responseData)
})

app.get('/:id', (req, res) => {
    let blogs = data.blogs
    let clickedBlog = blogs.filter(blog => blog._id === req.params.id)[0]
    res.render('post', {
        tab_title: clickedBlog.title,
        clickedBlog
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})