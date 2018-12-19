import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user';
import { Gambar } from './gambar';
import { url_api } from './api_url';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url_gambar: string = url_api+'galeri/';

  constructor(private httpClient: HttpClient, private userService:UserService) { }

  upload(file:File, value, user:User, idevnet:number): Observable<any> {
   
    var formData = new FormData();
    formData.append('gambar',file,value);
    formData.set('idkegiatan',idevnet.toString());
    formData.set('iduser',user.id.toString());
    formData.set('katasandi',user.katasandi);
    var objfile = {};
    
    var json = JSON.stringify(objfile);
    var body = [
      1,
      formData
    ]
    console.log(body);
    return this.httpClient.post(this.url_gambar + 'baru/', formData);
  }

  galerikegiatan(id:number):Observable<Gambar[]>{
    return this.httpClient.get<Gambar[]>(this.url_gambar+'kegiatan/'+id);
  }

  galeriuser(id:number):Observable<Gambar[]>{
    return this.httpClient.get<Gambar[]>(this.url_gambar+'kegiatan_user/'+id);
  }

  all():Observable<Gambar[]>{
    return this.httpClient.get<Gambar[]>(this.url_gambar+'all/');
  }

  hapus(id:number):Observable<any>{
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'hapus',
      
    }
    return this.httpClient.post(this.url_gambar+'hapus/'+id,body,httpOptions);
  }
}
