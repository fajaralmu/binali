import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrasiComponent } from '../registrasi/registrasi.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { DasborComponent } from '../dasbor/dasbor.component';
import { ProgramComponent } from '../program/program.component';
import { KeluarComponent } from '../keluar/keluar.component';
import { ProfilComponent } from '../profil/profil.component';
import { GaleriuserComponent } from '../galeriuser/galeriuser.component';
import { DivisiComponent } from '../divisi/divisi.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'daftar',component:RegistrasiComponent},
  {path:'masuk',component:LoginComponent},
  {path:'dasbor',component:DasborComponent},
  {path:'program',component:ProgramComponent},
  {path:'divisi',component:DivisiComponent},
  {path:'profil',component:ProfilComponent},
  {path:'galeri',component:GaleriuserComponent},
  {path:'keluar',component:KeluarComponent},
  {path:'**',component:HomeComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
