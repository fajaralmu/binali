import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, tap, catchError } from 'rxjs/operators';
import { url_api } from './api_url';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  uservalid: boolean;
  user: User;
  url_user: string = url_api + 'akun/';

  constructor(private httpClient: HttpClient) { }

  tambah(user: User): Observable<any> {
    return this.httpClient.post(this.url_user + 'tambah/user', user);
  }

  update(user: User): Observable<any> {
    var payload = {
      nama: 'updateuser',
      parameter: {
        username: user.username,
        katasandi: user.katasandi,
        email: user.email,
        id: user.id,
        nama: user.nama
      }

    }
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    return this.httpClient.post(this.url_user + 'update', payload, httpOptions);
  }

  masuk(user: User): Observable<any> {
    //alert('tambah');
    var payload = {
      nama: 'tokenbaru',
      parameter: {
        username: user.username,
        katasandi: user.katasandi
      }

    }
    return this.httpClient.post(this.url_user + 'masuk', payload, httpOptions);
  }

  user_masuk(): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'dasbor'
    }
    return this.httpClient.post(this.url_user + 'dasbor', body, httpOptions);
  }

  cek_valid(): void {
    var username = localStorage.getItem('username');
    var katasandi = localStorage.getItem('katasandi');
    this.cek_user(username, katasandi).subscribe(
      res => {
        this.uservalid = res;
        //alert(res);
        console.log(res);
      }
    )
  }

  get loggedUser() {
    return this.user;
  }

  private setuser(user: User) {
    this.user = user;
  }

  semua_bpd(): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'semuabpd'
    }
    return this.httpClient.post(this.url_user + 'semuabpd', body, httpOptions);
  }

  get_user(): Observable<any> {
    var username = localStorage.getItem('username');
    return this.httpClient.get(this.url_user + 'get/' + username, httpOptions).pipe(
      tap(
        (res => this.setuser(res['user'])),
        (error => console.log(error))
      )
    )
  }

  get(username: string): Observable<any> {
    return this.httpClient.get(this.url_user + 'get/' + username, httpOptions);
  }

  get_id(id: number): Observable<any> {
    var token = localStorage.getItem('token');
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    };
    var body = {
      nama: 'namabpd'
    }
    return this.httpClient.post(this.url_user + 'get_id/' + id, body, httpOptions);
  }

  sudah_masuk(): boolean {
    this.cek_valid();
    return this.uservalid;
  }

  private cek_user(username, katasandi): Observable<any> {
    var data = { username: username, katasandi: katasandi };
    return this.httpClient.post(this.url_user + 'cek', data);
  }

  keluar() {
    localStorage.clear();
    this.uservalid = false;
  }
}
