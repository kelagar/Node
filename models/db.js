const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/LearningDB', {
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