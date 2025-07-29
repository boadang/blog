const { mongo } = require("mongoose");

module.exports = {
    multipleMongooseObjects: function (mongooseObjects) {
        return mongooseObjects.map(mongooseObject => mongooseObject.toObject());
    },
    mongooseObject: function (mongooseObject) {
        return mongooseObject ? mongooseObject.toObject() : mongooseObject;
    }
}