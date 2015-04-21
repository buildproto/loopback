var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var db = app.dataSources.db;
var models = require('../model-config.json')

for (model in models){
	console.log("Creating %s table", model)	
	db.automigrate(model, function(err){
		if(err) console.error(err)
	})	
}
