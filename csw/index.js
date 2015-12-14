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
    dom = require('xmldom').DOMParser,
    fileArray ='', InvalidReqCounter = 0,
    fs = require('fs');

// Index files used to harvest CSW files for WFS Responses
// fs.readFile called first and read CSW keywords from the csv, put those keywords into an array
// and asynchronously called harvestFile function for each keyword
// harvestFile create a URL using keyword and harvest each section of CSW Response, and creates XML body
// This XML body is send over to harvestCSW page in order to extract WFS URL

var harvestFile = function(usgin_keyword, doneCallback){
    //console.log(array[i]);
    //url = "http://catalog.usgin.org/geoportal/csw?service=csw&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=results&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&maxRecords=1000&startPosition=0&outputFormat=application/xml&CONSTRAINTLANGUAGE=Filter&Constraint=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Esubject%3C/PropertyName%3E%3CLiteral%3E"+usgin_keyword+"%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&constraint_language_version=1.1.0";
    url = "http://catalog.usgin.org/geoportal/csw?service=csw&version=2.0.2&request=GetRecords&typeNames=csw:Record&resultType=results&elementSetName=full&outputSchema=http://www.isotc211.org/2005/gmd&startPosition=0&outputFormat=application/xml&CONSTRAINTLANGUAGE=Filter&Constraint=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Esubject%3C/PropertyName%3E%3CLiteral%3E"+usgin_keyword+"%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&constraint_language_version=1.1.0";
    //console.log(usgin_keyword +"-->"+ url);
    var parseString = require('xml2js').parseString;
    var xml = '';
    var client = csw(url, options),
        harvester = client.harvest(harOptions);
        harvester.on('err',function(err){
        //console.log('Error is:'+ err);
    });
    var body = '';
    harvester.on('data', function (chunk) {
        body += chunk;//.transferOptions.MD_DigitalTransferOptions.onLine.CI_OnlineResource.linkage.URL');
        //console.log(body.name());
    });
    harvester.on('end', function () {
        var xpath = require('xpath')
            , dom = require('xmldom').DOMParser;
        body = body.toString();
        body = body.replace(/"/g, "'");
        if(body.length > 0)
        {
            getWFSUrls().getUrls(body,usgin_keyword,url);
            featuresetCounter+=1
            console.log("Current Num: "+ featuresetCounter)
        }
        else {
            featuresetCounter+=1
            InvalidReqCounter +=1;
            console.log("Current Num: "+ featuresetCounter)
            console.log("Invalid Reguest #"+InvalidReqCounter+" for '" +usgin_keyword + "'");
        //Write the usgin_keywords in a file that are not working
        fs.appendFile('usgin_keywords_error.txt',usgin_keyword+"\r\n" , function (error) {
            if (error) throw error;
        });
        }
    });
    harvester.on('error', function (err) {
        console.log("Error Throuwn"+err);
    });
        return doneCallback(null,usgin_keyword);
    }; // for(i in array)

var featuresetCounter = 0;
fs.readFile('usginkeywords.csv', function(err, data) {
    if(err) throw err;
    fileArray = data.toString().split(",");
    console.log("Total Reco:rds " + fileArray.length);
    var queue = async.queue(harvestFile, 5); // Run ten simultaneous uploads
    queue.drain = function() {
        console.log(featuresetCounter + "XML uploaded");
        featuresetCounter+=1;
    };
    // Queue your files for upload
    queue.push(fileArray);
    queue.concurrency = 2; // Increase to twenty simultaneous uploads

     /*   async.map(fileArray, harvestFile, function(err,result){
        if(err){ console.log(err);}
        console.log("Finished!");
        console.log(result);
    });*/
}); //fs.readFile
  //    console.log(fileArray.length);