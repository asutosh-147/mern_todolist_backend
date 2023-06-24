const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema;

const workoutSchema= new schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:String,
        required:true
    },
    load:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('workout',workoutSchema)