const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UsersDB', {
    useNewUrlParser: true,
},
err => {
    if(!err) {
        console.log('Connection Succeded!')
    } else{
        console.log('Error in connection', err);
    }
})

require('./user.model');