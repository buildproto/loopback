var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var debug = require('debug')("meetup:db:seed")

var Role = app.models.Role;
var User = app.models.user;
var Meetup = app.models.Meetup;

var RoleMapping = app.models.RoleMapping;

User.create([
    {email: 'admin@meetup.com', password: 'meetup', emailVerified: true},
    {email: 'guest@meetup.com', password: 'meetup', name: "Auke van Scheltinga", emailVerified: true}
  ], function(err, users) {
    if (err) console.error(err)

      Meetup.create({name: "Amsterdam Nodejs meetup", userId: users[0].id}, function(err, meetup){
        
      })

    //create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) console.error(err)
 
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) console.error(err)
      });
    });

    Role.create({
      name: 'guest'
    }, function(err, role) {
      if (err) console.error(err)
 
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function(err, principal) {
        if (err) console.error(err)
        
      });
    });
  });

