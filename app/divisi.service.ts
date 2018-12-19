import { Injectable } from '@angular/core';
import { Divisi } from './divisi';
import { url_api } from './api_url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisiService {
  list_divisi: Divisi[];
  divisi: Divisi;
  url_api_divisi: string = url_api+'divisi/';

  constructor(private httpClient: HttpClient) { }

  tambah(divisi: Divisi): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'tambahdivisi',
      data: divisi
    };
    return this.httpClient.post(this.url_api_divisi + 'tambah/', body, httpOptions);
  }

  get_divisi(id: number): Observable<any> {
    return this.httpClient.get(this.url_api_divisi + 'get/' + id);
  }

  list(): Observable<Divisi[]> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'listkegiatan'
    }
    console.log('URL divisi',this.url_api_divisi);
    return this.httpClient.post<Divisi[]>(this.url_api_divisi + 'semuadivisi', body, httpOptions);
  }

  edit(divisi: Divisi): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'edit',
      data: divisi
    }
    return this.httpClient.post(this.url_api_divisi + 'edit', body,httpOptions);
  }

  hapus(id: number): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'hapus'
    }
    return this.httpClient.post(this.url_api_divisi + 'hapus/' + id, body, httpOptions);
  }
}

