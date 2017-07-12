/**
 * Created by fahar on 4/21/2017.
 */
var express=require('express');

var routes=function(books){

    var bookRouter=express.Router();
    bookRouter.route('/')
        .post(function(req,res){
            var book=new books(req.body)
            book.save()
            res.status(201).send(book)
        })
        .get(function(req,res){
            var query={}
            if(req.query.genre)
            {
                query.genre=req.query.genre
            }
            books.find(query,function(err,books){
                if(err){
                    res.status(500).send(err)
                }
                else
                {
                    res.send(books)
                }
            })
        })
    bookRouter.use('/:bookId',function(req,res,next){
        books.findById(req.params.bookId,function(err,book){
            if(err){
                res.status(500).send(err)
            }
            else if(book)
            {
                req.book=book
                next()
            }
            else
            {
                res.status(404).send('Book not found')
            }
        })
    })
    bookRouter.route('/:bookId')
        .get(function(req,res){

                res.json(req.book)
        })
        .put(function(req,res){
            req.book.title=req.body.title;
            req.book.author=req.body.author;
            req.book.genre=req.body.genre;
            req.book.read=req.body.read;
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err)
                else
                {
                    res.json(req.book)
                }
            })

        })
        .patch(function(req,res){
            if(req.body._id)
            delete req.body._id
            for(var p in req.body)
            {
                req.book[p]=req.body[p]
            }
            req.book.save(function(err){
                if(err)
                res.status(500).send(err)
                else
                {
                    res.json(req.book)
                }
            })
        })
        .delete(function(req,res){
            req.book.remove(function(err){
                if(err)
                res.status(500).send(err)
                else
                {
                    res.sendStatus(204).send('removed')
                }
            })
        })
    return bookRouter;
}

module.exports=routes;