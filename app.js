const express= require('express');
const Blog= require('./models/Blog');
const multer= require('multer');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bodyParser=require('body-parser');


const app= express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

//CREATE A DATABASE VARIABLE
const db= 'mongodb://localhost:27017/blogs';

//CONNECT DATABASE 
mongoose.connect(db,{useNewUrlParser: true,
    useUnifiedTopology: true}).then(()=>{
    console.log('Server has connected to the database succesfully')
})
.catch((err)=>{
    console.log(err)
})

  


    

//SHOW OR DISPLAY BLOGS
app.get('/blogs',(req,res)=>{
    Blog.find().then((blogs)=>{
        console.log(blogs)
        res.status(200).json(blogs)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json(err)
    })
});

//CREATE A NEW BLOG POST
app.post('/new-blog',(req,res)=>{
    console.log(req)
    const newBlog=new Blog({
        title: req.body.title,
        content: req.body.content,
    })
    newBlog.save().then((docx)=>{
        res.status(200).json(docx)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})


//CREATE AN INDIVIDUAL ROUTE
app.get('/blog/:id',(req,res)=>{
    const id= req.params;
    console.log('Hello');
    res.status(200).json(id)
})
//UPDATE AN ARTICLE

//DELETE AN ARTICLE
app.listen('5000',()=>{
    console.log('Server is running')
})
