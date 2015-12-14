var utils = require('util');
module.exports = function(includeFile,feature,callback){
    includeFile = includeFile.split(':')[1];

    //console.log("Features are :: "+utils.inspect(feature.properties.WellName));
    //return require('./'+includeFile);
    //------- General Declarations----------
    if(!feature.properties.Type) { feature.properties.Type = 'Not Provided' }
    //------- Names
    if(!feature.properties.Name) { feature.properties.Name = 'Not Provided' }
    if(!feature.properties.Label) { feature.properties.Label = 'Not Provided' }
    //------ Date Information
    if(!feature.properties.ActivityStart) { feature.properties.ActivityStart = null }
    if(!feature.properties.ActivityEnd) { feature.properties.ActivityEnd= null }
    //----- Vertical Data
    if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = null }
    if(!feature.properties.MaxDepth) { feature.properties.MaxDepth = null }
    if(!feature.properties.Depth) { feature.properties.Depth = null }
    //------ Notes
    if(!feature.properties.AllText) { feature.properties.AllText = 'Not Provided' }
    //------- Identifiers
    if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = 'Not Provided' }
    if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = 'Not Provided' }
    if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = 'Not Provided' }
    if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = 'Not Provided' }
    if(!feature.properties.Identifier) { feature.properties.Identifier = 'Not Provided' }
    if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = 'Not Provided' }
    //------ Source Data
     if(!feature.properties.SourceText) { feature.properties.SourceText = 'Not Provided' }
    if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
    if(!feature.properties.CitationURI) { feature.properties.CitationURI = 'Not Provided' }
    if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
    //------Related Data
    if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = 'Not Provided' }
    //------Temperature Data
    if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature = 'Not Provided' }
    //------Methods
    if(!feature.properties.Procedures) { feature.properties.Procedures = 'Not Provided' }
    if(!feature.properties.Instruments) { feature.properties.Instruments = 'Not Provided' }
    if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = 'Not Provided' }
    //-----Description Terms
    if(!feature.properties.Details) { feature.properties.Details = 'Not Pr1ovided' }
    if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = 'Not Provided' }
    //------Well data
    if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape = 'Not Provided' }
    if(!feature.properties.Production) { feature.properties.Production = 'Not Provided' }
    if(!feature.properties.ProducingInterval) { feature.properties.ProducingInterval = 'Not Provided' }
    //------Contact data
    if(!feature.properties.Operator) { feature.properties.Operator = 'Not Provided' }
    if(!feature.properties.Owner) { feature.properties.Owner = 'Not Provided' }
    if(!feature.properties.Laboratory) { feature.properties.Laboratory = 'Not Provided' }
    if(!feature.properties.Driller) { feature.properties.Driller = 'Not Provided' }
    if(!feature.properties.Contact) { feature.properties.Contact = 'Not Provided' }
    if(!feature.properties.Observer) { feature.properties.Observer = 'Not Provided' }
    //------Contact data
    if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = 'Not Provided' }
    if(!feature.properties.LithologyName) { feature.properties.LithologyName = 'Not Provided' }
    if(!feature.properties.GeologicAgeURI) { feature.properties.GeologicAgeURI = 'Not Provided' }
    if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = 'Not Provided' }
    if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = 'Not Provided' }
    if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = 'Not Provided' }
    if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = 'Not Provided' }
    if(!feature.properties.GeologicAge) { feature.properties.GeologicAge = 'Not Provided' }
    if(!feature.properties.Permeability) { feature.properties.Permeability = 'Not Provided' }
    if(!feature.properties.Porosity) { feature.properties.Porosity = 'Not Provided' }
    //------Categoreis------
    if(!feature.properties.Commodity) { feature.properties.Commodity = 'Not Provided' }
    if(!feature.properties.Type) { feature.properties.Type = 'Not Provided' }
    //------Primary Result
    if(!feature.properties.ResultType) { feature.properties.ResultType = 'Not Provided' }
    if(!feature.properties.Value) { feature.properties.Value = null }
    if(!feature.properties.Uncertainty) { feature.properties.Uncertainty = 'Not Provided' }
    //------- End Section General Declarations

    feature.properties.FeatureName = includeFile;
    if(!feature.properties.County) { feature.properties.County = 'Not Provided' }
    if(!feature.properties.State) { feature.properties.State = 'Not Provided' }
    if(!feature.properties.LatDegree){
        feature.properties.LatDegree = feature.properties.LatDegreeWGS84;
        feature.properties.LongDegree = feature.properties.LongDegreeWGS84;
        delete feature.properties.LatDegreeWGS84;
        delete feature.properties.LongDegreeWGS84
    }
    delete feature.geometry.coordinates;
    delete feature.geometry.type;
    //delete feature.geometry;

    //feature.geometry = geometry;
    //feature.properties.LatDegree =    feature.properties.LatDegree.toString().substring(0,8);
    //feature.properties.LongDegree =   feature.properties.LongDegree.toString().substring(0,8);
    feature.geometry.lat =    parseFloat(feature.properties.LatDegree);
    feature.geometry.lon =   parseFloat(feature.properties.LongDegree);
    if(!feature.properties.Label) { feature.properties.Label = 'Not Provided' }
    //console.log(feature.properties.LatDegree +" -- "+feature.properties.LongDegree);

    if(includeFile == "AbandonedMine")
    {
         feature.properties.LocationName = feature.properties.Field +" "+ feature.properties.OtherLocationName +" "+ feature.properties.LeaseName +" "+ feature.properties.LeaseNo +" "+ feature.properties.WatershedName+" "+ feature.properties.HUCode;
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL_m }
        if(!feature.properties.MaxDepth) { feature.properties.MaxDepth = (feature.properties.DepthOfMine_km)*1000 }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = 'Not Provided' }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.MineStartDate }
        if(!feature.properties.ActivityEnd) { feature.properties.ActivityEnd=  feature.properties.EndedMiningDate }
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.InformationSource }
        //------ Status Data
        if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = 'Not Provided' }
        //------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature = eature.properties.EstMineWtrTemp_C }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.RechargeProcedure1 +", "+  feature.properties.RechargeProcedure2+", "+feature.properties.CrossSectionAreaProcedure}
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.HydroNarrative }
        //------Contact data
        if(!feature.properties.Operator) { feature.properties.Operator ='Not Provided' }
        if(!feature.properties.Owner) { feature.properties.Owner = feature.properties.LeaseOwner }
        //------Contact data
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.FormationDepositName }
        //------Categoreis------
        if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.MineOrOpeningType +", "+  feature.properties.MineOrOpeningType}
        //------Primary Result
        //if(!feature.properties.ResultType) { feature.properties.ResultType = feature.properties."Average Heat Flux" }
        if(!feature.properties.Value) { feature.properties.Value = ((feature.properties.MinHF1_kJyr+feature.properties.MaxHF1_kJyr+feature.properties.MinHF2_kJyr+feature.properties.MaxHF2_kJyr)/4).toString() }

        //--- General
        if(!feature.properties.MineName) { feature.properties.Name = 'Not Provided' } else { feature.properties.Name = feature.properties.MineName +","+ feature.properties.OtherName}
        if(!feature.properties.Label) { feature.properties.Label = 'Not Provided' }
        if(!feature.properties.MineOrOpeningType) { feature.properties.Type = 'Not Provided' } else { feature.properties.Type = feature.properties.MineOrOpeningType }
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = 'Not Provided' }
        //if(!feature.properties.ElevationGL_m) { feature.properties.surfaceElevation = 'Not Provided' } else { feature.properties.surfaceElevation = feature.properties.ElevationGL_m }
        //if(!feature.properties.DepthOfMine_km) { feature.properties.MaxDepth = 'Not Provided' } else { feature.properties.MaxDepth = feature.properties.DepthOfMine_km }
        if(!feature.properties.Notes) { feature.properties.AllText = 'Not Provided' } else { feature.properties.AllText = feature.properties.Notes }
    }
    else if(includeFile == "BaseMetals")
    {
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName   +" "+feature.properties.LeaseName   }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft_msl)*0.3048 }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.AnalysisURI }
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.WellBoreURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.OtherSiteID +","+ feature.properties.SpecimenID  }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.AnalysisName+" "+feature.properties.SamplingFeatureName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpecimenCollectionDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.AnalysisDateTime       }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.FluidTemperature_C )}//Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.AnalyticalProcedure +", "+ feature.properties.measurementMethod    }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.SpecimenCollectionMethod       }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SamplingFeatureType
        }
        //------Primary Result
        //        if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        //        if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }

    }
    else if(includeFile == "SingleAnalyte")
    {
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName   +" "+feature.properties.LeaseName   }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft_msl)*0.3048 }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.AnalysisURI }
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.WellBoreURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.OtherSiteID +","+ feature.properties.SpecimenID  }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.AnalysisName+" "+feature.properties.SamplingFeatureName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpecimenCollectionDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.AnalysisDateTime       }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.FluidTemperature_C )}//Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.AnalyticalProcedure +", "+ feature.properties.measurementMethod    }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.SpecimenCollectionMethod       }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SamplingFeatureType
        }
        //------Primary Result
        //        if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        //        if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }

    }
    else if(includeFile == "BoreholeLithInterval")
    {
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.DepthTopInterval)}
        if(!feature.properties.IntervalDepthBottom) { feature.properties.IntervalDepthTop = (feature.properties.DepthBottomInterval)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.InterceptDepth)}
        //------ Notes
        //if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.BHIntervalURI }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.IntervalName +" "+feature.properties.WellName+" "+feature.properties.BoreholeName+" "+feature.properties.WellName+" "+ feature.properties.OtherName}
        if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.SpudDate }
        if(!feature.properties.ActivityEnd) { feature.properties.ActivityEnd=  feature.properties.EndedDrillingDate }
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = 'Not Provided' }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.ObservationMethod}
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description }
        if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Geology data
        if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.Lithology }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.FormationDepositName }
    }
    else if(includeFile == "BoreholeLithIntercept")
    {
         //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.InterceptDepth)}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.BHInterceptURI }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.InterceptName +" "+feature.properties.WellName+" "+feature.properties.BoreholeName+" "+feature.properties.WellName+" "+ feature.properties.OtherName}
        if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.SpudDate }
        if(!feature.properties.ActivityEnd) { feature.properties.ActivityEnd=  feature.properties.EndedDrillingDate }
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = 'Not Provided' }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.ObservationMethod}
            if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description }
        if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Geology data
        if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.Lithology }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.FormationDepositName }
                //------Categoreis------
    }
    else if(includeFile == "BoreholeTemperature")
    {
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth)}
        if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.DepthOfMeasurement)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.InterceptDepth)}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.WellName+" "+feature.properties.BoreholeName+" "+feature.properties.WellName+" "+ feature.properties.OtherName}
        if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.SpudDate }
        if(!feature.properties.ActivityEnd) { feature.properties.ActivityEnd=  feature.properties.MeasurementDateTime }
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.MeasurementSource + ", "+ feature.properties.InformationSource}
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = 'Not Provided' }
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.CorrectedTemperature = 'Not Provided' }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementProcedure +", "+feature.properties.MeasurementNotes +", "+feature.properties.CorrectionType }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.LeaseOwner }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.Lithology }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.MeasurementFormation }
        if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //------Categories data
        if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.WellType +" "+ feature.properties.Function}
    }
    else if(includeFile == "CommonAnalytes")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "DirectUseSite")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = (feature.properties.OtherLocationName+" "+feature.properties.LocationKeyword  ) }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft_msl)*0.3048 }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.AnalysisURI }
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.WellBoreURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.OtherSiteID +","+ feature.properties.SpecimenID  }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.SiteName }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        //if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpecimenCollectionDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.MeasurementDateTime        }
        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.Temperature        )}//Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementProcedure+", "+ feature.properties.FlowMeasurementProcedure +", "+ feature.properties.EnergyUseProcedure        }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.SpecimenCollectionMethod       }
        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.FeatureType       }
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.HeatApplication    }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Heat application"                }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "FreeGas")
    {
        feature.properties.Name = feature.properties.SamplingFeatureName;
        feature.properties.Type = feature.properties.FeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }

    else if(includeFile == "GasIsotopes")
    {
        //feature.properties.Name = feature.properties.AnalysisName;
        //if(!feature.properties.SamplingFeatureType){feature.properties.Type = 'Not Provided'} else {feature.properties.Type = feature.properties.SamplingFeatureType}
        //feature.properties.URL = feature.properties.AnalysisURI;
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName   +" "+feature.properties.LeaseName   }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft_msl)*0.3048 }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.AnalysisURI }
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.WellBoreURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.OtherSiteID +","+ feature.properties.SpecimenID  }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.AnalysisName+" "+feature.properties.SamplingFeatureName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpecimenCollectionDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.AnalysisDateTime       }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.FluidTemperature_C )}//Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.AnalyticalProcedure +", "+ feature.properties.measurementMethod    }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.SpecimenCollectionMethod       }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SamplingFeatureType
        }
        //------Primary Result
        //        if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        //        if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "IsotopesDissolved")
    {
        //feature.properties.Name = feature.properties.AnalysisName;
        //if(!feature.properties.SamplingFeatureType){feature.properties.Type = 'Not Provided'} else {feature.properties.Type = feature.properties.SamplingFeatureType}
        //feature.properties.URL = feature.properties.AnalysisURI;
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName   +" "+feature.properties.LeaseName   }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft_msl)*0.3048 }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.AnalysisURI }
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.WellBoreURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.OtherSiteID +","+ feature.properties.SpecimenID  }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.AnalysisName+" "+feature.properties.SamplingFeatureName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpecimenCollectionDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.AnalysisDateTime       }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.FluidTemperature_C )}//Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.AnalyticalProcedure +", "+ feature.properties.measurementMethod    }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.SpecimenCollectionMethod       }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SamplingFeatureType
        }
        //------Primary Result
        //        if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        //        if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "HeatFlow")
    {

        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+ feature.properties.OtherLocationName +" "+ feature.properties.LeaseName +" "+ feature.properties.TectonicProvince }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.Elevation }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth)}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.DepthOfMeasurement)}
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.IntervalDepthTop)}
        if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.IntervalBottomDepth)}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.FacilityURI }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.ObservationName +" "+ feature.properties.WellName}
        if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.WellDrillDate }
        if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.EqLog_MeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.AdditionalSources +", "+ feature.properties.PublicationSource}
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResource+ " " +feature.properties.RelatedHeatFlowIntervalsURI }
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.EqLogTemperatureMax}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.IntervalCorrectedGradientMethod +", "+feature.properties.HF_QualityStatisticsMethod +", "+feature.properties.SiteValueMethod }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.UseApplication }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Owner }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyInformation }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.FormationName }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.WellType}
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.SiteHeatFlow }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Site Heat Flow"}
        if(!feature.properties.Uncertainty) { feature.properties.ResultType = "SE_CorrectedHeatFlow"}
    }
    else if(includeFile == "HeatPumpFacility")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.OtherLocationInformation }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.Depth_ft)*0.3048}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.IntervalDepthTop)}
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.IntervalBottomDepth)}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.FacilityURI }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.FacilityName +" "+ feature.properties.Permit}
        if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.SpudDate }
        if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.DateInstalled}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.AdditionalSources +", "+ feature.properties.PublicationSource}
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResource+ " " +feature.properties.RelatedHeatFlowIntervalsURI }
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.EqLogTemperatureMax}
        //------Methods
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.IntervalCorrectedGradientMethod +", "+feature.properties.HF_QualityStatisticsMethod +", "+feature.properties.SiteValueMethod }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.FacilityStatus }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.FacilityOwner }
        if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyDescription }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyInformation }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicFormation }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SystemType +", "+ feature.properties.HeatExchangeSystem }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.SiteHeatFlow }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Heat application"}
        if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.HeatApplication}
    }
    else if(includeFile == "HydraulicProperty")
    {

        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.OtherLocationInformation }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.Depth_ft)*0.3048}
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.DepthTopInterval_ft)*0.3048}
        if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.DepthBottomInterval_ft)*0.3048}
        //------ Notes
        //if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.FacilityURI }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.ObservationName +" "+ feature.properties.WellName}
        if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        //if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.SpudDate }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.DateInstalled}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResource+ " " +feature.properties.RelatedHeatFlowIntervalsURI }
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.EqLogTemperatureMax}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.ObservationMethod}
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.FacilityStatus }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.FacilityOwner }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.RocktyType +","+ feature.properties.Lithology}
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyInformation }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnitName }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        if(!feature.properties.Porosity) { feature.properties.porosity = feature.properties.EffectivePorosity }

        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.WellType }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.SiteHeatFlow }

        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Heat application"}
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.HeatApplication}
    }
    else if(includeFile == "ShearDisplacementStructureView")
    {
        feature.properties.Name = feature.properties.name    ;
        feature.properties.Type = feature.properties.contactType  ;
        feature.properties.URL = feature.properties.contactType_uri   ;
    }
    else if(includeFile == "ThermalSpring")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.OtherLocationName       }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth_m)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.VerticalExtentMax_m}
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.VerticalExtentMin_m}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.HypocenterURI}
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.ThermalSpringURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SamplingFeatureURI+", "+feature.properties.SpecimenURI }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSpecimenURI}
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherIdentifier    }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.SpringName+", "+feature.properties.OtherName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        //if(!feature.properties.ActivityStart)
        { if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        { if( feature.properties.TempMeasurementDateTime < feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityEnd = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityEnd = feature.properties.FlowMeasurementDateTime}    }
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source +", "+ feature.properties.MeasurementSource }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResource+ " " +feature.properties.RelatedWaterChemistry    }
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.Temperature}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.TempMeasurementProcedure +", "+ feature.properties.FlowMeasurementProcedure        }
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.RadioactivityMeasurementDevice }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.CollectionMethod}
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description +", "+ feature.properties.Remarks}
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.LandLeaseOwner   }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyTerm  +","+ feature.properties.RockName}
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.SampledFeatureMinAge_Ma }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.SampledFeatureMaxAge_Ma}
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnitName }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //if(!feature.properties.Porosity) { feature.properties.porosity = feature.properties.EffectivePorosity }
        //------Categories data
        if(!feature.properties.Type) { feature.properties.Commodity = feature.properties.FeatureType +" "+ feature.properties.Classification
        }
        //if(!feature.properties.Type) { feature.properties.Type = feature.properties.SampleType }
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.Flow }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Flow"}
        if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.StandardMagnitudeError}
    }
    else if(includeFile == "GeologicUnitView")
    {
        feature.properties.Name = feature.properties.name      ;
        feature.properties.Type = feature.properties.geologicUnitType    ;
        feature.properties.URL = feature.properties.geologicUnitType_uri     ;
    }
    else if(includeFile == "ActiveFault")
    {
        //------- Identifiers
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = 'Not Provided' }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.ParentFeatureURI = 'Not Provided' }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }

        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }

        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description }
        if(!feature.properties.Description) { feature.properties.Description = feature.properties.SpecificationURI }
       //------Geology data
        if(!feature.properties.GeologicAgeURI) { feature.properties.GeologicAgeURI = feature.properties.RepresentativeAgeURI }
        if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungerAgeURI }
        if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OlderAgeURI }
        if(!feature.properties.GeologicAge) { feature.properties.GeologicAge = feature.properties.GeologicHistory }
        //------Categoreis------
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.FeatureType +", "+  feature.properties.MovementType+", "+  feature.properties.MovementSense}
        //------Primary Result
        if(!feature.properties.ResultType) { feature.properties.ResultType = feature.properties.SlipRate }
        if(!feature.properties.Value) { feature.properties.Value = (feature.properties.TotalSlip+'-'+feature.properties.Displacement) }


        feature.properties.Type = feature.properties.FeatureURI     ;
        feature.properties.URL = feature.properties.geologicUnitType_uri     ;
    }
    else if(includeFile == "PhysicalSample")
    {

        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocationDescription +","+ feature.properties.LocationName+","+ feature.properties.LocationKeyword+","+ feature.properties.CurrentCurationLocation}
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.Depth_ft)*0.3048}
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.VerticalExtentMax_m}
        if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.VerticalExtentMin_m}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.SpecimenURI}
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.FeatureOfInterestURI }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSpecimenURI}
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.RockName}
        if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.DateCollected }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.DateInstalled}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.SourceCitation }
        if(!feature.properties.MetadatURI) { feature.properties.SourceText = feature.properties.SourceCitationURI }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResource+ " " +feature.properties.RelatedHeatFlowIntervalsURI }
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.EqLogTemperatureMax}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.AgeAssignmentBasis}
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.CollectionMethod}

        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription+", "+feature.properties.SpecimenCuration+","+ feature.properties.AccessConstraint}
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.FacilityOwner }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyTerms }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.SampledFeatureMinAge_Ma }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.SampledFeatureMaxAge_Ma}
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnitName }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //if(!feature.properties.Porosity) { feature.properties.porosity = feature.properties.EffectivePorosity }

        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SpecimenType}
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.SiteHeatFlow }

        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Heat application"}
        if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.LocationUncertaintyStatement }
    }
    else if(includeFile == "RadiogenicHeatProduction")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocalityTerms }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth_m)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.VerticalExtentMax_m}
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.VerticalExtentMin_m}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.SpecimenURI}
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.FeatureOfInterestURI }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SamplingFeatureURI+", "+feature.properties.SpecimenURI }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSpecimenURI}
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.ObservationName +", "+feature.properties.SamplingFeatureName}
        if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.SampleCollectionDate }
        if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        //if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.SourceCitation }
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResource+ " " +feature.properties.RelatedHeatFlowIntervalsURI }
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.EqLogTemperatureMax}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementProcedure }
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.RadioactivityMeasurementDevice }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.CollectionMethod}
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.TectonicProvince}
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.FacilityOwner }
        if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyTerm  +","+ feature.properties.RockName}
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.SampledFeatureMinAge_Ma }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.SampledFeatureMaxAge_Ma}
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnitName }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //if(!feature.properties.Porosity) { feature.properties.porosity = feature.properties.EffectivePorosity }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SampleType }
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.HeatProduction_mWm3 }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Heat production mWm3"}
        if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.HeatProductionUncertainty}
    }
    else if(includeFile == "LiquidAnalysis")
    {
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName   +" "+feature.properties.LeaseName   }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL)}
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.AnalysisURI }
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.WellBoreURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SamplingFeatureURI | SpecimenURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.OtherSiteID +","+ feature.properties.SpecimenID  }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.AnalysisName+" "+feature.properties.SamplingFeatureName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpecimenCollectionDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.AnalysisDate  }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source+", "+feature.properties.DataEntrySource  }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.FluidTemperature_C )}//Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.ProcedureSummary        }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.SpecimenCollectionMethod       }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.AnalysisType        }
        //------Primary Result
        //        if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        //        if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "GravityStation")
    {
        feature.properties.Label = feature.properties.ObservationLabel;
        feature.properties.Name = feature.properties.StationName   ;
        feature.properties.URL = feature.properties.ObservationURI   ;
    }
    //-----------------------------------------
    else if(includeFile == "FluidProduction")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName    }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.VentElevation }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.ContactIntervalTop        }
        if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.ContactIntervalBottom   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.FeatureURI}
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.GeologicFormationURI      }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSpecimenURI}
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.RecordName+" "+feature.properties.WellName+" "+feature.properties.Permit}
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.IntervalStartDateTime        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.IntervalEndDateTime    }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementMethod       }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.CollectionMethod}
        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description}
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.LandLeaseOwner   }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.FeatureType +" "+ feature.properties.Classification        }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.FluidType+" "+" Fluid Production Observation" }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.AverageThermalConductivity        }
        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Downobad Average Observation"        }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "Wellheader")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName   +" "+feature.properties.LeaseName   }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth)}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.ContactIntervalTop        }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.ContactIntervalBottom   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.FeatureURI}
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.HeaderURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI    }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.RecordName+" "+feature.properties.WellName+" "+feature.properties.BoreholeName+" "+feature.properties.OtherName}
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpudDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.EndedDrillingDate        }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.InformationSource        }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.Temperature_F-32)/1.8 }
        //------Methods
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementMethod       }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod    }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.Function        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.WellType +", "+ feature.properties.LogTypeTerm +", "+feature.properties.LogTypeName        }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.AverageThermalConductivity        }
        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Downobad Average Observation"        }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }



    }

    else if(includeFile == "ThermalConductivity")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocalityTerms +" "+feature.properties.SiteLocationName    }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.Elevation }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.VerticalExtentMax_m}
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.VerticalExtentMin_m}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.HypocenterURI}
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.GeologicFormationURI      }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSpecimenURI}
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.ObservationName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SampleCollectionDate}
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedSampleURI}
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.Temperature}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementProcedure        }
        if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.CollectionMethod}
        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description +", "+ feature.properties.Remarks}
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.LandLeaseOwner   }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.GeologicFormationType        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.SampledFeatureMinAge_Ma }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.SampledFeatureMaxAge_Ma}
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicFormationName    }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //if(!feature.properties.Porosity) { feature.properties.porosity = feature.properties.EffectivePorosity }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.FeatureType +" "+ feature.properties.Classification        }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.SampleType }
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.AverageThermalConductivity        }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Downobad Average Observation"        }
        if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "WellTest")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft)*0.3048 }
        if(!feature.properties.IntervalElevationTop) { feature.properties.IntervalElevationTop = (feature.properties.ElevationTopOpenZone_msl)}//*0.3048}
        if(!feature.properties.IntervalElevationBottom) { feature.properties.IntervalElevationBottom = (feature.properties.ElevationBottomOpenZone_msl  )}
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.DepthTopOpenZone )}
        if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.DepthBottomOpenZone}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.LogURI    }
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.TargetFeatureURI        }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.WellHeaderURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.TestName +" "+feature.properties.WellName}
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.TestDateTime        }
        //if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.DateTimeLogRun        }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.FormationTemperature    )}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.ShutInPressureMethod +", "+feature.properties.HydrostaticPressureMethod +","+ feature.properties.FlowPressureMethod +","+feature.properties.EquilibriumPressureMethod   }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod    }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.TestTypeDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.TestOperator    }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.TargetFormation        }
        if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.TestType }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "DrillStemTest")
    {
        /*if(!feature.properties.County) { feature.properties.County = 'Not Provided' }
        if(!feature.properties.State) { feature.properties.State = 'Not Provided' }
        if(!feature.properties.WellType) { feature.properties.Type = 'Not Provided' } else { feature.properties.Type = feature.properties.WellType }
        if(!feature.properties.MineName) { feature.properties.Name = 'Not Provided' } else { feature.properties.Name = feature.properties.WellName }
        if(!feature.properties.WellHeaderURI) { feature.properties.URL = 'Not Provided' } else { feature.properties.URL = feature.properties.WellHeaderURI }*/
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft)*0.3048 }
        if(!feature.properties.IntervalElevationTop) { feature.properties.IntervalElevationTop = (feature.properties.ElevationTopOpenZone_msl)}//*0.3048}
        if(!feature.properties.IntervalElevationBottom) { feature.properties.IntervalElevationBottom = (feature.properties.ElevationBottomOpenZone_msl  )}
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.DepthTopOpenZone )}
        if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.DepthBottomOpenZone}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        //if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.LogURI    }
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.TargetFeatureURI        }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.WellName}
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.DSTDateTime        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.StatusDate}

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.FormationTemperature    )}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.FlowPressureMethod}
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod    }
        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.TestTypeDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        if(!feature.properties.Operator) { feature.properties.WellBoreShape =feature.properties.DSTOperator    }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.UnitsOfMeasure}
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.WellType }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "WellLog" || includeFile == "AZWellLogs")
    {
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.Field +" "+feature.properties.OtherLocationName   +" "+feature.properties.LeaseName   }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.ElevationGL_ft)*0.3048 }
        if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.LogURI    }
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.WellBoreURI        }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentWellURI        }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.DisplayName+" "+feature.properties.WellBoreName}
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpudDate        }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.DateTimeLogRun
        }

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source
        }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.Temperature_F-32)/1.8 }
        //------Methods
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementMethod       }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod    }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.Keywords        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        //if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.WellType +", "+ feature.properties.Function}
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.ScannedFileURL     }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Download Scanned Log"    }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "SingleAnalytes")
    {
        feature.properties.Type = feature.properties.SpecimenType  ;
        feature.properties.Name = feature.properties.AnalysisName   ;
        feature.properties.URL = feature.properties.AnalysisURI   ;
    }
    else if(includeFile == "VolcanicVent")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocalityTerms +" "+feature.properties.LocationKeyword        }
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.VentElevation }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.VerticalExtentMax_m}
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.VerticalExtentMin_m}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.FeatureURI}
        //if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.GeologicFormationURI      }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SiteLocationURI        }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSpecimenURI}
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.VolcVentName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        //if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SampleCollectionDate}
        //if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}

        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedFeature        }
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.Temperature}
        //------Methods
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementProcedure        }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.CollectionMethod}
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.Description}
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.LandLeaseOwner   }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.MaterialComposition        }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnit +","+ feature.properties.VolcanicGroup       }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.GeologicHistory        }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.FeatureType +" "+ feature.properties.Classification        }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.FeatureType +" "+ feature.properties.FlowType        }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.AverageThermalConductivity        }
        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Downobad Average Observation"        }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    else if(includeFile == "WRMajorElements")
    {
            //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocalityTerms}
        //----- Vertical Data
        if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = (feature.properties.Elevation)}
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerDepth_ft)*0.3048}//*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.TopLoggedInterval_ft)*0.3048    }
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = (feature.properties.BottomLoggedInterval_ft )*0.3048   }
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.AnalysisURI }
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.OtherAnalysisID        }
        if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SamplingFeatureURI +", "+ feature.properties.SpecimenURI    }
        if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSampleURI        }
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID    }
        if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.SpecimenID  }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.AnalysisName+" "+feature.properties.SamplingFeatureName        }
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart){feature.properties.ActivityStart = feature.properties.SpecimenCollectionDate    }
        if(!feature.properties.ActivityEnd){feature.properties.ActivityEnd = feature.properties.AnalysisDate        }
        //{ if( feature.properties.TempMeasurementDateTime > feature.properties.FlowMeasurementDateTime)  {feature.properties.ActivityStart = feature.properties.TempMeasurementDateTime }  else {feature.properties.ActivityStart = feature.properties.FlowMeasurementDateTime}    }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source        }
        if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //if(!feature.properties.Citation) { feature.properties.SourceText = feature.properties.SourceURI    }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResources}
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  (feature.properties.Temperature        )}//Temperature_F-32)/1.8 }
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.ProcedureSummary        }
        //if(!feature.properties.Instruments) { feature.properties.Instruments = feature.properties.MeasurementDevice        }
        if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.SampleCollectionMethod    }
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.SpecimenDescription        }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.MineralOwner        }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector        }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyTerms +", "+ feature.properties.MaterialClass +", "+ feature.properties.RockName    }
        //if(!feature.properties.LithologyName) { fe            ature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.YoungestAge        }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.OldestAge        }
        if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.SampledGeologicUnit        }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD    }
        if(!feature.properties.GeologicalAge) { feature.properties.porosity = feature.properties.SampledGeologicUnitAge    }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest    }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.AnalysisType+", "+feature.properties.SpecimenType        }
        //------Primary Result
        //if(!feature.properties.Value) { feature.properties.Value = feature.properties.HeatApplication    }
        //if(!feature.properties.ResultType) { feature.properties.ResultType = "Heat application"                }
        //if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.UncertaintyTC        }
    }
    //-------------------------------------------
    else if(includeFile == "Hypocenter")
    {
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocalityTerms }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        //if(!feature.properties.MaxDepth) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth_ft)*0.3048}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.SampleDepth_m)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = feature.properties.VerticalExtentMax_m}
        //if(!feature.properties.IntervalBottomDepth) { feature.properties.IntervalBottomDepth = feature.properties.VerticalExtentMin_m}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI) { feature.properties.ObservationURI = feature.properties.HypocenterURI}
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.EventURI}
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.SamplingFeatureURI+", "+feature.properties.SpecimenURI }
        //if(!feature.properties.ParentFeatureURI) { feature.properties.ParentFeatureURI = feature.properties.ParentSpecimenURI}
        //if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.EventName}
        //if(!feature.properties.Label) { feature.properties.Label=  feature.properties.SpecimenLabel}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.OriginDateTime }
        //if(!feature.properties.ActivityEnd) {feature.properties.ActivityEnd = feature.properties.SampleMeasurementDate}
        //------ Source Data
        //if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.SourceCitation }
        //if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source }
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        //if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = feature.properties.RelatedResource+ " " +feature.properties.RelatedHeatFlowIntervalsURI }
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.EqLogTemperatureMax}
        //------Methods
        if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.Methodology +", "+ feature.properties.DepthDeterminationMethod }
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.RadioactivityMeasurementDevice }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.CollectionMethod}
        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.RelatedFault +", "+ feature.properties.SeisometerNetwork}
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.FacilityOwner }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Laboratory }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //if(!feature.properties.Observer) { feature.properties.Observer =feature.properties.SpecimenCollector }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyTerm  +","+ feature.properties.RockName}
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.LithologyInformation }
        //if(!feature.properties.GeologicAgeYounger) { feature.properties.GeologicAgeYounger = feature.properties.SampledFeatureMinAge_Ma }
        //if(!feature.properties.GeologicAgeOlder) { feature.properties.GeologicAgeOlder = feature.properties.SampledFeatureMaxAge_Ma}
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.GeologicUnitName }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //if(!feature.properties.Porosity) { feature.properties.porosity = feature.properties.EffectivePorosity }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        //if(!feature.properties.Type) { feature.properties.Type = feature.properties.SampleType }
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.Magnitude }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Magnitude"}
        if(!feature.properties.Uncertainty) { feature.properties.ResultType = feature.properties.StandardMagnitudeError}
    }
    else if(includeFile == "IsotopesDissolved")
    {
        //feature.properties.Name = feature.properties.AnalysisName;
        //feature.properties.Type = feature.properties.SamplingFeatureType;
        //feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "MajorDissolvedConstituents")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "MinorDissolvedConstituents")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "MineralRecoveryBrine")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "Nitrogen")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "PowerPlantFacility")
    {
        //---- Location Data
        if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocationKeyword }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth)}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.DepthOfMeasurement)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.InterceptDepth)}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.FacilityURI }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.PlantName}
        if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.OperationalDate }
        if(!feature.properties.ActivityEnd) { if (feature.properties.Status ==  'InActive'|| feature.properties.Status ==  'In Active'){feature.properties.ActivityEnd = feature.properties.StatusDate} }
        //------ Source Data
        if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source}
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = 'Not Provided' }
        //  ------Temperature Data
        if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.FluidTemperature_C}
        //------Methods
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementProcedure +", "+feature.properties.MeasurementNotes +", "+feature.properties.CorrectionType }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        if(!feature.properties.Details) { feature.properties.Details = feature.properties.UseApplication }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
       //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Owner }
        if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.Lithology }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.MeasurementFormation }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.PlantType}
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.Capacity_MW }
        if(!feature.properties.ResultType) { feature.properties.ResultType = feature.properties.Capacity_MW}
    }
    else if(includeFile == "PlantProduction")
    {
        //---- Location Data
        //if(!feature.properties.LocationName) { feature.properties.LocationName = feature.properties.LocationKeyword }
        //----- Vertical Data
        //if(!feature.properties.surfaceElevation) { feature.properties.surfaceElevation = feature.properties.ElevationGL }
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.DrillerTotalDepth)}
        //if(!feature.properties.Depth) { feature.properties.Depth = (feature.properties.DepthOfMeasurement)}
        //if(!feature.properties.IntervalDepthTop) { feature.properties.IntervalDepthTop = (feature.properties.InterceptDepth)}
        //------ Notes
        if(!feature.properties.AllText) { feature.properties.AllText = feature.properties.Notes }
        //------- Identifiers
        if(!feature.properties.ObservationURI ) { feature.properties.ObservationURI  = feature.properties.PlantProductionStatURI        }
        if(!feature.properties.FeatureURI) { feature.properties.FeatureURI = feature.properties.PowerPlantFacilityURI      }
        //if(!feature.properties.SamplingFeatureURI) { feature.properties.SamplingFeatureURI = feature.properties.HeaderURI }
        if(!feature.properties.Identifier) { feature.properties.Identifier = feature.properties.OtherID }
        //if(!feature.properties.SamplingFeatureIdentifier) { feature.properties.SamplingFeatureIdentifier = feature.properties.APINo }
        //------ Names
        if(!feature.properties.Name) { feature.properties.Name =  feature.properties.PlantProductionStatLabel+" "+feature.properties.PlantName        }
        //if(!feature.properties.Label) { feature.properties.Label=  'Not Provided'}
        //------ Date Information
        if(!feature.properties.ActivityStart) { feature.properties.ActivityStart =  feature.properties.StartReportInterval        }
        if(!feature.properties.ActivityEnd) { feature.properties.ActivityEnd = feature.properties.EndReportInterval         }
        //------ Source Data
        //if(!feature.properties.SourceText) { feature.properties.SourceText = feature.properties.Source}
        //if(!feature.properties.MetadataURI) { feature.properties.MetadataURI = 'Not Provided' }
        //------ Status Data
        //if(!feature.properties.Status) { feature.properties.Status = 'Not Provided' }
        //  ------Related Data
        if(!feature.properties.RelatedResource) { feature.properties.RelatedResource = 'Not Provided' }
        //  ------Temperature Data
        //if(!feature.properties.GeothermalTemperature) { feature.properties.GeothermalTemperature =  feature.properties.FluidTemperature_C}
        //------Methods
        //if(!feature.properties.Procedures) { feature.properties.Procedures = feature.properties.MeasurementProcedure +", "+feature.properties.MeasurementNotes +", "+feature.properties.CorrectionType }
        //if(!feature.properties.SamplingProcess) { feature.properties.SamplingProcess = feature.properties.DrillingMethod}

        //-----Description Terms
        //if(!feature.properties.Details) { feature.properties.Details = feature.properties.UseApplication }
        //if(!feature.properties.FeatureDescriptionURI) { feature.properties.FeatureDescriptionURI = feature.properties.SpecificationURI }
        //------Well data
        //if(!feature.properties.WellBoreShape) { feature.properties.WellBoreShape ='Not Provided' }
        //------Contact data
        //if(!feature.properties.Operatpor) { feature.properties.WellBoreShape =feature.properties.Operatpor }
        //if(!feature.properties.Owner) { feature.properties.Owner =feature.properties.Owner }
        //if(!feature.properties.Contact) { feature.properties.Contact =feature.properties.FacilityContact }
        //------Geology data
        //if(!feature.properties.LithologyURI) { feature.properties.LithologyURI = feature.properties.LepresentativeLithologyURI }
        //if(!feature.properties.LithologyName) { feature.properties.LithologyName = feature.properties.Lithology }
        //if(!feature.properties.GeologicUnit) { feature.properties.GeologicUnit = feature.properties.MeasurementFormation }
        //if(!feature.properties.DeepestStratUnit) { feature.properties.DeepestStratUnit = feature.properties.FormationTD }
        //------Categories data
        //if(!feature.properties.Commodity) { feature.properties.Commodity = feature.properties.CommodityOfInterest }
        if(!feature.properties.Type) { feature.properties.Type = feature.properties.PlantType}
        //------Primary Result
        if(!feature.properties.Value) { feature.properties.Value = feature.properties.GrossProduction_MWhr        }
        if(!feature.properties.ResultType) { feature.properties.ResultType = "Gross electrical Production MWhr"        }
    }
    else if(includeFile == "SingleAnalyte")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "WaterDissolvedGas")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "WaterIsotopes")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else if(includeFile == "WaterQuality")
    {
        feature.properties.Name = feature.properties.AnalysisName;
        feature.properties.Type = feature.properties.SamplingFeatureType;
        feature.properties.URL = feature.properties.AnalysisURI;
    }
    else
        console.log("Feature "+includeFile + " Not Found..!");
    return (feature);
};