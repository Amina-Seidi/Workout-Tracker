const express = require("express");
const router = express.Router();
const db = require('../models/workout.js');


module.exports = function(app) {
    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
      console.log("Time: ", Date.now());
      next();
    });
    
    router.get("/api/workouts", (req, res) => {
      db.find()
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    });
    
    router.post("/api/workouts", (req, res) => {
        db.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
  
      { new: true, runValidators: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  router.get("/api/workouts/range", (req, res) => {
    db.find({})
      .then(dbWorkout => {
        // console.log(dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  };