var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

var userAccountSchema = mongoose.Schema(
    {
        email: String,
        encryptedPassword: String,
        //Check which of the following FKs is non-null to see what type of user (Admin, Producer Consumer) the user is.
        administratorProfile: {},
        producerProfile: {},
        consumerProfile: {}
    }
);
var UserAccounts = module.exports =  mongoose.model('userAccount', userAccountSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    getByEmail:getByEmail,
    update:update,
    deleteOne:deleteOne,
    login:login,
};

function add(object){
    return new Promise (function (resolve, reject) {
        console.log("within add of UserAccount Model");
        let document = new UserAccounts(object);

        if (!document.email){
            error = "No email detected.";
            reject(error);
        } else if (!document.encryptedPassword){
            error = "No encryptedPassword detected.";
            reject(error);
        } else {

            //make a hash and assign it back to password
            console.log("the password hashing: ", document.encryptedPassword);
            document.encryptedPassword = bcrypt.hashSync(document.encryptedPassword);
            //this if hash is working
            console.log("hashed password: ", document.encryptedPassword);

            document.save(function (error) {
                if (error){
                    reject(error);
                }else{
                    resolve(document);
                }
            });
        }
    });
}

function login(object, userEnteredPassword){
    return new Promise (function (resolve, reject) {
        console.log ("in LOGIN in model, object is: ", object);
        console.log ("in LOGIN in model, the password the user entered is: ", userEnteredPassword);

        var validPassword = checkPassword(userEnteredPassword, object.encryptedPassword);
        console.log("the status of the password: ", validPassword);

        if (!validPassword) {
            console.log("in model, password doest not match");
            error = "Password Invalid/Does not match.";
            reject(error);
        } else {
            console.log ("in model, password matches!");
            resolve(object);
        }

    })
}

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        UserAccounts.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                document.remove(function (error) {
                    if (error){
                        reject(error);
                    } else {
                        resolve(document);
                    }
                })
            }
        });
    });
}

function update(id, updatedDocument){
    return new Promise (function (resolve, reject) {
        if (!updatedDocument.email){
            error = "No email detected.";
            reject(error);
        } else if (!updatedDocument.encryptedPassword){
            error = "No encryptedPassword detected.";
            reject(error);
        } else {
            // updatedDocument.encryptedPassword = bcrypt.hashSync(updatedDocument.encryptedPassword,10);
            UserAccounts.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.email = updatedDocument.email;
                    document.encryptedPassword = updatedDocument.encryptedPassword;
                    document.administratorProfile = updatedDocument.administratorProfile;
                    document.consumerProfile = updatedDocument.consumerProfile;
                    document.producerProfile = updatedDocument.producerProfile;

                    document.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
                            console.log("user account updated!");
                            resolve(document);
                        }
                    });
                }
            });
        }
    });
}

function getOne(id){
    return new Promise (function (resolve, reject) {
        console.log("in Model, getOne (id) name is: ", id);
        UserAccounts.findById(id, function (error, document) {
            if (error){
                reject(error);
            }else{
                resolve(document);
            }
        });
    });
}

function getByEmail(email){
    return new Promise (function (resolve, reject) {
        console.log("in Model, getByEmail email is: ", email);
        UserAccounts.find({email: email}, function (error, document) {
            if (error){
                reject(error);
            }else{
                console.log("in Model, getByEmail: ", document[0]);
                resolve(document[0]);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        UserAccounts.find({}, function (error, documents) {
            if (error){
                reject(error);
            }else{
                resolve(documents);
            }
        });
    });
}


function checkPassword (enteredPassword, encryptedPassword){
    return bcrypt.compareSync(enteredPassword, encryptedPassword);
};

// userAccountSchema.methods.comparePassword = function (password){
//     return bcrypt.compareSync(password, this.password);
// };

