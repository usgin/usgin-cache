/**
 * Created by nahmed on 6/17/2015.
 */
// config/mongoose.js
module.exports = {

    default: {

        'mongo1': {
            uris: 'mongodb://localhost:27017/usgin-cache',
            options: {}
        },

        'mongo2': {
            uris: 'mongodb://localhost:27017/test/',
            options: {}
        }
    },

    production: {}
};