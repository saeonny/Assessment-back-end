const chai = require("chai");
const server = require("../app");
const chaiHttp = require('chai-http');
const {assert} = require('chai')
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


})