const router = require('express').Router();



module.exports = (db) => {

  router.get("/", (req,res)=> {
    const command = "Select * from users;";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  })
  
  // can check password and check user is exists or not
  router.get("/:user_name",(req,res) => {
    const user_name = req.params.user_name
    const query = `Select password from users where user_name = $1`
    db.query(query,[user_name])
    .then(data => {
      if(data.rows.length === 0) {
        return res.send({error : "user_name does not extis"})
      }
      else {
        res.send (data.rows[0])
      }
    })
  })

  //TASK1. user registration using unique username and a password 
  // 1. user_name should unique => user_name is primary key
  // 2. then save password 

  router.post("/register",(req, res) => {
    const user_name = req.body.user_name;
    const password = req.body.password;
    // const user_name = req.params.user_name;
    // const password = req.params.password;

    const namecheck = `Select * from users where user_name = $1;`
    const register = `INSERT INTO users (user_name,password) VALUES ($1,$2) RETURNING *;`
    db.query(namecheck,[user_name])
    .then(data => {
      if(data.rows.length === 0) {
        db.query(register,[user_name,password])
        .then(data => {
          res.send(data.rows)
        })
      }

      else {
        return res.send({error : "given user_name already exists"})
      }
    })
  })

  return router;
};