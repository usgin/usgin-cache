/**
 * Created by nahmed on 7/8/2015.
 */
var csw = require('csw-client'),
    options = '',//{maxSockets:'2'},
    harOptions = {step:'20',concurrency:'5'},
    getWFSUrls = require('./harvestCSW'),
    util = require('util'),
    _ = require('underscore'),
    async = require('async'),
    //usgin_keyword = "usgincm:Abandoned Mines",
    //url = "http://catalog.usgin.org/geoportal/csw?service=csw&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=results&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&maxRecords=20&startPosition=0&outputFormat=application/xml&CONSTRAINTLANGUAGE=Filter&Constraint=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Esubject%3C/PropertyName%3E%3CLiteral%3E"+usgin_keyword+"%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&constraint_language_version=1.1.0",
    xpath = require('xpath'),
    dom = require('xmldom').DOMParser;

    var fs = require('fs');
    fs.readFile('usgin-keyword.csv', function(err, data) {
    if(err) throw err;
    var array = data.toString().split(",");

    for(i in array) {
        //console.log(array[i]);
        usgin_keyword = array[i];
        console.log(usgin_keyword);
        url = "http://catalog.usgin.org/geoportal/csw?service=csw&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=results&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&maxRecords=20&startPosition=0&outputFormat=application/xml&CONSTRAINTLANGUAGE=Filter&Constraint=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Esubject%3C/PropertyName%3E%3CLiteral%3E"+usgin_keyword+"%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&constraint_language_version=1.1.0"
        console.log(url);

var parseString = require('xml2js').parseString;
var xml = '';

var client = csw(url, options),
    harvester = client.harvest(harOptions);

harvester.on('err',function(err){
   console.log('Error is:'+ err);
});
 /*
harvester.on('data', function(record) {
    console.log(util.inspect(record.length(),null,false));
    //console.log(record);
});

*/
var body = '';
    harvester.on('data', function (chunk) {
        body += chunk;//.transferOptions.MD_DigitalTransferOptions.onLine.CI_OnlineResource.linkage.URL');
        //console.log(body.name());
    });

    harvester.on('end', function () {
        var xpath = require('xpath')
            , dom = require('xmldom').DOMParser
        body = body.toString();
        body = body.replace(/"/g, "'");
        getWFSUrls().getUrls(body,usgin_keyword,url);

    });

    } // for(i in array)
    }); //fs.readFile