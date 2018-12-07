var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var jquery = require('jquery'); 
var dotenv = require('dotenv');
//var dataUtil = require("./data-util");
var _ = require('underscore');

var Item = require('./models/Items'); 

dotenv.load();  //loading environment variables




var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

mongoose.connect(process.env.MONGODB); 

mongoose.connection.on('error', function(){
    console.log("Connection ERROR");  
    process.exit(1); 

}); 





app.get('/', function(req, res){
   var items = []; 
   Item.find({}, function(err, database_items){
    if (err) throw err;
    
    // items=database_items.slice(0); 
    // res.send(database_items); 
    res.render('allMovies', {
        items: database_items, 
    });

    });


})


app.delete('/item/:id', function(req, res) {
    // Find movie by id
    Item.findByIdAndRemove(req.body.id, function(err, item){
        if (err) throw err;
        if (!item) return res.send("No item by that ID found");

        return res.redirect("/");
    });

});


app.post('/api/item',function(req, res){
    
    var item = new Item({
        name: req.body.name,
        type_of_item: req.body.type_of_item,
        author: req.body.author,
        subject: req.body.subject, 
        class: req.body.class, 
        comments: [],
        price: req.body.price,
        description: req.body.description
    });

 
    item.save(function(err){
        if (err) throw err;
    });

    res.redirect('/');
});

app.get('/items/cheapest', function(req, res){
    

    Item.find({}, function(err, database_items){
        if (err) throw err;
        
        database_items.sort(function(a, b){
            return b.price - a.price; 
        })
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('allMovies', {
            items: database_items.reverse(), 
        });
    
        });
   
}); 

app.get('/api/json', function(req, res){
    Item.find({}, function(err, database_items){
        if (err) throw err;
        
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.send(database_items); 
    
        });

}); 

app.get('/items/expensive', function(req, res){

    Item.find({}, function(err, database_items){
        if (err) throw err;
        
        database_items.sort(function(a, b){
            return a.price - b.price; 
        })
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('allMovies', {
            items: database_items.reverse(), 
        });
    
        });
})

app.get('/items/others', function(req, res){

    Item.find({type_of_item:"NA"}, function(err, database_items){
        if (err) throw err;
        
       
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('otherItems', {
            items: database_items.reverse(),
        });
    
        });
})

app.get('/items/books', function(req, res){
    
    Item.find({type_of_item: "book"}, function(err, database_items){
        if (err) throw err;
        
       
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('bookItems', {
            items: database_items,
        });
    
        });
})

app.get('/items/tech', function(req, res){
    
    Item.find({type_of_item: "tech"}, function(err, database_items){
        if (err) throw err;
        
       
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('techItems', {
            items: database_items,
        });
    
        });
})

app.get('/items/newest', function(req, res){
    
    Item.find({}, function(err, database_items){
        if (err) throw err;
        
       
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('newestItem', {
            items: database_items[database_items.length - 1],
        });
    
        });
})

app.get('/items/posters', function(req, res){
    
    Item.find({type_of_item: "Book"}, function(err, database_items){
        if (err) throw err;
        
       
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('posterItems', {
            items: database_items,
        });
    
        });
})

app.get('/items/tickets', function(req, res){
    
    Item.find({type_of_item: "ticket"}, function(err, database_items){
        if (err) throw err;
        
       
        // items=database_items.slice(0); 
        // res.send(database_items); 
        res.render('ticketItems', {
            items: database_items.reverse(),
        });
    
        });
})








app.post('/item/:id/comment', function(req, res) {
    // Add a review
    
    Item.findById(req.params.id,function(err, item){
        if (err) throw err;
        if (!item) return res.send("No item by that ID found");

        item.comments.push({
            comment: req.body.comment,
            author: "random student"
        });

        item.save(function(err){
            if (err) throw err;

        });
        res.redirect('/');
    });

  

});


/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5 
 * endpoints for the API, and 5 others. 
 */

app.listen(process.env.PORT || 3000, function() {

    console.log('Items Listening on Port 3000!');
});
