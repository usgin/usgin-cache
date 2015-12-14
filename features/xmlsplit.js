/**
 * Created by nahmed on 9/10/2015.
 */
var XmlSplit = require('xmlsplit'),
    fs = require('fs'),
    geoJson = require('./toGeoJson'),
    ogr = geoJson(),
    jsonStream = require('JSONStream');
var data= '' ;
var str = require('string-to-stream');
var saxpath = require('saxpath');
var xmlObjs = [];
var _ = require('underscore');
var sax     = require('sax'),
bulkWriter = jsonStream.stringify();
var items = "asdf adsf";
var fileStream = fs.createReadStream('2.xml');
var saxParser  = sax.createStream(true);
var streamer   = new saxpath.SaXPath(saxParser, '//gml:featureMember');
var i = 0;
streamer.on('match', function(xml) {
    //console.log('--- matched XML ---');
    if (i == 0)
    {
        xmlObjs.push(xml);
    }
    i = i +1;
    //console.log(xml);
});
var Points = '';
var parser = jsonStream.parse('features.*')
    .on('data', function (feature) {
        if(feature.geometry.type != "point"){
            Points == '';
            //usgin_cache = '';
        }

        //feature = featuresModify(featureType,feature,this.callback); //Create common Attributes (like Name,Type) across the features JSON
        bulkWriter.write({
            //cacheId: cacheId,
            //baseUrl: url,
            //featuretype: featureType,
            feature: feature
        });
    })
    .on('end', bulkWriter.end);

streamer.on('end', function() {
    console.log('--- End Writing ---');
    console.log(xmlObjs);
    _.each(xmlObjs, function (item, index) {
        //item = "\<wfs:FeatureCollection xsi:schemaLocation='http://stategeothermaldata.org/uri-gin/aasg/xmlschema/welllog/0.8 http://services.azgs.az.gov/arcgis/services/NGDS/EGIWellLogs/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=WellLog http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd' xmlns:aasg='http://stategeothermaldata.org/uri-gin/aasg/xmlschema/welllog/0.8' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\>\<gml:boundedBy\>\<gml:Envelope srsName='urn:ogc:def:crs:EPSG:6.9:4326'\>\<gml:lowerCorner\>7.9516660000000456 -122.37147999999996\</gml:lowerCorner\>\<gml:upperCorner\>43.996100000000069 -14.374999999999943\</gml:upperCorner\>\</gml:Envelope\>\</gml:boundedBy\>"+item+"\</wfs:FeatureCollection\>";
        item = "\<wfs:FeatureCollection xsi:schemaLocation='http://stategeothermaldata.org/uri-gin/aasg/xmlschema/welllog/0.8 http://services.azgs.az.gov/arcgis/services/NGDS/EGIWellLogs/MapServer/WFSServer?request=DescribeFeatureType%26version=1.1.0%26typename=WellLog http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd' xmlns:aasg='http://stategeothermaldata.org/uri-gin/aasg/xmlschema/welllog/0.8' xmlns:gml='http://www.opengis.net/gml' xmlns:wfs='http://www.opengis.net/wfs' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\>"+item+"\</wfs:FeatureCollection\>";
        console.log(item);
        str(item).pipe(ogr.input);

       /*var StringDecoder = require('string_decoder').StringDecoder;
        var decoder = new StringDecoder('utf8');
        ogr.output.on("data", function (chunk){ if (chunk) console.log(decoder.write(chunk)) });
        ogr.err.on("data", function (chunk) { if (chunk) console.log(decoder.write(chunk)) });
        ogr.output.on("exit", function (code) {
            if (code) console.log(new Error("failed with "+code));
            else console.log("ok")
        });*/

    });
});
ogr.output.pipe(parser);
fileStream.pipe(saxParser);