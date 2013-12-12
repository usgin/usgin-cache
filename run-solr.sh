#!/usr/bin/env bash

download() {
    echo "Downloading solr from $1..."
    curl -s $1 | tar xz
    echo "Downloaded"
}

is_solr_up(){
    http_code=`echo $(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8983/solr/admin/ping")`
    return `test $http_code = "200"`
}

wait_for_solr(){
    while ! is_solr_up; do
        sleep 3
    done
}

run() {
    echo "Starting solr ..."
    cd $1/example
    java -jar start.jar
    wait_for_solr
    cd ../../
    echo "Started"
}

post_some_documents() {
    java -Dtype=application/json -Durl=http://localhost:8983/solr/update/json -jar $1/example/exampledocs/post.jar $2
}


download_and_run() {
    url="http://archive.apache.org/dist/lucene/solr/4.4.0/solr-4.4.0.tgz"
    dir_name="solr-4.4.0"
    dir_conf="collection1/conf/"

    if [ ! -d "$dir_name" ]; then
        download $url
    fi

    # copies custom configurations
    file="solr/schema.xml"

    if [ -f $file ]
    then
        cp $file $dir_name/example/solr/$dir_conf
        echo "Copied $file into solr conf directory."
    fi

    # Run solr
    run $dir_name
}

download_and_run $SOLR_VERSION
