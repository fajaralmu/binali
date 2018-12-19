import { Component, OnInit } from '@angular/core';
import { Divisi } from '../divisi';
import { DivisiService } from '../divisi.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { KegiatanService } from '../kegiatan.service';
import { animasi } from '../animasi';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-divisi',
  templateUrl: './divisi.component.html',
  styleUrls: ['./divisi.component.css', '../app.component.css'],
  animations: [
    animasi
  ]

})
export class DivisiComponent implements OnInit {

  comp:any=this;
  baru: boolean = true;
  admin: boolean = false;
  valid: boolean = false;
  divisi: Divisi = { id: 0, namadivisi: "", deskripsi: "" }
  listdivisi: Divisi[];
  id_terpilih: number = 0;
  constructor(private judul: Title,private divisiService: DivisiService, private userService: UserService,
    private router: Router, private app: AppComponent, private kegiatanService: KegiatanService) { }

  tambah() {
    if (!confirm('Lanjutkan?') || !this.baru)
      return;
    this.divisiService.tambah(this.divisi).subscribe(
      data => {
        if (data == true) {
          alert('berhasil');
          this.list();
        } else {
          alert('gagal');
        }
      });
  }

  switchtambah() {
    this.baru = true;
    this.clear();
  }

  ngOnInit() {
    this.judul.setTitle('Divisi');
    this.app.setMenu(5);
    this.userService.user_masuk().subscribe(
      data => {
        if (data['status'] == 1) {
          var user: User = data['user'];
          this.admin = user.admin == 1;
          this.valid = true;
          console.log(user);
          this.list();
        } else {
          this.valid = false;
          this.router.navigate(['masuk']);
        }
      }
    );
  }

  tampil(id: number) {
    this.divisi = this.listdivisi.find(p => p.id == id);
    this.id_terpilih = id;
    this.baru = false;
  }

  edit() {
    if (!confirm('lanjutkan?'))
      return;
    this.divisiService.edit(this.divisi).subscribe(
      data => {
        if (data == true) {
      
          alert('berhasil');
          this.list();
        } else {
          alert('gagal');
        }
      }
    )
  }

  hapus(id: number) {
    if (!confirm('hapus?')) {
      return;
    }
    var prg = this.listdivisi.find(p=>p.id==id);
    if(prg['jmlkegiatan']>0){
      alert('Divisi masih terlaksana!');
      return;
    }
    this.divisiService.hapus(id).subscribe(
      data => {
        if (data == true) {
          alert('berhasil dihapus');
          this.list();
        } else {
          alert('gagal dihapus');
        }
      }
    );
  }

  list() {
    this.clear();
    this.baru = true;
    this.divisiService.list().subscribe(
      data => {
       this.listdivisi = data;
      }
    )
  }

  clear() {
    this.id_terpilih = -1;
    this.divisi = { id: 0, namadivisi: "", deskripsi: "" };
  }

}
