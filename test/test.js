const chai = require("chai");
const server = require("../app");
const chaiHttp = require('chai-http');
const {assert, expect} = require('chai')
chai.use(chaiHttp)
const should = chai.should()

describe('Server Test',()=> {

  // Test the POST register
  describe("Get all the users", ()=> {
    it("It should GET all the users", (done) => {
      chai.request(server)
      .get("/users")
      .end((err, res)=> {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body[0].user_name.should.be.eql("sae");
        done()
      })
    })
  })

  describe("Register new user if the user_name is unique ", ()=> {
    it ("It should register a new user if the user_name is unique and return its user_name and password", (done) => {
      chai.request(server)
      .post("/users/register")
      .send({user_name:'sae2', password: '1234'})
      .end((err,res)=> {
        res.should.have.status(200);
        res.body[0].user_name.should.be.eql("sae2")
        res.body[0].password.should.be.eql('1234')
        done()
      })
    })

    it ("It successfully added to users", (done) => {
      chai.request(server)
      .get("/users")
      .end((err, res) => {
        res.body.length.should.be.eql(2);
        res.body[1].user_name.should.be.eql("sae2")
        done()
      })
    })

  

    

  })

  describe("Not register user if username already exists", ()=> {
    it ("It should not register a new user if the user_name is not unique and return its error message", (done) => {
      chai.request(server)
      .post("/users/register")
      .send({user_name:'sae', password: '1234'})
      .end((err,res)=> {
        res.should.have.status(200);
        res.body.error.should.be.eql('given user_name already exists') 
        done()
      })
      
    })
    it ("It should not added to users (users length should remain same)", (done) => {
      chai.request(server)
      .get("/users")
      .end((err,res)=> {
        res.body.length.should.be.eql(2);
        done()
      })
      
    }) 

  

  })
  describe("Login with matched user_name and password", ()=> {
    it ("It should able to login with matched user_name and password", (done) => {
      chai.request(server)
      .post("/users/login")
      .send({user_name:'sae', password: '1234'})
      .end((err,res)=> {
        res.should.have.status(200);
        
        res.body[0].user_name.should.be.eql("sae");
        res.body[0].password.should.be.eql('1234')
        
        done()
      })
      
    })

    it ("It should not able to login with non-matched user_name and password", (done) => {
      chai.request(server)
      .post("/users/login")
      .send({user_name:'sae', password: '12345'})
      .end((err,res)=> {
        res.should.have.status(200);
        res.body.error.should.be.eql("not match")
        
        
        
        done()
      })
      
    })
   
  
  })

  describe("CRUD Tweet : Create", ()=> {
    it ("It should possible to create new tweet", (done) => {
      chai.request(server)
      .post("/tweets/create")
      .send({writter:'sae',title: "testing", content : "testing-testing"})
      .end((err,res)=> {
        res.should.have.status(200);
        console.log(res.body)
        done()
      })
      
    })
    it ("After create new tweet, it should be added to tweets ", (done) => {
      chai.request(server)
      .get("/tweets")
      .end((err,res)=> {
        res.body.length.should.be.eql(3);
        res.body[2].title.should.be.eql("testing")
        res.body[2].id.should.be.eql(3)
    
        
        done()
      })
      
    })

  })

  describe("CRUD Tweet : Read", ()=> {
    it ("It should possible to read tweet by id", (done) => {
      chai.request(server)
      .get("/tweets/3")
     
      .end((err,res)=> {
        res.should.have.status(200);
        res.body.title.should.be.eql("testing")
        done()
      })
      
    })
 
  })



  describe("CRUD Tweet : Update", ()=> {
    it ("It should possible to update tweet", (done) => {
      chai.request(server)
      .post("/tweets/edit/3")
      .send({content : "updated-testing"})
      .end((err,res)=> {
       
        done()
      })
      
    })

    it ("Tweet should be updated", (done) => {
      chai.request(server)
      .get("/tweets/3")
     
      .end((err,res)=> {
        res.body.content.should.be.eql("updated-testing")
        done()
      })
      
    })
 
  })

  describe("CRUD Tweet : Delete", ()=> {
    it ("It should possible to delete tweets", (done) => {
      chai.request(server)
      .post("/tweets/delete/3")
      .end((err,res)=> {
       
        done()
      })
      
    })

    it ("Tweet should be deleted from tweets", (done) => {
      chai.request(server)
      .get("/tweets")
     
      .end((err,res)=> {
        res.body.length.should.be.eql(2)
        done()
      })
      
    })
 
  })
  



})