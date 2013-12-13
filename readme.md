# usgin-cache
[![Build Status](https://travis-ci.org/usgin/usgin-cache.png?branch=master)](https://travis-ci.org/usgin/usgin-cache) 

In a [USGIN-style](http://usgin.org) data systems, data sets are conveyed as OGC Web-Feature Services (WFS), and are served by a distributed network of data providers. Each of these services is cataloged in one (or several) metadata-aggregating services that conform to the OGC's Catalog Service for the Web (CSW).

This means that a user can find data sets by

1. performing a thematic or spatial search against a CSW service,
2. analyzing the results to determine which might be fit for the purpose at hand, and
3. following a pointer to the WFS dataset of interest.

This workflow requires the user to do a lot of work _before they even get to see the data_. After step #3, the user may realize that the data they wanted isn't in the particular WFS that they chose, and they'll have to repeat the process. 

#### This software brings the data itself closer to the search experience

The end goal is to provide the user with a dynamic map that _displays actual data_, or at least enough of the data to give the user a better, more immediate idea of exactly what is available. This is an important target because its been shown that the first search priority for users searching for geoscientific data is location. We want a map that allows you to zoom to a location and see whats available there _before_ you begin any thematic or keyword filtering to narrow down the results.

In order to achieve this, this software works as follows:

1. A request is made to an aggregating CSW service in order to find WFS services that meet some particular criteria. The module for making these CSW requests allows for some configuration in order to specify what kinds of WFS services are of interest. 
2. The resulting set of WFS services are queried in order to return ALL of the data that is available from that service. The entire WFS response document is cached in CouchDB. The resulting document is transformed into [GeoJSON](http://geojson.org) using [ogr2ogr](http://www.gdal.org/ogr2ogr.html) (see `features/toGeojson.js`). Each feature from the WFS response is then stored in CouchDB as a GeoJSON object. These cached objects can be refreshed whenever required.
3. Mapping function are written which indicate how a single GeoJSON feature should be indexed. These function are passed one GeoJSON feature, and return a simple JSON object representing the key-value pairs that will be included in a [Solr index](http://lucene.apache.org/solr/).
4. A cached document is read and the features it contains are each passed through the mapping function before being added to the Solr index.

This Solr index will provide an endpoint that can be searched by a thin, front-end client, such as one envisioned above.

## Installation

### Pre-requisite Installations:

- [Git](http://git-scm.com/)
- [Node.js](http://nodejs.org/)
- [Apache Solr]((http://lucene.apache.org/solr/)
- [CouchDB](http://couchdb.apache.org/)
- [GDAL/OGR](http://gdal.org)

### Then:

    git clone https://github.com/usgin/usgin-cache.git
    cd usgin-cache
    npm install

## Configuration

... hmm ...

### Connect to Solr

There is a bash script included that will download, configure, and run Solr for you. To use it, just type

    chmod 755 run-solr.sh
    ./run-solr.sh

### Writing Mapping Functions

Mapping functions define how certain kinds of features are indexed by Solr. These function read GeoJSON data from CouchDB and convert it to an object that can be easily ingested by Solr. The properties of the converted object become the fields on which you can search.

For the NGDS, the idea is to write mapping functions only for [USGIN Content Models of Interest](http://schemas.usgin.org/models). As an example, see the documented code describing the mapping of the [aasg:ThermalSpring model](http://usgin.github.io/usgin-cache/doc/features/design/mappings/thermalSprings.html).

## Code Docs

Build documentation from code comments with [groc]. These docs live on the `gh-pages` branch and [are accessible here](http://usgin.github.io/usgin-cache/doc/).

To rebuild them, follow these instructions:

```shell
git checkout gh-pages
git merge master
npm install
groc
```

## Running Tests:

To run unit tests:

    npm test
