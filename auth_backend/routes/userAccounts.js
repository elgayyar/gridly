var express = require('express');
var router = express.Router();
var UserAccounts = require('../models/userAccount');
var administratorProfiles = require('../models/administratorProfile');
var consumerProfiles = require('../models/consumerProfile');
var producerProfiles= require('../models/producerProfile');

//for tokens & verification & login sessions
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const loginPage = '"http://localhost:8080/login"';

router.route('/login')
    .post(function (request, response) {
        console.log("in login route, will be verifying account with username: ", request.body);

        //get the account by checking the unique name
        UserAccounts.getByEmail(request.body.email).then(function(userAccount){

            console.log ("password entered by user is: ", request.body.encryptedPassword);
            console.log ("accToVerifyPasswordOn is: ", userAccount);

            //check to see if the password matches the name
            UserAccounts.login(userAccount, request.body.encryptedPassword).then(function(userAccount){
                console.log ("in UserAccounts login :", userAccount);
                //login success
                //create token, encrypt the id, expire in 24hours
                console.log(userAccount._id);

                //get the profile associated with this account
                let profileID;
                let profileType;
                if (userAccount.consumerProfile){
                    profileID = userAccount.consumerProfile;
                    profileType = "consumer"
                } else if (userAccount.producerProfile){
                    profileID = userAccount.producerProfile;
                    profileType = "producer"
                } else if (userAccount.administratorProfile) {
                    profileID = userAccount.administratorProfile;
                    profileType= "administrator";
                }

                const token = jwt.sign({_id: userAccount._id, profileID: profileID,  profileType: profileType}, config.secret, {expiresIn: '24h'});
                console.log("token made: ", token);

                response.json({success: true, message: "Account authenticated!", token: token, userAccount: userAccount});

            }).catch(function(err){
                response.json({success: false, message: err});
            })

        }).catch(function(err){
            response.json({success: false, message: err});
        })



    });


router.route('/')
    .post(function (request,response) {
        console.log ("in user account post route, about to add account :", request.body);
        UserAccounts.add(request.body).then(function(userAccount){
            console.log ('the userAccount registered is: ', userAccount);
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })

    })
    .get(function (request, response) {
        UserAccounts.getAll().then(function(userAccounts){
            response.json({userAccount: userAccounts});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });


router.route('/:email')
    .get(function (request, response) {
        console.log("within UserAccount route, getting account with email: ", request.params.email);

        UserAccounts.getByEmail(request.params.email).then(function(userAccount){
            console.log("object retreived from getbyName: ", userAccount);
            if (userAccount) {
                response.json({success: true, userAccount: userAccount});
            } else {
                response.json({success: false, message: "Account was not found "});
            }
        }).catch(function(err){
                console.log(err);
                response.json({success: false, message: err});
            }
        )
    });


//middleware for every route below this one
router.use(function (req, res, next) {
    console.log('in authentication middleware');
    const token = req.headers.authorization;

    console.log('token: ', token);

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

module.exports = router;