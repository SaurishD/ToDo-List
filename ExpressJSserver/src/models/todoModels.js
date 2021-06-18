
import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const todoSchema = new Schema({
    
    todo : {
        type: String,
        required: "Enter a todoName" 
    },
    status : {
        type: Boolean,
        default: false
    }
});

export const  userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    name:{
        type : String,
        required: true
    }
})

export const taskSchema = new Schema({
    task : {
        type: String,
        require: "Enter the taskname",
    },
    todo: [todoSchema],
    deadline: {
        type: String,
        required: "Enter a date"
    },
    color:{
        type: String,
        require: "Enter the theme color"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})