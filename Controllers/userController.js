const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

//GET User Add or Edit view
router.get('/', (req, res) => {
    res.render('user/addOrEdit', {
        viewTitle: 'Insert User'
    })
});

//POST Insert or Update User record
router.post('/', (req, res) => {
    if (req.body._id == ''){
        insertRecord(req, res);
    }else {
        updateRecord(req, res)
    }
});

//GET list of users
router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if(!err) {
            res.render('user/list', {
                list: docs
            })
        } else {
            console.log('Error in getting list of users: '+ err);
        }
    })
});

//GET User details
router.get('/:id', (req, res) => {
    User.findById(req.body._id, (err, doc) => {
        if(!err) {
            res.render("user/addOrEdit", {
                viewTitle: "Update Student",
                user: doc,
            });
            console.log(doc);
        } else {
            console.log('Error in getting user details: ' + err);
        }
    })
});

//DELETE User
router.get('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.body._id, (err, doc) => {
        if(!err) {
            res.redirect('user/list');
        }
        else {
            console.log('Error in deletion: ' + err);
        }
    })
})

//Insert a new User record
function insertRecord(req, res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.city = req.body.city;
    user.save((err, doc) => {
        if(!err) {
            res.redirect('user/list')
        }
        else {
            console.log('Error during insert:' + err);
        }
    })
};

//Update a existing User record
function updateRecord(req, res) {
    User.findOneAndUpdate({
        id: req.body._id,
    },
    req.body,
    {new: true},
    (err, doc) => {
        if(!err){
            res.redirect('user/list');
        } else {
            console.log('Error during udpate:' + err);
        }
    })
};

module.exports = router;