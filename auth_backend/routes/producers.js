var express = require('express');
var router = express.Router();
var Producers = require('../models/producerProfile');
var UserAccounts = require('../models/userAccount');
//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../config/database');



router.route('/')
    .post(function (request, response) {
        Producers.add(request.body).then(function(producer){
            response.json({producer: producer});
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
        Producers.getAll().then(function(Producers){
            response.json({producer: Producers});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });


router.route('/ActiveProfile')
    .get(function (req, res) {
        console.log("in producer profile get by ActiveProfile");
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'producer profile ID was not provided'});
        }
        Producers.getOne(req.decoded.profileID).then(function(producer){
            console.log("searching for producer with ID: ", req.decoded.profileID);

            console.log("retrieved profile: ", producer);
            if (!producer) {
                res.json({success: false, message: 'admin not found'});
            }
            res.json({success: true, producer: producer});
        }).catch(function(err){
            console.log(err);
        });
    })
    .put(function (req, res) {
        if (!req.decoded.profileID) {
            res.json({success: false, message: 'producer profile ID was not provided'});
        }
        Producers.update(req.decoded.profileID, req.body).then(function(producer){
            res.json({success: true, producer: producer});
        }).catch(function(err){
            res.json({success: false, message: err});
        })
    });

router.route('/:producer_id')
    .get(function (request, response) {
        if (!request.params.producer_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Producers.getOne(request.params.producer_id).then(function(producer){
            console.log("retreived profile: ", producer);
            response.json({producer: producer});
        }).catch(function(err){
            response.json({success: false, message: err});
        })

    })
    .put(function (request, response) {
        if (!request.params.producer_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Producers.update(request.params.producer_id, request.body).then(function(producer){
            response.json({producer: producer});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.producer_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        Producers.deleteOne(request.params.producer_id).then(function(producer){
            response.json({success: true, message: 'admin deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });

module.exports = router;