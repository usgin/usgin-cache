# USGIN-Cache Command Line Interface

This tool is used for interacting with the USGIN-Cache tools through a UNIX command line interface (CLI).

## Command Line Interface API

In the root folder, issuing the command `pc:user$ node cli` will generate a list of options and parameters that can be passed into the CLI.

### --cswUrl, -c [required]
The URL for a csw containing feature you'd like to cache

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw

### --featureType, -f [optional, default: ""]
The name of a WFS FeatureType that you'd like to cache

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault

### --dbUrl, -d [optional, default: "http://localhost:5984"]
The URL for CouchDB

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault --dbUrl http://some_url:some_port

### --dbName, -n [optional, default: "usgin-cache"]
The name of the cache database

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault --dbUrl http://some_url:some_port --dbName my_database

### --refresh, -r [optional]
If specified, data already in the cache will be replaced

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault --dbUrl http://some_url:some_port --dbName my_database --refresh