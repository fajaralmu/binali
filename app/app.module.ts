import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger,state,transition,animate,style} from '@angular/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { DasborComponent } from './dasbor/dasbor.component';
import { ProgramComponent } from './program/program.component';
import { KeluarComponent } from './keluar/keluar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AbsenComponent } from './absen/absen.component';
import { DasborroutingModule } from './dasborrouting/dasborrouting.module';
import { KalenderComponent } from './kalender/kalender.component';
import { ProfilComponent } from './profil/profil.component';
import { GaleriuserComponent } from './galeriuser/galeriuser.component';
import { DivisiComponent } from './divisi/divisi.component';
import { FilterComponent } from './filter/filter.component';
import { ListentitasComponent } from './listentitas/listentitas.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrasiComponent,
    HomeComponent,
    LoginComponent,
    DasborComponent,
    ProgramComponent,
    KeluarComponent,
    TimelineComponent,
    AbsenComponent,
    KalenderComponent,
    ProfilComponent,
    GaleriuserComponent,
    DivisiComponent,
    FilterComponent,
    ListentitasComponent,
    
  ],
  imports: [
    BrowserModule,
    DasborroutingModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule
  ],
  exports:[
    RouterModule
  ],
  providers: [{provide:UserService,useClass:UserService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
