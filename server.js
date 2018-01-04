const express = require('express')
const parser = require('body-parser')
const server = express()

const MongoClient = require('mongodb').MongoClient

server.use(parser.json())
server.use(express.static('client/build'))
server.use(parser.urlencoded({extended: true}))


MongoClient.connect('mongodb://localhost:27017', function(err, client) {
  if(err) {
    console.log(err)
    return
  }


  server.listen(3000, function(){
    console.log("Listening on port 3000")
  })
})
