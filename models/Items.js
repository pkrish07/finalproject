var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },

    author: {
        type: String, 
        required: true
    }
})

var itemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }, 

    type_of_item: {
        type: String,
        required: true
    },
    
    author: {
        type: String,
        required: true
    },
    comments: [commentSchema], 
    subject: {
        type: String
    }, 
    class:{
        type: String
    },

    price: {
        type: Number
    }, 

    description: {
        type: String 
    }
    
});


var Item = mongoose.model('Item,' ,itemSchema); 
module.exports = Item; 
