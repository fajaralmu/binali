import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';
import { User } from '../user';
import { Router } from '@angular/router';
import { animasi } from '../animasi';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css', '../app.component.css'],
  animations:[
    animasi
  ]
})
export class ProfilComponent implements OnInit {

  valid:boolean = false;
  user:User;
  constructor(private judul: Title, private userService:UserService, private app:AppComponent, private router :Router) { }

  ngOnInit() {
    this.judul.setTitle('Profil');
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

  edit(user:User){
    if(!confirm("lanjutkan edit?")){
      return;
    }
    this.userService.update(user).subscribe(
      data => {
        if (data == true) {
          alert('berhasil');
          this.app.setUser(this.user, true);
        } else {
          alert('gagal');
        }
      }
    )
  }

}
