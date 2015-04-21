### A real world project with Loopback

Required
- npm
- bower
- Postgres.app

## The server

```
npm install -g strongloop
```

slc loopback projectname

/package.json 
`"loopback-connector-postgresql": "*",`

npm install

add postgres datasource


``` 
server/datasources.json
{
  "db": {
    "name": "postgres",
    "database": "loopback_development",
    "connector": "postgresql"
  }
}
```

```
slc loopback:model (user)
```

remove the default user model
server/model-config.json
```
"User": {
    "dataSource": "db"
  },
```

```
createdb projectname_development
```

server/db/create.js
```
var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var postgres = app.dataSources.postgres;
var models = require('../model-config.json')

for (model in models){
	console.log("Creating %s table", model)	
	postgres.automigrate(model, function(err){
		if(err) debug(err)
	})	
}
```

### The client 

touch app.js
touch index.html

mkdir vendor/

.bowerrc

{
  "directory": "client/vendor"
}

bower.json

```
{
  "name": "projectname",
  "version": "0.0.0",
  "homepage": "https://github.com/buildproto/loopback",
  "description": "Loopback demo",
  "main": "app.js",
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "client/vendor",
    "test",
    "tests"
  ],
  "dependencies": {
    "angular": "1.3.14",
    "angular-resource": "*",
    "angular-ui-router": "*"
    "bootstrap": "~3.3.1",
  }
}
```

bower install 

## Exposing loopback lb-ng
```
lb-ng server/server.js client/lbServices.js
```

## User authentication with UI state router





