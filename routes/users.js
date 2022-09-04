const router = require('express').Router();



module.exports = (db) => {

  router.get("/", (req,res)=> {
    const command = "Select * from users;";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  })

  //TASK1. user registration using unique username and a password 
  // 1. username should unique
  // 2. then save password 

  return router;
};