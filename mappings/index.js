module.exports = function(includeFile){
    includeFile = includeFile.split(':')[1];
    return require('./'+includeFile);
};