var fs        = require('fs');
var XmlStream = require('xml-stream') ;
var stream=fs.createReadStream('C:/usgin-cache/tests/1.xml');
var xml = new XmlStream(stream);
xml.preserve('id', true);
xml.collect('subitem');
xml.on('endElement: id', function(item) {
    console.log(item);
});