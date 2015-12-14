var mongoose = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema = mongoose.Schema;
var pointSchema = new Schema
    ({
        featuretype: {type:String, es_indexed:true},
        baseUrl: String,
        feature: {
            properties: {
                FeatureName: {type: String, es_indexed: true},
                County: {type: String, es_indexed: true},
                State: {type: String, es_indexed: true},
                LatDegree: {type: String, es_indexed: true},
                LongDegree: {type: String, es_indexed: true},
                SRS: {type: String, es_indexed: true},
                LocationName: {type:String, es_indexed:true},
                //----- Vertical Data
                //surfaceElevation: {type: Number, es_indexed: true},
                //MaxDepth: {type: Number, es_indexed: true},
                IntervalElevationTop: {type: Number, es_indexed: true},
                IntervalElevationBottom: {type: Number, es_indexed: true},
                IntervalDepthTop: {type: Number, es_indexed: true},
                IntervalDepthBottom: {type: Number, es_indexed: true},
                //------ Notes
                AllText: {type: String, es_indexed: true},
                //------- Identifiers
                //ObservationURI: {type: String, es_indexed: true},
                FeatureURI: {type: String, es_indexed: true},
                SamplingFeatureURI: {type:String, es_indexed:true},
                //ParentFeatureURI: {type: String, es_indexed: true},
                Identifier: {type: String, es_indexed: true},
                SamplingFeatureIdentifier: {type: String, es_indexed: true},
                //----------Names------
                Name: {type: String, es_indexed: true},
                //Label: {type:String, es_indexed:true},
                //------ Date Information
                ActivityStart: {type: Date, es_indexed: true},
                ActivityEnd: {type: Date, es_indexed: true},
                //------ Source Data
                SourceText: {type: String, es_indexed: true},
                //MetadatURI: {type:String, es_indexed:true},
                //------ Status---------
                //Status: {type: String, es_indexed: true},
                //------Related Data
                //RelatedResource: {type: String, es_indexed: true},
                //------Temperature Data
                GeothermalTemperature: {type:String, es_indexed:true},
                //------Methods
                Procedures: {type:String, es_indexed:true},
                //SamplingProcess: {type:String, es_indexed:true},
                //-----Description Terms
                //Details: {type: String, es_indexed: true},
                //-----Well Data
                //WellBoreShape: {type: String, es_indexed: true},
                //ProducingInterval: {type: String, es_indexed: true},
                //Production: {type: String, es_indexed: true},
                //------Contact data
                Operator: {type:String, es_indexed:true},
                //Owner : {type:String, es_indexed:true},
                //Laboratory: {type:String, es_indexed:true},
                //------Geology data
                GeologicUnit: {type:String, es_indexed:true},
                //------Categoreis------
                //Commodity: {type: String, es_indexed: true},
                Type: {type: String, es_indexed: true}
                //------Primary Result
                //ResultType: {type: String, es_indexed: true},
                //Value: {type: Number, es_indexed: true}
                //Uncertainty: {type:String, es_indexed:true} ,
            },
            geometry: {
                geo_point: {
                    type: String,
                    es_type: 'geo_point',
                    es_lat_lon: true//,
                    //es_indexed:true
                },
                lat: {type: Number},
                lon: {type: Number}
                /*geometry:{
                 coordinates: {
                 type: [],
                 es_lat_lon: true,
                 es_type: 'geo_point',
                 es_indexed:true
                 }
                 }*/
            }
        }
    }
    ,{strict:false});
pointSchema.plugin(mongoosastic);
var mongooseModel = mongoose.model('DrillStemTest', pointSchema);
mongooseModel.createMapping(function(err, mapping){
    // importatnt function for Elastic Geometry Configurateioin
    console.log("Error :" + err + ".  DrillStem Mapping is:" + utils.inspect(mapping));

});
module.exports = mongooseModel;