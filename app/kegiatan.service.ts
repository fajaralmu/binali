import { Injectable } from '@angular/core';
import { Kegiatan } from './kegiatan';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadService } from './upload.service';
import { url_api } from './api_url';

@Injectable({
  providedIn: 'root'
})
export class KegiatanService {
  list_kegiatan: Kegiatan[];
  kegiatan: Kegiatan;
  url_kegiatan: string = url_api+'kegiatan/';

  constructor(private httpClient: HttpClient) { }


  tambah(kegiatan: Kegiatan): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    delete kegiatan.galeri;
    var body = {
      nama: 'tambahkegiatan',
      data: kegiatan
    }
    return this.httpClient.post(this.url_kegiatan + 'tambah', body, httpOptions);
  }

  get_by_program(id: number): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'jmlkegiatanbyprogram',

    }
    return this.httpClient.post(this.url_kegiatan + 'getbyidprogram/' + id, body, httpOptions); 
  }

  get_program(id: number): Observable<any> {
    return this.httpClient.get(this.url_kegiatan + 'get/' + id);
  }

  list(): Observable<Kegiatan[]> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'listkegiatan'
    }
    return this.httpClient.post<Kegiatan[]>(this.url_kegiatan + 'kegiatan/user', body, httpOptions);
  }

  all(): Observable<Kegiatan[]> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'listkegiatan'
    }
    return this.httpClient.post<Kegiatan[]>(this.url_kegiatan + 'kegiatan/all', body, httpOptions);
  }

  edit(kegiatan: Kegiatan): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    delete kegiatan.galeri;
    var body = {
      nama: 'editkegiatan',
      data: kegiatan
    }
    return this.httpClient.post(this.url_kegiatan + 'edit', body, httpOptions);
  }

  hapus(id: number): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'hapuskegiatan'
    }
    return this.httpClient.post(this.url_kegiatan + 'hapus/' + id,body,httpOptions);
  }
}
