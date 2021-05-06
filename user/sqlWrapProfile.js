'use strict'

const sql = require('sqlite3');
const util = require('util');

// creates a new database object, not a 
// new database. 
const dbp = new sql.Database("profiles.db");

//check if database exists 
let cmdp = " SELECT firstName FROM sqlite_master WHERE type='table' AND name='Profile' ";

dbp.get(cmdp, function (err, val) {
  if (val == undefined) {
        console.log("No Profile database file - creating one");
        createProfileTable();
  } else {
        console.log("Profile Database file found");
  }
});

// called to create the Profile table if needed
function createProfileTable() {
  // explicitly declaring the rowIdNum protects rowids from changing if the 
  // table is compacted; not an issue here, but good practice
  const cmd = 'CREATE TABLE Profile (userID TEXT, firstName TEXT)';
  dbp.run(cmd, function(err, val) {
    if (err) {
      console.log("Profile Database creation failure",err.message);
    } else {
      console.log("Created Profile database");
    }
  });
}

// wrap all database commands in promises for Profile Table 
dbp.run = util.promisify(dbp.run);
dbp.get = util.promisify(dbp.get);
dbp.all = util.promisify(dbp.all);

// allow code in index.js to use the db object
module.exports = dbp;

