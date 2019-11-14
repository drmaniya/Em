const express = require('express');
var router = express.Router();

var { Employee } = require('../models/emp');
var ObjectId = require('mongoose').Types.ObjectId;
// CREATE Student


router.get('/',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err) {
            res.send(docs);
        }
        else{
            console.log('Error retrive' + JSON.stringify(err,undefined,2));
        }
    });
});

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send(`No record with this id: ${req.params.id}`);
    
      Employee.findById(req.params.id , (err,data)=>{
          if(!err) res.send(data);
          else
           console.log('Error in Retriving id ' + JSON.stringify(err,undefined,2));
      })
});

router.post('/',(req, res, next) => {
    Employee.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        console.log(data)
        res.json(data)
      }
    })
  });

  router.put('/:id',(req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Employee updated successfully !')
      }
    })
  })
  
  

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
     return res.status(400).send(`No record with this id: ${req.params.id}`);
  
    Employee.findByIdAndRemove(req.params.id , (err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Delete employee' + JSON.stringify(err,undefined,2));
        
    });
});


module.exports = router;




