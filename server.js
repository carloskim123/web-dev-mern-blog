const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/blog2?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log("Connected to MongoDB")).catch(err => console.log("Failed to connect to MongoDB:", err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'asc' })
    res.render("articles/index", { articles: articles })
})
app.use("/articles/", articleRouter)


app.listen(5000, () => console.log("Server running on: 5000"))