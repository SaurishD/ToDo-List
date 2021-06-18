import { 
    addNewTask, 
    getTaskByUserId,
    getTaskByID,
    updateTaskByID,
    deleteTaskByID,
    deleteTodoByID,
    updateTodoByID,
    registerUser,
    authenticate
     } from '../controllers/todoControllers.js';
import {jwtAuth} from '../middleware/auth.js';


const routes = (app)=>{

    app.route('/home/')
        .post(jwtAuth,addNewTask)
        .put(jwtAuth,(req,res,next)=>{
            console.log(req.body.id);
            console.log(req.body.status);
            next()
        }, updateTaskByID)
        .get(jwtAuth,getTaskByUserId);
    app.route('/home/:id')
        .delete(jwtAuth,deleteTaskByID);
    app.route('/register')
        .post(registerUser);
    app.route('/login')
        .post(authenticate);   
    
    
    app.route('/home/todo/:task_id/:todo_id')
        .delete(jwtAuth,deleteTodoByID)
        .put(jwtAuth,updateTodoByID);
    
    
}

export default routes;