import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../user';

@Component({
  selector: 'app-keluar',
  templateUrl: './keluar.component.html',
  styleUrls: ['./keluar.component.css']
})
export class KeluarComponent implements OnInit {

  constructor(private router:Router, public userService:UserService, private app :AppComponent) { }
  userKosong:User = {
    id:0, nama:'', katasandi:'',admin:-1,email:'',username:''
  }
  ngOnInit() {
    console.log('keluar');
    this.userService.keluar();
    this.router.navigate(['masuk']);
    this.app.setUser(this.userKosong, false);
    this.app.setMenu(2);
  }

}
