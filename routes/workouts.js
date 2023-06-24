const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getSingleWorkout,
  getAllWokouts,
  deleteWorkout,
  updateWorkout
}= require('../controller/workoutController');
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth)

//GET all
router.get("/",getAllWokouts);

//Get a single
router.get("/:id",getSingleWorkout);

//POST workouts
router.post("/",createWorkout);

//Delete Workouts
router.delete("/:id",deleteWorkout);

//update a Workout
router.patch("/:id",updateWorkout);

module.exports = router;
