const { default: mongoose } = require("mongoose");
const Workouts = require("../models/workoutModel");

//get all workouts

const getAllWokouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workouts.find({user_id}).sort({ createdAt: -1 });

  if (!workouts) return res.status(404).json({ mssg: "No docs in database" });
  res.status(200).json(workouts);
};

//get a single
const getSingleWorkout = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ mssg: "NO such Workout" });

  Workouts.findById(id)
    .then((workout) => {
      if (!workout) return res.status(400).json({ mssg: "NO such Workout" });
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json({ mssg: err.message });
    });
};
//create a workout

const createWorkout = (req, res) => {
  const { title, reps, load } = req.body;
  let emptyfields=[];
  if(!title)
    emptyfields.push('title');
  if(!reps)
    emptyfields.push('reps');
  if(!load)
    emptyfields.push('load');
  if(emptyfields.length > 0)
    return res.status(400).json({msg:"Fill out the empty fields",emptyfields})

  const user_id = req.user._id
  // console.log(user_id)

  Workouts.create({ title, reps, load, user_id })
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json({ mssg: err.message });
    });
};

//delete workout
const deleteWorkout = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ mssg: "NO such Workout exists" });

  Workouts.findOneAndDelete({ _id: id })
    .then((workout) => {
      if (!workout)
        return res.status(400).json({ mssg: "NO such Workout exists" });
      res.status(200).json(workout);
    })
    .catch((err) => res.status(404).json({ mssg: err.message }));
};
//update workout

const updateWorkout = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ mssg: "NO such Workout exists" });

  Workouts.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )
    .then((workout) => {
      if (!workout)
        return res.status(400).json({ mssg: "NO such Workout exists" });
      res.status(200).json(workout);
    })
    .catch((err) => res.status(404).json({ mssg: err.message }));
};

module.exports = {
  createWorkout,
  getSingleWorkout,
  getAllWokouts,
  deleteWorkout,
  updateWorkout,
};
