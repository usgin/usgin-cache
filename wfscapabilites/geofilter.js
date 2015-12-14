var geofilter = require('geofilter');
var wfs = require('wfs');
var fs = require('fs'),
    xml2js = require('xml2js'),
    util = require('util');
// Convert XML 2 JSON

var parser = new xml2js.Parser();
fs.readFile('response.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        //console.dir(util.inspect(result, false, null));
        var jsonString = util.inspect(result, false, null);
        fs.writeFile('response.json',jsonString, function(err){
            if(err){ console.log("Error Writing File");}
        });
        console.log('Done');
    });
});




//var url = 'http://services.azgs.az.gov/ArcGIS/services/aasggeothermal/CAThermalSprings/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring';
// create some rules for geofilter to work with
var rules = {};




// define the isSinkhole rule
rules.isSinkhole = {
    type: 'like',
    args: {
        property: 'TEXTNOTE',
        value: 'sinkhole',
        matchCase: false
    }
};

// define the inQLD rule
rules.inQLD = {
    type: 'bbox',
    args: {
        property: 'the_geom',
        min: '-28.94 138.01',
        max: '-9.54 154.42'
    }
};

function handleFeatures(err, results) {
    if (err) {
        return console.log('ERROR: ', err);
    }

    if (results.features) {
        console.log('found ' + results.features.length + ' caves');
        results.features.forEach(function(feature) {
            console.log('found feature: ' + feature.id);
        });
    }
}

wfs.getFeature({
    url: 'http://services.azgs.az.gov/ArcGIS/services/aasggeothermal/CAThermalSprings/MapServer/WFSServer?request=Getfeature&service=wfs&version=1.1.0&TypeName=ThermalSpring',
    typeName: 'Terrain:caves',
    filter: new geofilter.RuleSet([rules.isSinkhole, rules.inQLD]).to('ogc')}, handleFeatures);