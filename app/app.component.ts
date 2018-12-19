import { Component, OnInit, Injectable } from '@angular/core';
import { transition, trigger, state, style, animate } from '@angular/animations';
import { User } from './user';
import { UserService } from './user.service';

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'fajar-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('bukaTutup',[
      state('buka',style({
        opacity: 1,
        backgroundColor:'green'
      })),
      state('tutup',style({
        opacity: 0.4,
        backgroundColor:'orange'
      })),
      transition('buka <=> tutup',[
        animate('1s')  
      ]),
    ])
  ]
  
})
export class AppComponent implements OnInit {
  terbuka:boolean = false;
  judul:string = 'MONITORING SYIAR';
  user:User= new User();
  login:boolean = false;
  menu:number= 1;
  app:boolean=false;


  constructor(private userService:UserService){
    
  }

  ngOnInit(){
    this.app = true;
    this.userService.user_masuk().subscribe(
      data=>{
        if(data['status']==1){
          console.log('dasbor',data);
          this.login = true;
          this.user = data['user'];
        }else{
          this.login = false;
        }
      }
    );
  }

  setUser(user:User, login:boolean){
    this.user = user;
    this.login = login;
  }

  setMenu(menu:number){
    this.menu  = menu;
  }

  toggle(){
    this.terbuka = !this.terbuka;
  }
}
