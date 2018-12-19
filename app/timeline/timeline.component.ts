import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProgramService } from '../program.service';
import { KegiatanService } from '../kegiatan.service';
import { Program } from '../program';
import { Kegiatan } from '../kegiatan';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css',  '../app.component.css']
})
export class TimelineComponent implements OnInit {
  user:User = {id:0, nama:"", username:"",katasandi:"", email:"", admin:0};
  valid:boolean;
  listprogram: Program[];
  listkegiatan: Kegiatan[];
  constructor(private judul: Title, public userService:UserService,private programService:ProgramService,
    private kegiatanService:KegiatanService, private router:Router) { }

  ngOnInit() {
    this.judul.setTitle('Dasbor::Timeline');
    this.userService.user_masuk().subscribe(
      data=>{
        if(data['status']==1){
          console.log('timeline',data);
          this.valid = true;
          this.user = data['user'];
         }else{
          this.valid = false;
          this.router.navigate(['masuk']);
        }
      }
    );
  }

  


}
