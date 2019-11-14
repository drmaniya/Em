const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empSchema = new Schema({
    oname: {
        type: String,
        required: true
    },
    oemail: {
        type: String,
        required: true
    },
    ostate: {
        type: String,
        required: true
    },
    ocity: {
        type: String
    },
    Ename: {
        type: String,
        required: true
    },
    Eemail: {
        type: String,
        required:true
    }
},
    {
        collection: 'emp'
    },
);

const Employee = mongoose.model('emp', empSchema);

module.exports = {Employee};