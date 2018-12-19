import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Program } from './program';
import { Observable } from 'rxjs';
import { url_api } from './api_url';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  list_program: Program[];
  program: Program;
  url_api_program: string = url_api+'program/';

  constructor(private httpClient: HttpClient) { }


  tambah(program: Program): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'tambahprogram',
      data: program
    }
    return this.httpClient.post(this.url_api_program + 'tambah/', body, httpOptions);
  }

  get_program(id: number): Observable<any> {
    return this.httpClient.get(this.url_api_program + 'get/' + id);
  }

  list(): Observable<Program[]> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'listkegiatan'
    }
    console.log('URL program',this.url_api_program);
    return this.httpClient.post<Program[]>(this.url_api_program + 'semuaprogram', body, httpOptions);
  }

  edit(program: Program): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'edit',
      data: program
    }
    return this.httpClient.post(this.url_api_program + 'edit', body,httpOptions);
  }

  hapus(id: number): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'hapus'
    }
    return this.httpClient.post(this.url_api_program + 'hapus/' + id, body, httpOptions);
  }
}
