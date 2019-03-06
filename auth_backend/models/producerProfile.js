var mongoose = require('mongoose');
var producerProfileSchema = mongoose.Schema(
    {
        fName: String,
        lName: String,
        email: String,
        postalCode: String,
        address: String,
        account: {type: mongoose.Schema.ObjectId, ref: 'UserAccount'},
       
    }
);

var producerProfile = module.exports = mongoose.model('producerProfile', producerProfileSchema);

module.exports = {
    add:add,
    getAll:getAll,
    getOne:getOne,
    update:update,
    deleteOne:deleteOne,
};
function add(object){
    return new Promise (function (resolve, reject) {
        var document = new producerProfile(object);
        if (!document.fName){
            error = "No fName detected.";
            reject(error);
        } else if (!document.lName){
            error = "No lName detected.";
            reject(error);
        } else if (!document.email){
            error = "No email detected.";
            reject(error);
        } else if (!document.postalCode){
            error = "No postalCode detected.";
            reject(error);
        } else if (!document.address){
            error = "No address detected.";
            reject(error);
        } else {
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

function deleteOne(id){
    return new Promise (function (resolve, reject) {
        producerProfile.findById(id, function (error, document) {
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
        }  else if (!updatedDocument.postalCode){
            error = "No postalCode detected.";
            reject(error);
        } else if (!updatedDocument.address){
            error = "No address detected.";
            reject(error);
        } else {
            producerProfile.findById(id, function (error, document) {
                if (error) {
                    reject(error);
                }
                else {
                    document.fName = updatedDocument.fName;
                    document.lName = updatedDocument.lName;
                    document.email = updatedDocument.email;
                    document.postalCode = updatedDocument.postalCode;
                    document.address = updatedDocument.address;
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
        producerProfile.findById(id, function (error, document){
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
        producerProfile.find({}, function (error, documents) {
            if (error){
                reject(error);
            }else{
                resolve(documents);
            }
        });
    });
}



