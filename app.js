const express= require('express');
const Blog= require('./models/Blog');
const env=require('dotenv').config();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bodyParser=require('body-parser');


const app= express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

//CREATE A DATABASE VARIABLE
const db= process.env.DATABASE_URL;

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
        console.log(docx)
        res.status(200).json(docx)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json(err)
    })
})


//CREATE AN INDIVIDUAL ROUTE
app.get('/blog/:id',(req,res)=>{
    const id= req.params.id;
    Blog.findById(id)
    .then((result)=>{
        console.log(result);
        res.status(201).json(result)
    })
})

//UPDATE AN ARTICLE
    app.put('/blog/update/:id',(req,res)=>{
        const id= req.params.id;
        Blog.findByIdAndUpdate(id,req.body,{
            new:true
        })
        .then((updatedBlog)=>{
            console.log(updatedBlog + ' has been updated');
            res.status(201).json(updatedBlog + ' has been updated')
        })
        .catch((err)=>{
            console.log(err);
            res.status(err)
        })
    })

//DELETE AN ARTICLE
    app.delete('/blog/delete/:id',(req,res)=>{
        const id= req.params.id;
        Blog.findByIdAndDelete(id)
        .then((results)=>{
            console.log(results+' has been deleted');
            res.status(201).json(results+' has been deleted');
        })
    })


app.listen(process.env.PORT_NUMBER,()=>{
    console.log('Server is running')
})
