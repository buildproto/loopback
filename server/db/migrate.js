var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var db = app.dataSources.db;
var models = require('../model-config.json')

for (var model in models) {
	console.log(model)
 	db.autoupdate(model, function(){
 		
 	})
}
