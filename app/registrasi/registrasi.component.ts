import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: [
    './registrasi.component.css',
    '../app.component.css'
  ]
})
export class RegistrasiComponent implements OnInit {
  user:User = {id:0, nama:"", username:"",katasandi:"", email:"",admin:0};
  katasandi_ulang:string;
 
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  tambah(user:User){
    if(this.katasandi_ulang!=user.katasandi){
      alert('katasandi harus sama');
      return;
    }
    this.user = user;
    console.log(user);
    this.userService.tambah(this.user).subscribe(
      data=>{
        if(data==1)
        {
          alert('Registrasi berhasil!');
          this.router.navigate(['masuk']);
        }
        else{
          alert('Registrasi gagal!');
        }
    }
    );
  }

}
