var express = require('express');
var router = express.Router();
var Consumers = require('../models/consumerProfile');
var UserAccounts = require('../models/userAccount');
//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../config/database');



router.route('/')
    .post(function (request, response) {
        Consumers.add(request.body).then(function(consumer){
            response.json({consumer: consumer});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })

//middleware for every route below this one
router.use(function (req, res, next) {
    console.log('in authentication middleware');
    const token = req.headers.authorization;


    if (!token) {
        res.json({success: false, message: 'No token provided'}); // Return error
    } else {
        // Verify the token is valid
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                res.json({success: false, message: 'Token invalid: ' + err}); // Return error for token validation
            } else {
                req.decoded = decoded; // Create global variable to use in any request beyond
                console.log('authentication middleware complete!');
                next(); // Exit middleware
            }

        })
    }
});
router.route('/')
    .get(function (request, response) {
        Consumers.getAll().then(function(Consumers){
            response.json({consumer: Consumers});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });


router.route('/ActiveProfile')
    .get(function (req, res) {
        console.log("in consumer profile get by ActiveProfile");
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'consumer profile ID was not provided'});
        }
        Consumers.getOne(req.decoded.profileID).then(function(consumer){
            console.log("searching for consumer with ID: ", req.decoded.profileID);

            console.log("retrieved profile: ", consumer);
            if (!consumer) {
                res.json({success: false, message: 'admin not found'});
            }
            res.json({success: true, consumer: consumer});
        }).catch(function(err){
            console.log(err);
        });
    })
    .put(function (req, res) {
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'consumer profile ID was not provided'});
        }
        Consumers.update(req.decoded.profileID, req.body).then(function(consumer){
            res.json({success: true, consumer: consumer});
        }).catch(function(err){
            res.json({success: false, message: err});
        })
    });

router.route('/:consumer_id')
    .get(function (request, response) {
        if (!request.params.consumer_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Consumers.getOne(request.params.consumer_id).then(function(consumer){
            console.log("retreived profile: ", consumer);
            response.json({consumer: consumer});
        }).catch(function(err){
            response.json({success: false, message: err});
        })

    })
    .put(function (request, response) {
        if (!request.params.consumer_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Consumers.update(request.params.consumer_id, request.body).then(function(consumer){
            response.json({consumer: consumer});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.consumer_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Consumers.deleteOne(request.params.consumer_id).then(function(consumer){
            response.json({success: true, message: 'admin deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;