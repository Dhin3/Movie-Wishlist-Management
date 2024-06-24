import mongoose from "mongoose";

const schema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        genere:{
            type: String,
            required: true
        },
        director:{
            type: String,
            required: true
        },
        star:{
            type:String,
            required:true
        },
        duration:{
            type: Number,
            required: true
        }
    },
    { timestamps: true } 
)

export const MOVIE_MODEL = mongoose.model('Wish List', schema);