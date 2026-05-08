import mongoose, { Schema, Types } from "mongoose";




const Tag = new Schema({
    name: { 
        type: String, 
        required: true
    }
}, { timestamps: true })


const TagModel = mongoose.model("Tags", Tag)

export { TagModel }