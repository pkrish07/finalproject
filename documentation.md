
# PROJECT NAME

For Sale Items

Name: Prashant Krishnan

Date: 12/6/2018

Project Topic: Local School Supplies for Sale

URL: 

https://itemsforsale.herokuapp.com/


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name      `Type: String`
- `Field 2`:     Type      `Type: String`
- `Field 3`:     Price       `Type: Number`
- `Field 4`:     Description       `Type: String`
- `Field 5`:     Comments       `Type: [commentSchemas]`


Schema: 
```javascript
{
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
}
```

### 2. Add New Data

HTML form route: `/`

POST endpoint route: `/api/item`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/item',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: 'Astronomy 330 Textbook', 
        type_of_item: 'Book',
        author: "Jeffrey",
        price: 35,
         comments: [{
           comment: "Great price!", 
           author: "Dave"
        }], 
        class: "ASTR330", 
        subject: "Astronomy", 
        description: "I just finished taking the class, DM me for a good price"
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/json` <-- for raw data>
<!-- '/' --> for homepage
### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. Tech! -> `/items/tech`
2. Latest Item! -> `/item/newest`
3. Expensive (Highest to Lowest) -> `/items/expensive`
4. Others -> `/items/others`
5. Books -> `/items/books`

