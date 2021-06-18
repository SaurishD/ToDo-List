import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: any;
  newTask: string;
  value: any;
  endpoint = "http://localhost:2500/home/";
  colors = ["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#737070"];
  formVisible = false;
  token  = "";
  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,private cookieService: CookieService, private router: Router){}

  tokenPresent() : boolean{
    return this.cookieService.check('token');
  }
  authenticate(data: Object): boolean{
    
    if(data['validUser'] && data['validUser']==0){
      this.cookieService.delete('token');
      return false;
    }
    console.log("In authenitcate");
    return true;
  }
  
  ngOnInit(): void {
    if(!this.tokenPresent()){
      alert("Session not valid, please login again");
      this.router.navigate(['/login']);
      
    }
    
    this.token = this.cookieService.get('token');
    this.httpHeaders = this.httpHeaders.set('x-auth-token',this.token);
    console.log(this.httpHeaders);
    this.newTask = "";
    
    this.http.get<any>(this.endpoint,{headers: this.httpHeaders}).subscribe((data: any) =>{
      //this.tasks = [];
      this.tasks = data;
    })
    console.log(this.tasks);
  }

  addTask(deadline: any): void{
    if(this.newTask==="") return;
    //Here new id has to be added which is to be fetched from db
    var newT = {
      task: this.newTask,
      status: false,
      deadline: deadline,
      color: this.colors[Math.floor(Math.random()*this.colors.length)]
    };
    
    //this.tasks.push(newT);
    console.log(newT);
    this.http.post(this.endpoint,newT,{headers: this.httpHeaders}).subscribe(data=>{
      this.authenticate(data);
      this.formVisible = false;
      this.ngOnInit();
    });
    this.newTask = "";
  }

  usePut(body:any):void{
    this.http.put(this.endpoint,body,{headers: this.httpHeaders}).subscribe(data=>{
      this.authenticate(data);
      this.ngOnInit();
    });
  }

  updateTask(curr_id: string, event: any):void{
    console.log(event.target.checked);
    var body = {
      id: curr_id,
      status: event.target.checked,
    };
    this.usePut(body)
  }

  deleteTask(task: any){
    var body = {token: this.token};
    this.http.delete(this.endpoint+task._id,{headers: this.httpHeaders}).subscribe(data=>{
      this.authenticate(data);
      console.log(this.endpoint+task._id);
      this.ngOnInit();
    });
  }

  addTodo(task:any, event:any){
    task.todo.push({todo:event.target.value});
    var body = {
      id: task._id,
      todo: task.todo
    };
    this.usePut(body);

  }

  updateTodo(task: any,id:any,event: any){
    var body = {
      status: event.target.checked,
    }
    this.http.put(this.endpoint+"todo/"+task._id+"/"+id,body,{headers: this.httpHeaders}).subscribe(data=>{
      this.authenticate(data);
      console.log(data);
      this.ngOnInit();
    });
    
  }

  deleteTodo(task: any, id: any){
    this.http.delete(this.endpoint+"todo/"+task._id+"/"+id,{headers: this.httpHeaders}).subscribe(data=>{
      this.authenticate(data);
      console.log(data);
      this.ngOnInit();
    });
  }

  decideColor(todo:any): String{
    console.log(todo.todo,todo.status);
    if(todo.status) return "lightgray";
  }
  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }



}
