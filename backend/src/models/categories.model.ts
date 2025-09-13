import mongoose, { Schema, Types } from "mongoose";


const category = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'users',
        required: true
    },
    contents: [{
        type: Types.ObjectId,
        ref: 'contents'
    }]
}, { timestamps: true })

const categoryModel = mongoose.model('categories', category)

export { categoryModel }
