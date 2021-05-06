'use strict'

// using a Promises-wrapped version of sqlite3
const dbp = require('./sqlWrapProfile');

module.exports = {
  addProfile: addProfile,
}

const insertProfile = "insert into Profile (userID, firstName) values (?,?)"
const checkIfUserExists = "select * from Profile where userID = ?";
const viewAllProfiles = "select * from Profile";

//Add the new user into the Profile table
async function addProfile(profile){
  try {


    let rows = await dbp.all(viewAllProfiles);
    console.log("rows:\n\n\n" );
    console.log(JSON.stringify(rows));

    console.log("profile.userID: "+profile.userID)
    let matches = await dbp.all(checkIfUserExists, [profile.userID]);
    console.log("matches: "+JSON.stringify(matches))
    //If User does not exist in the Profile table
    if (matches==undefined){
      //Add the user in the Profile Table 
      console.log("Trying to Insert!!")
      try{
      await dbp.run(insertProfile, [profile.userID, profile.firstName]);
      }catch(error){
        console.log("error", error)
      }
    }
  } catch (error) {
    console.log("error", error)
  }
}