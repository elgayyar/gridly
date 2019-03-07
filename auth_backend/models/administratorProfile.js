var mongoose = require('mongoose');
var administratorProfileSchema = mongoose.Schema(
    {
        fName: String,
        lName: String,
        email: String,
        account: {type: mongoose.Schema.ObjectId, ref: 'userAccount'},
    }
);

var administratorProfile = module.exports = mongoose.model('administratorProfile', administratorProfileSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne
};

function add(object){
    return new Promise (function (resolve, reject) {
        var document = new administratorProfile(object);
        if (!document.fName){
            error = "No first Name detected.";
            reject(error);
        } else if (!document.lName){
            error = "No lName detected.";
            reject(error);
        } else if (!document.email){
            error = "No email detected.";
            reject(error);
        } else {
            document.save(function (error) {
                if (error){
                    reject(error);
                } else{
                    console.log ("admin account registered");
                    resolve(document);
                }
            });
        }
    });
}

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        administratorProfile.findById(id, function (error, document) {
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
        if (!updatedDocument.fName){
            error = "No fName detected.";
            reject(error);
        } else if (!updatedDocument.lName){
            error = "No lName detected.";
            reject(error);
        } else if (!updatedDocument.email){
            error = "No email detected.";
            reject(error);
        } else {
            administratorProfile.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.fName = updatedDocument.fName;
                    document.lName = updatedDocument.lName;
                    document.email = updatedDocument.email;
                    document.account = updatedDocument.account;
                    document.save(function (error) {
                        if (error) {
                            reject(error);
                        } else {
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
        administratorProfile.findById(id, function (error, document){
            if (error){
                reject(error);
            }else{
                resolve(document);
            }
        });
    });
}

function getAll(){
    return new Promise (function (resolve, reject) {
        administratorProfile.find({}, function (error, documents) {
            if (error){
                reject(error);
            }else{
                resolve(documents);
            }
        });
    });
}
