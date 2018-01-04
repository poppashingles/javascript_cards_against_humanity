const express = require('express')
const parser = require('body-parser')
const server = express()

const MongoClient = require('mongodb').MongoClient

server.use(parser.json())
server.use(express.static('client/build'))
server.use(parser.urlencoded({extended: true}))
