import express from "express";
import mongoose from "mongoose";
import { PORT, DBURL } from "./config.js";
import MoviesRoute from "./routes/moviesRoute.js"

const app = express();
app.use(express.json())

app.get('/', (req,res)=>{
    return res.status(243).send("U entered successfully...")
})

app.use('/movies',MoviesRoute)

//connection to db
mongoose.connect(DBURL)
        .then(()=>{
            console.log("Connected to DB")
            app.listen(PORT, ()=>{
                console.log("Listening to "+PORT);
            })
        })
        .catch((error)=>{
            console.log(error.message)
        })

