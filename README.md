### Links

http://docs.strongloop.com/
http://apidocs.strongloop.com/
http://apidocs.strongloop.com/loopback-sdk-angular/



### Steps to get to this repo state

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
createdb meetup_development
```

Add a relationship, with owner only ACL

slc loopback:model
(meetup)

slc loopback:acl (DENY ALL)

slc loopback:acl on meetup for owner

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
server/db/seed.js

explorer login with admin@meetup.com / meetup,

{
  "email": "admin@meetup.com",
  "password": "meetup"
}
set access_token


create new meetup
{
"name": "Amsterdam Nodejs Meetup"
}


logout
login with guest@meetup.com 
{
  "email": "guest@meetup.com",
  "password": "meetup"
}

slc loopback:acl allow find 

## Serve static files on the root route

remove root route and add

"files": {
    "loopback#static": {
      "params": "$!../client"
    }
  },

## Exposing loopback lb-ng
```
lb-ng server/server.js client/lbServices.js
```

## Generating angularjs docs 

lb-ng-doc client/lbServices.js







