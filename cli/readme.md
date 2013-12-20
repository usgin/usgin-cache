# USGIN-Cache Command Line Interface

This tool is used for interacting with the USGIN-Cache tools through a UNIX command line interface (CLI).

## Examples

Just harvest metadata from a CSW

    pc:user$ node cli -c http://catalog.stategeothermaldata.org/geoportal/csw

Harvest metadata from a CSW, then gather ThermalSpring features from WFS servers and convert them to GeoJSON

    pc:user$ node cli -c http://catalog.stategeothermaldata.org/geoportal/csw -t aasg:ThermalSpring

Gather ThermalSpring features from WFS servers based on metadata that already has been cached

    pc:user$ node cli -t aasg:ThermalSpring

Refresh your local cache of metadata from a CSW

    pc:user$ node cli -c http://catalog.stategeothermaldata.org/geoportal/csw -r csw

Refresh WFS GetCapabilities docs in your cache

    pc:user$ node cli -t aasg:ThermalSpring -r capabilities

Refresh WFS GetFeature requests in your cache for Thermal Spring features

    pc:user$ node cli -t aasg:ThermalSpring -r features

Refresh WFS GetCapabilities docs and WFS GetFeature requests in your cache for Thermal Spring features

    pc:user$ node cli -t aasg:ThermalSpring -r capabilities,features

Use a mapping function to index Thermal Springs features in Solr

    pc:user$ node cli -m thermalSprings -i

Use a mapping function to send Thermal Springs features to PostGIS

    pc:user$ node cli -p postgres://user:password@localhost:5432/databasename -m thermalSprings -i

Use a mapping function to build clustered features for Thermal Springs

    pc:user$ node cli -p postgres://user:password@localhost:5432/databasename -m thermalSprings -g

## Command Line Interface API

In the root folder, issuing the command `node cli` will generate a list of options and parameters that can be passed into the CLI.  Or, by globally installing the program (`npm install -g`), the CLI tool will be available via `usginCache`.

### --cswUrl, -c [optional]
The URL for a CSW containing feature you'd like to cache

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw

### --featureType, -t [optional]
The name of a WFS FeatureType that you'd like to cache, based on WFS URLs found in documents already cached from a CSW.

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault

### --dbUrl, -d [optional, default: "http://localhost:5984"]
The URL for CouchDB

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault --dbUrl http://some_url:some_port

### --dbName, -n [optional, default: "usgin-cache"]
The name of the cache database

    pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault --dbUrl http://some_url:some_port --dbName my_database

### --featuresName, -f [optional, default: "usgin-features"]
The name of the feature database. This could be useful if you want to put different kinds of features into different CouchDB databases.

    pc:user$ node cli --featureType aasg:BoreholeTemperature --featuresName bht-features

### --postgresql, -p [optional]
A connection string for a PostGIS-enabled PostgreSQL database.

    pc:user$ node cli --postgresql postgres://user:password@localhost:5432/mydatabase -m thermalSprings -a

### --mapping, -m [optional]
The name of a mapping function that can be used to index a particular set of features. Valid mapping functions are defined in `features/design/mappings`.

    pc:user$ node cli --mapping thermalSprings -i

### --index, -i [optional]
If specified, sends features to a Solr index. **Important:** You must also specify a mapping function (`--mapping`) indicating which features should be indexed.

    pc:user$ node cli --mapping thermalSprings --index

### --toPostGis, -a [optional]
If specified, sends features to a PostGIS table. **Important:** You must specify a PostgreSQL connection string (`--postgresql`) and a mapping function (`--mapping`).

    pc:user$ node cli --postgresql postgres://user:password@localhost:5432/mydatabase -m thermalSprings --toPostGis

### --cluster, -g [optional]
If specified, the cache of clustered features will be rebuilt from data already contained in PostGIS. **Important:** You must specify a PostgreSQL connection string (`--postgresql`) and a mapping function (`--mapping`).

    pc:user$ node cli --postgresql postgres://user:password@localhost:5432/mydatabase -m thermalSprings --cluster

### --refresh, -r [optional]
If specified, data already in the cache will be replaced. You can specify which aspects of the OGC cache you wish to replace by indicating any comma-separated set of `csw,capabilities,features`. 

- `csw`: updates CSW GetRecords and GetRecordById requests
- `capabilities`: updates WFS GetCapabilities requests
- `features`: updates WFS GetFeature requests

```
pc:user$ node cli --cswUrl http://catalog.stategeothermaldata.org/geoportal/csw --featureType aasg:ActiveFault --dbUrl http://some_url:some_port --dbName my_database --refresh csw,capabilities,features
```