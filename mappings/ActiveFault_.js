var mongoose = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema = mongoose.Schema;
var pointSchema = new Schema
    ({
        featuretype: {type:String, es_indexed:true},
        baseUrl: {type:String, es_indexed:true},
        feature: {
            properties:
            {   //------- Names
                Name: {type:String, es_indexed:true},
                Label: {type:String, es_indexed:true},
                //------- Identifiers

                FeatureURI: {type:String, es_indexed:true},

                ParentFeatureURI: {type:String, es_indexed:true},
                Identifier: {type:String, es_indexed:true},


                //------ Source Data
                SourceText: {type:String, es_indexed:true},
                MetadataURI: {type:String, es_indexed:true},
                //------Methods
                Procedures: {type:String, es_indexed:true},
                //-----Description Terms
                Details: {type:String, es_indexed:true},
                FeatureDescriptionURI: {type:String, es_indexed:true},
                //------Gological data

                GeologicAgeURI: {type:String, es_indexed:true},
                GeologicAgeYounger: {type:String, es_indexed:true},
                GeologicAgeOlder : {type:String, es_indexed:true},
                GeologicAge: {type:String, es_indexed:true},
                //------Categoreis------
                Type: {type:String, es_indexed:true},
                //------Primary Result
                ResultType: {type:String, es_indexed:true},
                Value : {type:String, es_indexed:true}
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
var mongooseModel = mongoose.model('ActiveFault', pointSchema);
mongooseModel.createMapping(function(err, mapping){
    console.log("Error :" + err + ".  Active Fault Mapping is:" + utils.inspect(mapping));
});
module.exports = mongooseModel;