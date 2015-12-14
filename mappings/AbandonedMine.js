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
                Label: {type:String, es_indexed:true},
                Name: {type:String, es_indexed:true},
                //----- Vertical Data
                surfaceElevation: {type:Number, es_indexed:true},
                MaxDepth: {type:Number, es_indexed:true},

                //---Location Data
                LatDegree: {type:String, es_indexed:true},
                LongDegree    : {type:String, es_indexed:true},
                SRS: {type:String, es_indexed:true},
                LocationName: {type:String, es_indexed:true},
                County: {type:String, es_indexed:true},
                State: {type:String, es_indexed:true},

                //------ Date Information
                ActivityStart: {type:Date, es_indexed:true},
                ActivityEnd: {type:Date, es_indexed:true},

                //------ Notes
                AllText: {type:String, es_indexed:true},
                //------- Identifiers
                FeatureURI: {type:String, es_indexed:true},
                SamplingFeatureURI: {type:String, es_indexed:true},
                Identifier: {type:String, es_indexed:true},
                SamplingFeatureIdentifier: {type:String, es_indexed:true},

                //------ Source Data
                SourceText: {type:String, es_indexed:true},
                Status: {type:String, es_indexed:true},
                //------Related Data
                RelatedResource: {type:String, es_indexed:true},
                //------Temperature Data
                GeothermalTemperature: {type:String, es_indexed:true},
                //------Methods
                Procedures: {type:String, es_indexed:true},
                //-----Description Terms
                Details: {type:String, es_indexed:true},
                //------Contact data
                Operator: {type:String, es_indexed:true},
                Owner : {type:String, es_indexed:true},
                //------Contact data
                GeologicUnit: {type:String, es_indexed:true},
                //------Categoreis------
                Commodity: {type:String, es_indexed:true},
                Type: {type:String, es_indexed:true},

                //------Primary Result
                ResultType: {type:String, es_indexed:true},
                Value : {type:Number, es_indexed:true}
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
var mongooseModel = mongoose.model('AbandonedMine', pointSchema);
mongooseModel.createMapping(function(err, mapping){
    // importatnt function for Elastic Geometry Configurateioin
    console.log("Error :" + err + ".  AbandondedMines Mapping is:" + utils.inspect(mapping));
});
module.exports = mongooseModel;