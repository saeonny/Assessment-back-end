const router = require('express').Router();



module.exports = (db) => {

  router.get("/", (req,res)=> {
    const command = "Select * from tweets;";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  })
  
  //Create 

  router.post("/create", (req,res) => {
    const writter = req.body.writter;
    const title = req.body.title;
    const content = req.body.content;

    const query = `INSERT INTO tweets (title, content, writter ) VALUES ($1, $2, $3) returning * ;`
    db.query(query,[title,content,writter])
    .then(data => {
      res.send(data.rows[0])
    })

  })

  // Read by id
  router.get("/:id", (req,res) => {
    const id = req.params.id

    const query = `Select * from tweets where id = $1;`

    db.query(query,[id])
    .then(data=> {
      res.send(data.rows[0])
    })

  })

   // update
   // id  writter and title cant be changed
   // only content can be updated
  
   router.post("/edit/:id", (req,res) => {
    
    const id = req.params.id
  
    const content = req.body.content;
    console.log("cont",content)

    const query = `UPDATE tweets set content = $1, edited_time = Now() where id = $2 returning * ;`

    db.query(query,[content,id])
    .then(data=> {
      res.send(data.rows[0])
    })
    .catch(e => res.send(e))

  })

  // delete
  router.post("/delete/:id", (req,res) => {
    const id = req.params.id
    const query = `DELETE FROM tweets WHERE id = $1 `

    db.query(query,[id]).then(data=> {
      res.send(data.rows[0])
    })
    .catch(e => res.send(e))
  })

  // Like tweets
  // at the frond => if the tweet is liked => click  ❤️ button => post unlike 
  //              => if the tweet is unliked => click ❤️ button => post like 

  router.post("/like", (req,res) => {
    const tweet_id = req.params.tweet_id
    const user_name = req.params.user_name

    const query = `INSERT INTO likes (tweet_id, user_name ) VALUES ($1 , $2) returning *;`

    db.query(query,[tweet_id,user_name]).then(data => {
      res.send(data.rows[0])
    })
    .catch(e => res.send(e))

  })

  router.post ("/unlike", (req,res) => {
    const tweet_id = req.params.tweet_id
    const user_name = req.params.user_name

    const query = `DELETE FROM tweets WHERE tweet_id = $1 AND user_name = $2 returning * `
    db.query(query,[tweet_id,user_name]).then(data => {
      res.send(data.rows[0])
    })
    .catch(e => res.send(e))
  })



  return router;
};