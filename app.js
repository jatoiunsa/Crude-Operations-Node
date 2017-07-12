var express=require('express'),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');


var app=express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var db=mongoose.connect('mongodb://localhost/BookAPI')

var books=require('./model/bookModel')

var port=process.env.PORT || 3000;


bookRouter=require('./Routes/bookRoutes')(books)



app.use('/api/books',bookRouter)

app.get('/',function(req,res){
    res.send('Welcome to my api')
})

app.listen(port,function(){
    console.log('Running on port: ' +port)
})