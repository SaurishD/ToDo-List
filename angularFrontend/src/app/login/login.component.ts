import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rName : String = "";
  rEmail: String = "";
  rUserName = "";
  rPassword : String;
  lUsername: String;
  lPassword: String;
  endpoint = "http://localhost:2500/";

  constructor(private http: HttpClient, private router: Router,private cookieService :CookieService){ }

  ngOnInit(): void {
  }

  register() :void{
    var body = {
      name: this.rName,
      email: this.rEmail,
      username: this.rUserName,
      password: this.rPassword
    }
    this.http.post(this.endpoint+"register/",body).subscribe(data=>{
      console.log(data);
      this.rName = "";
      this.rPassword = "";
      this.rUserName = "";
      this.rEmail = "";
      if(data['status'] === "error" ){
        alert(data['message']);
        
      }
    })
  }

  login(): String{
    var body = {
      username: this.lUsername,
      password: this.lPassword
    }
    this.http.post(this.endpoint+"login/",body).subscribe(data=>{
      alert(data['message']);
      if(data['status']==="ok"){
        this.cookieService.set('token',data['token']);
        this.router.navigate(['/home']);
      }
    })

    return "/home";
  }

}
