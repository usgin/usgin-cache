var mongoose = require('mongoose')
    , mongoosastic = require('mongoosastic')
    , Schema = mongoose.Schema;
var pointSchema = new Schema
({
        featuretype: {type:String, es_indexed:true},
        baseUrl: String,
        feature: {
            properties:
            {   FeatureName: {type:String, es_indexed:true},

                //------- Names
                Name: {type:String, es_indexed:true},
                Label: {type:String, es_indexed:true},

                //------ Date Information
                ActivityStart: {type:Date, es_indexed:true},
                ActivityEnd: {type:Date, es_indexed:true},
                //----- Vertical Data
                surfaceElevation: {type:Number, es_indexed:true},
                MaxDepth: {type:Number, es_indexed:true},
                Depth: {type:Number, es_indexed:true},
                //------ Notes
                AllText: {type:String, es_indexed:true},
                //------- Identifiers
                ObservationURI: {type:String, es_indexed:true},
                FeatureURI: {type:String, es_indexed:true},
                SamplingFeatureURI: {type:String, es_indexed:true},
                ParentFeatureURI: {type:String, es_indexed:true},
                Identifier: {type:String, es_indexed:true},
                SamplingFeatureIdentifier: {type:String, es_indexed:true},

                County: {type:String, es_indexed:true},
                State: {type:String, es_indexed:true},
                //------ Source Data
                SourceText: {type:String, es_indexed:true},
                MetadataURI: {type:String, es_indexed:true},
                CitationURI: {type:String, es_indexed:true},

                Status: {type:String, es_indexed:true},
                //------Related Data
                RelatedResource: {type:String, es_indexed:true},
                //------Temperature Data
                GeothermalTemperature: {type:String, es_indexed:true},
                //------Methods
                Procedures: {type:String, es_indexed:true},
                Instruments: {type:String, es_indexed:true},
                SamplingProcess: {type:String, es_indexed:true},
                //-----Description Terms
                Details: {type:String, es_indexed:true},
                FeatureDescriptionURI: {type:String, es_indexed:true},
                //------Well data
                WellBoreShape: {type:String, es_indexed:true},
                Production : {type:String, es_indexed:true},
                ProducingInterval: {type:String, es_indexed:true},
                //------Contact data
                Operator: {type:String, es_indexed:true},
                Owner : {type:String, es_indexed:true},
                Laboratory: {type:String, es_indexed:true},
                Driller: {type:String, es_indexed:true},
                Contact : {type:String, es_indexed:true},
                Observer: {type:String, es_indexed:true},
                //------Contact data
                LithologyURI: {type:String, es_indexed:true},
                LithologyName : {type:String, es_indexed:true},
                GeologicAgeURI: {type:String, es_indexed:true},
                GeologicAgeYounger: {type:String, es_indexed:true},
                GeologicAgeOlder : {type:String, es_indexed:true},
                GeologicUnit: {type:String, es_indexed:true},
                DeepestStratUnit: {type:String, es_indexed:true},
                GeologicAge: {type:String, es_indexed:true},
                Permeability : {type:String, es_indexed:true},
                Porosity: {type:String, es_indexed:true},
                //------Categoreis------
                Commodity: {type:String, es_indexed:true},
                Type: {type:String, es_indexed:true},
                //------Primary Result
                ResultType: {type:String, es_indexed:true},
                Value : {type:String, es_indexed:true},
                Uncertainty: {type:String, es_indexed:true}

                //Source: {type:String, es_indexed:true}
            } ,
            geometry:{
                geo_point: {
                    type: Number,
                    es_type: 'geo_point',
                    es_lat_lon: true
                    //es_indexed:true
                }//,
                //coordinates: [Number]
                //lat: { type: [Number] },
                //lon: { type: [Number]}
            }
        }
    }
    ,{strict:false});

/*pointSchema.plugin(mongoosastic);
var mongooseModel = mongoose.model('usgin-cache', pointSchema);
mongooseModel.createMapping(function(err, mapping){
    console.log("Error :" + err + ".  usgin-cache Mapping is:" + utils.inspect(mapping));
});*/
var _ = require("underscore");
var mongooseModel;
if(_.indexOf(mongoose.modelNames(), "usgin-cache") < 0){
    pointSchema.plugin(mongoosastic);
    mongooseModel = mongoose.model('usgin-cache', pointSchema);
    /*process.on('uncaughtException', function (exception) {
     console.log(exception);
     // handle or ignore error
     });*/
}
else {
    pointSchema.plugin(mongoosastic);
    mongooseModel = mongoose.model('usgin-cache');
}
mongooseModel.createMapping(function(err, mapping){
    // importatnt function for Elastic Geometry Configurateioin
   console.log("Error :" + err + ".  AbandondedMines Mapping is:" + utils.inspect(mapping));
});
exports.usginModel = mongooseModel;