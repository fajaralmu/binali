import { Component, OnInit } from '@angular/core';
import { Program } from '../program';
import { ProgramService } from '../program.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { AppComponent } from '../app.component';
import { animasi } from '../animasi';
import { KegiatanService } from '../kegiatan.service';
import { DivisiService } from '../divisi.service';
import { Divisi } from '../divisi';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css', '../app.component.css'],
  animations: [
    animasi
  ]
})
export class ProgramComponent implements OnInit {
  comp:any = this;
  baru: boolean = true;
  admin: boolean = false;
  valid: boolean = false;
  program: Program = { id: 0, namaprogram: "", deskripsi: "", iddivisi: 1 }
  listprogram: Program[];
  listdivisi:Divisi[];
  id_terpilih: number = 0;
  constructor(private judul: Title, private programService: ProgramService, private userService: UserService, private divisiService:DivisiService,     
    private router: Router, private app: AppComponent, private kegiatanService: KegiatanService) { }

  tambah() {
    if (!confirm('Lanjutkan?') || !this.baru)
      return;
    this.programService.tambah(this.program).subscribe(
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
    this.judul.setTitle('Program Kerja');
    this.app.setMenu(4);
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
    this.program = this.listprogram.find(p => p.id == id);
    this.id_terpilih = id;
    this.baru = false;
  }

  edit() {
    if (!confirm('lanjutkan?'))
      return;
    this.programService.edit(this.program).subscribe(
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
    var prg = this.listprogram.find(p=>p.id==id);
    if(prg['jmlkegiatan']>0){
      alert('Program masih terlaksana!');
      return;
    }
    this.programService.hapus(id).subscribe(
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

  list_divisi(){
    this.divisiService.list().subscribe(
      data=>{
        this.listdivisi = data;
        this.listprogram.forEach(
          p=>p['namadivisi'] = this.listdivisi.find(d=>d.id == p.iddivisi).namadivisi
        )
      }
    )
  }

  list() {
    this.clear();
    this.baru = true;
    this.programService.list().subscribe(
      data => {
        data.forEach(d => {
          this.kegiatanService.get_by_program(d.id).subscribe(
            jmlkegiatan => d['jmlkegiatan'] = jmlkegiatan
          );  
        })
        this.listprogram = data;
        this.list_divisi();
      }
    )
  }

  clear() {
    this.id_terpilih = -1;
    this.program = { id: 0, namaprogram: "", deskripsi: "", iddivisi:1 };
  }

}
