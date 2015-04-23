var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var async = require('async');
var db = app.dataSources.db;
var models = require('../model-config.json')

var autoMigrate = function autoMigrate(model, done) {
	db.automigrate(model, function(err){
		if(err) {
      debug(err)
      console.log("Error creating %s: %s", model, err);
    } else {
      console.log("Created %s", model);
    }
    done();
	})	
}

var arrayModels = Object.keys(models);
async.eachSeries(arrayModels, autoMigrate, function(err) {
  if (err) {
    console.log("Finished, with errors: ", err);
  }
  else {
    console.log("Finished");
  }
  process.exit();
});