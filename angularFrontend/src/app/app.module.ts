import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';

import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';





const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent, LoginComponent,HomeComponent]
})
export class AppModule { }
