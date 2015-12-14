var mongoose = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema = mongoose.Schema;
var pointSchema = new Schema
    ({
        featuretype: {type:String, es_indexed:true},
        baseUrl: {type:String, es_indexed:true},
        feature: {
            properties:
            {   FeatureName: {type:String, es_indexed:true},
                //Label: {type:String, es_indexed:true},
                Name: {type:String, es_indexed:true},
                Type: {type:String, es_indexed:true},
                URL: {type:String, es_indexed:true},
                County: {type:String, es_indexed:true},
                State: {type:String, es_indexed:true}
                //Source: {type:String, es_indexed:true}
            } ,
            geometry:{
                geo_point: {
                    type: String,
                    es_type: 'geo_point',
                    es_lat_lon: true//,
                    //es_indexed:true
                },
                lat: { type: Number },
                lon: { type: Number }
            }
        }
    }
    ,{strict:false});
pointSchema.plugin(mongoosastic);
var mongooseModel = mongoose.model('GeologicUnitView', pointSchema);
mongooseModel.createMapping(function(err, mapping){
    console.log("Error :" + err + ".  Geological Unit Mapping is:" + utils.inspect(mapping));
});
module.exports = mongooseModel;