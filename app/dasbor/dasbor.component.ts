import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../user';
import { AppComponent } from '../app.component';
import { url_api, url_image } from '../api_url';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dasbor',
  templateUrl: './dasbor.component.html',
  styleUrls: ['./dasbor.component.css', '../app.component.css']
})
export class DasborComponent implements OnInit {
  user:User = {id:0, nama:"", username:"",katasandi:"", email:"", admin:0};
  valid:boolean = false;
  url_gambar:string = url_image;
  constructor(private judul: Title,public userService:UserService, private router:Router, private app:AppComponent) { }

  ngOnInit() {
    this.judul.setTitle('Dasbor');
    this.app.setMenu(3);
    this.userService.user_masuk().subscribe(
      data=>{
        if(data['status']==1){
          console.log('dasbor',data);
          this.valid = true;
          this.user = data['user'];
          this.app.setUser(this.user, true);
          
        }else{
          this.valid = false;
          this.router.navigate(['masuk']);
        }
      }
    );
    
  }


}
