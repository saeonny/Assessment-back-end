const router = require('express').Router();



module.exports = (db) => {

  router.get("/", (req,res)=> {
    const command = "Select * from users;";
    db.query(command).then(data => {
      res.json(data.rows);
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

  //Login
  router.post("/login",(req, res) => {
    const user_name = req.body.user_name;
    const password = req.body.password;

    const loginCheck = "Select * from users where user_name = $1 AND password = $2;"

    db.query(loginCheck,[user_name,password])
    .then(data => {
      if(data.rows.length === 1 ) {
        req.session.user_name = user_name;
        console.log("cookie-session",req.session.user_name);
        return res.send(data.rows)
      }
      else {
        return res.send({error : "not match"})
      }
    })
  })
  // router.get("/login/:id",(req, res) => {
  //   const id = req.params.id;
  //   req.session.user_name = id;
  //   return res.send({session: req.session.user_name})

  // })

  // // check session 
  // router.post("/logout", (req, res) => {
  //   req.session = null;
  //   return res.send({session : req.session.user_name})
  // })

  // router.get("/session", (req,res) => {
  //   console.log(req.session.user_name)
  //   return res.send({session : req.session.user_name})
  // })

  return router;
};