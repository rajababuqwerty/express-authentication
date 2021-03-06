const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
const authenticate = require('../authenticate'); 
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get( (req,res,next) => {
    Leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
.post(authenticate.verifyUser ,(req,res,next) => {
    Leaders.create(req.body)
    .then((leader)=> {
        console.log('leader created' , leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
.delete(authenticate.verifyUser ,(req,res,next) => {
    Leaders.remove({})
   .then((leader)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
   }, (err) => next(err))
   .catch((err)=> next(err));
})
.put(authenticate.verifyUser ,(req,res,next) => {
    req.statusCode = 403;
    res.end('PUT operation is not supported on /leaders ');
});

leaderRouter.route('/:leaderId')
.get( (req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader)=> {
        console.log('leader created' , leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
.post(authenticate.verifyUser ,(req,res,next) => {
    req.statusCode = 403;
    res.end('POST operation is not supported on /leader/'
    + req.params.leaderId);
})
.put(authenticate.verifyUser ,(req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId , {
       $set : req.body
   }, { new : true})
   .then((leader)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(leader);
}, (err) => next(err))
.catch((err)=> next(err));
})
.delete(authenticate.verifyUser ,(req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
       }, (err) => next(err))
       .catch((err)=> next(err));
});
module.exports = leaderRouter;