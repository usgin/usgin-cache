var xpath = require('xpath')
    , dom = require('xmldom').DOMParser,
    request = require('request'),
    dbPointer = require('./../wfscapabilites/mongoconn').WFSCache,
    count = null;

// This page uses XPath Library to loop through total <gmd:URL> tags of xml body
// Then only selects URLs containing the text 'service=WFS'

module.exports= function(forceRefresh){

    return{
    getUrls: function(xmlDoc,featuretype, baseUrl){
        var doc = new dom().parseFromString(xmlDoc), urlString = '', flagSearch = 0, total=0;
        var select = xpath.useNamespaces({"gmd": "http://www.isotc211.org/2005/gmd",  "gco": 'http://www.isotc211.org/2005/gco' });
        count = select('count(//gmd:URL/text())', doc);
        for (var i = 0, len = count; i < len; i++) {
            urlString = select('//gmd:URL/text()', doc)[i].nodeValue ;
            flagSearch = urlString.search("service=WFS");  //flagSearch is total Number of service=WFS etries found in CSW file
            if (flagSearch > 0){
                total +=1;
                var WFSRecord = new dbPointer({ wfsurl: urlString, featureType: featuretype, cswURL:baseUrl });
                WFSRecord.save();
            }
            flagSearch = 0;
        }
       console.log('Total :'+ total+' For :'+featuretype)
    }

    }
};
