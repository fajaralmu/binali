import { Component, OnInit } from '@angular/core';
import { animasi } from '../animasi';
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    animasi
  ]
})
export class HomeComponent implements OnInit {

  url_image:string = "header_mpi.png";  
  constructor(private judul: Title,private app:AppComponent) { }

  ngOnInit() {
    this.judul.setTitle('MPI:home');
    this.app.setMenu(1);
  }

}
