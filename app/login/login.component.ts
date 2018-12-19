import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { animasi } from '../animasi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../app.component.css'
  ],
  animations:[
    animasi
  ]
})
export class LoginComponent implements OnInit {
  user:User = {id:0, nama:"", username:"",katasandi:"", email:"", admin:-1};
  login:boolean = false;

  constructor(public userService:UserService, private router:Router, private app:AppComponent) { }

  ngOnInit() {
    this.app.setMenu(2);
    this.userService.user_masuk().subscribe(
      data=>{
        if(data['status']==1){
          this.login = true;
          this.router.navigate(['dasbor']);
        }else{
          this.login = false;
          this.app.setUser(this.user,false);
        }
      }
    )
  }

  masuk(){
    this.userService.masuk(this.user).subscribe(
      data=>{
        if(data.error==null){
          if(data.response.hasil.token!=null){
            alert('login oke');
            var token = data.response.hasil.token;
            localStorage.setItem('token',token);
            console.log('token',token);
            this.login = true;
            this.router.navigate(['dasbor']);
          }else{
            alert('login gagal');
            this.login = false;
          }
        }else{
          alert('login gagal');
          this.login = false;
        }
      }
    );
  }

  lupa(){
    
  }

}
