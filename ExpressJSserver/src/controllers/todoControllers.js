import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {taskSchema, userSchema} from '../models/todoModels.js';
import {getId} from '../middleware/auth.js';
import {JWT_SECRET} from './key.js';

const Todo = new mongoose.model('Task',taskSchema);
const User = new mongoose.model('users',userSchema);



// API for task starts


export const addNewTask = (req,res) =>{
    const userId = getId();
    var body = req.body;
    body['username'] = userId;
    let newTodo = new Todo(req.body);

    newTodo.save((err,todo)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(todo);
            res.json(todo);
        }
    })
}

export const getTaskByUserId = (req,res) =>{
    const userid = getId();
    console.log(userid);
    Todo.find({username: userid},(err,todo)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(todo);
            res.json(todo);
        }
    }).sort({createdDate: -1});

}

export const getTaskByID = (req,res) =>{
    const userid = getId();
    console.log(userid);
    Todo.find({username: userid},(err,todo)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(todo);
            res.json(todo);
        }
    })

}

export const updateTaskByID = (req,res) =>{
    Todo.findOneAndUpdate({_id: req.body.id},req.body,{new:true, useFindAndModify: false},(err,todo)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log(todo);
        res.json(todo);
    })
}

export const deleteTaskByID = (req,res) => {
    Todo.deleteOne({_id: req.params.id}, (err,todo)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        console.log(todo);
        res.json({status:'ok',message: `task with id ${req.params.id} has been deleted` });

    })
}
// API for task ends

//API for todo starts

export const deleteTodoByID = (req,res) =>{

    Todo.findById(req.params.task_id,(err,task)=>{
        if(err){
            res.send(err);
        }
        task.todo = task.todo.filter(item=>item._id != req.params.todo_id);
        task.save();
        res.json({validUser: 0,status:'ok',message: "Item is deleted"})
    })
}

export const updateTodoByID = (req,res)=>{
    Todo.findById(req.params.task_id,(err,task)=>{
        if(err){
            res.send(err);
        }
        console.log(task);
        var obj = task.todo.filter(item=>item._id == req.params.todo_id);
        console.log(req.params.todo_id);
        obj[0].status = req.body.status;
        task.save();
        res.json({status:ok,message: "Item is updated"})
    })
}
//API for todo ends

//API for user authentication starts

export const registerUser = async (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    var password = req.body.password;
    if(!username || typeof username !== 'string'){
        res.json({status: 'error', message:'Invalid Username'});
        return;
    }
    if(!password || typeof password !== 'string'){
        res.json({status:'error',message: 'Invalid Password'});
        return;
    }
    if(password.length < 6 ){
        res.json({status:'error',message: 'Password too short. Your password must contain at least 6 char'});
        return;
    }
    var enc_password = await bcrypt.hash(password,10);
    let  newUser = await new User({
        username: username,
        password: enc_password,
        name: name,
        email: email
    })
    
    await newUser.save((err,user)=>{
        if(err && err.code === 11000){
            res.json({status:'error',message: "Username already in use"});
        }else if(err){
            res.send(err.message);
        }
        res.send(user);
    });
}

export const authenticate = async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    await User.findOne({username: username}, async (err,user)=>{
        if(err){
            res.json({
                status : 'error',
                message : 'Username not found'
            })
        }
        var db_password = user.password;
        if(await bcrypt.compare(password,db_password)){
            const token = jwt.sign({
                id: user._id,
                username: user.username
            },JWT_SECRET);
            res.json({
                status: 'ok',
                message: 'Login Successful',
                token: token
            })
        }else{
            res.json({
                status: 'error',
                message: 'Password do not match'
            })
        }
    })

}
