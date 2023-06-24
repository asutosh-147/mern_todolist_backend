require('dotenv').config();
const express=require('express');
const { default: mongoose } = require('mongoose');
const workoutRoutes=require('./routes/workouts');
const userRoutes=require('./routes/user');
const cors = require('cors');

//create express app
const app = express();
const PORT = process.env.PORT || 4000;
//middle ware

app.use(cors());

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);
//remove deprecition warning
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listening to requests
        app.listen(PORT,()=>{
            console.log('connected to database, listening on port',PORT);
        })
    })
    .catch((err)=>{
        console.log(err);
    })

