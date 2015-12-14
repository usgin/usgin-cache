/**
 * Created by nahmed on 6/17/2015.
 */
var GeoJSON = require('mongoose-geojson-schema');
// app/models/animal.js (mongoose model)
module.exports = {
    connection: 'mongo1',
    attributes: {
        geoFeature:GeoJSON.Feature
    },
    classMethods: {},
    instanceMethods: {},
    plugins: [],
    middleware: {},
    options: {}
};