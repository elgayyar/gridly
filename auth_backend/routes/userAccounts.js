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
        UserAccounts.getByName(request.body.username).then(function(userAccount){

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
            //temp variables to hold the profile and temp account for updating
            var tempProfile;
            var tempAccount = userAccount;
            console.log ("Success! this is the account that was just added: ", tempAccount)

            if(userAccount.consumerProfile){
                consumerProfiles.getOne(userAccount.consumerProfile).then(function(consumerProfile){
                    console.log('found the consumer profile to link to', consumerProfile);

                    tempProfile = consumerProfile;
                    tempProfile.account = userAccount._id; 

                    consumerProfiles.update(tempProfile._id, tempProfile).then(function(document){
                        console.log("Success! Here is the updated profile with the ref to the userAccount: ", document);
                    }).catch(function(err){
                        console.log(err);
                    });

                    tempAccount.consumerProfile = tempProfile._id;
                    UserAccounts.update(tempAccount._id, tempAccount).then(function(document) {
                        console.log ("UserAccount successfully updated! It's consumerProfile field should be filled! ", document);
                    }).catch(function(err){
                        console.log(err);
                    })

                }).catch(function(err){
                    console.log(err);
                });

            } else if(userAccount.administratorProfile){
                administratorProfiles.getOne(userAccount.administratorProfile).then(function(adminProfile){
                    console.log('found the administratorProfile to link to', adminProfile);
                    tempProfile = adminProfile;
                    tempProfile.account = userAccount._id;

                    //update the profile with the ref to the user Account
                    administratorProfiles.update(tempProfile._id, tempProfile).then(function(document){
                        console.log("Success! Here is the updated profile with the ref to the userAccount: ", document);
                    }).catch(function(err){
                        console.log(err);
                    });

                    //update the reference to the admin profile in the just created UserAccount
                    tempAccount.administratorProfile = tempProfile._id;
                    UserAccounts.update(tempAccount._id, tempAccount).then(function(document) {
                        console.log ("UserAccount successfully updated! It's administratorProfile field should be filled! ", document);
                    }).catch(function(err){
                        console.log(err);
                    })

                }).catch(function(err){
                    console.log(err);
                });

            } else if(userAccount.producerProfile){
                producerProfiles.getOne(userAccount.producerProfile).then(function(producerProfile){
                    console.log('found the producerProfile profile to link to', producerProfile);

                    tempProfile = producerProfile;
                    tempProfile.account = userAccount._id;

                    //update the reference to useraccount in the profile
                    producerProfiles.update(tempProfile._id, tempProfile).then(function(document){
                        console.log("Success! Here is the updated profile with the ref to the userAccount: ", document);
                    }).catch(function(err){
                        console.log(err);
                    });

                    tempAccount.producerProfile= tempProfile._id;

                    //update the reference to the producerProfile profile in the just created UserAccount
                    UserAccounts.update(tempAccount._id, tempAccount).then(function(document) {
                        console.log ("UserAccount successfully updated! It's producerProfile field should be filled! ", document);
                    }).catch(function(err){
                        console.log(err);
                    })                }).catch(function(err){
                    console.log(err);
                });
            }

            // userAccount.administratorProfile = administratorProfile._id;
            // UserAccounts.update(userAccount._id, userAccount).then(function(userAccount){   // I then update the administratorProfile reference of the associated userAccount
            //     console.log(userAccount);
            // }).catch(function(err){
            //     console.log(err);
            // });

            response.json({userAccount: userAccount});

        }).catch(function(err){
            response.json({success: false, message: err});
        })

    })
    .get(function (request, response) {
        UserAccounts.getAll().then(function(userAccounts){
            userAccounts.forEach(function(userAccount){
                if(userAccount.administratorProfile){
                    administratorProfiles.getOne(userAccount.administratorProfile).then(function(document){
                        userAccount.administratorProfile = document;   // Replace the id in the field with the object so you have the needed data on the front end
                    }).catch(function(err){
                        console.log(err);
                    });
                }else if(userAccount.producerProfile){
                    producerProfiles.getOne(userAccount.producerProfile).then(function(document){
                        userAccount.producerProfile = document; // Replace the id in the field with the object so you have the needed data on the front end
                    }).catch(function(err){
                        console.log(err);
                    });
                }else if(userAccount.consumerProfile){
                    consumerProfiles.getOne(userAccount.consumerProfile).then(function(document){
                        userAccount.consumerProfile = document;  // Replace the id in the field with the object so you have the needed data on the front end
                    }).catch(function(err){
                        console.log(err);
                    });
                }
            });
            response.json({userAccount: userAccounts});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    });


router.route('/:username')
    .get(function (request, response) {
        console.log("within UserAccount route, getting account with username: ", request.params.username);

        UserAccounts.getByName(request.params.username).then(function(userAccount){
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


router.route('/id/:object_id')
    .get(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.getOne(request.params.object_id).then(function(userAccount){
            if(userAccount.administratorProfile){
                administratorProfiles.getOne(userAccount.administratorProfile).then(function(document){
                    userAccount.administratorProfile = document;   // Replace the id in the field with the object so you have the needed data on the front end
                }).catch(function(err){
                    console.log(err);
                });
            }else if(userAccount.producerProfile){
                producerProfiles.getOne(userAccount.producerProfile).then(function(document){
                    userAccount.producerProfile = document; // Replace the id in the field with the object so you have the needed data on the front end
                }).catch(function(err){
                    console.log(err);
                });
            }else if(userAccount.consumerProfile){
                consumerProfiles.getOne(userAccount.consumerProfile).then(function(document){
                    userAccount.consumerProfile = document;  // Replace the id in the field with the object so you have the needed data on the front end
                }).catch(function(err){
                    console.log(err);
                });
            }
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .put(function (request, response) {
        console.log ("in update user account route");
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.update(request.params.object_id, request.body).then(function(userAccount){
            response.json({userAccount: userAccount});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
    })
    .delete(function (request, response) {
        if (!request.params.object_id) {
            response.json({success: false, message: 'id was not provided'});
        }
        UserAccounts.deleteOne(request.params.object_id).then(function(userAccount){
            response.json({success: true, message: 'userAccount deleted!'});
        }).catch(function(err){
            response.json({success: false, message: err});
        })
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

router.route('/editProfile')
    .get (function(req, res) {
        console.log("in user accounts edit profile route, looking for id: ", req.decoded._id);
        if (!req.decoded._id) {
            res.json({success: false, message: 'user account ID was not provided'});
        }
        UserAccounts.getOne(req.decoded._id).then(function(user) {
            if (!user) {
                res.json({success: false, message: "User not found"});
            } else {
                console.log('at end of UserAccounts getUser route');
                res.json({success: true, userAccount: user});
            }
        }).catch(function(err) {
            console.log(err);
            response.json({success: false, message: err});
        })

    });



module.exports = router;