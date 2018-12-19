import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DasborComponent } from '../dasbor/dasbor.component';
import { AbsenComponent } from '../absen/absen.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { GaleriuserComponent } from '../galeriuser/galeriuser.component';

const childroutes: Routes=[
  {path:'dasbor',component:DasborComponent,
    children:[
      {path:'',component:AbsenComponent},
      {path:'absen',component:AbsenComponent},
      {path:'timeline',component:TimelineComponent},
      {path:'galeri',component:GaleriuserComponent}
    ]  

  },
  
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(childroutes)
  ]
})
export class DasborroutingModule { }
