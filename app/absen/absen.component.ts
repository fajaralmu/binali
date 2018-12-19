import { Component, OnInit, Input } from '@angular/core';
import { ProgramService } from '../program.service';
import { Program } from '../program';
import { Kegiatan } from '../kegiatan';
import { KegiatanService } from '../kegiatan.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { animasi } from '../animasi';
import { UploadService } from '../upload.service';
import { isArray } from 'util';
import { Gambar } from '../gambar';
import { url_image } from '../api_url';
import { DivisiService } from '../divisi.service';
import { Divisi } from '../divisi';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-absen',
  templateUrl: './absen.component.html',
  styleUrls: ['../dasbor/dasbor.component.css', './absen.component.css', '../app.component.css'],
  animations: [animasi]
})
export class AbsenComponent implements OnInit {
  @Input('user') user2: User;
  user: User = {
    id: -1, nama: '', username: '', admin: -1, email: '', katasandi: ''
  };
  comp: any = this;
  listgaleri: Gambar[];
  tampilgaleri: boolean = false;
  url_image: string = url_image;
  kegiatan_ori: Kegiatan = {
    id: 0,
    idprogram: 0,
    iduser: 0,
    tanggal: '',
    lokasi: '',
    peserta: 0,
    keterangan: '',
    galeri: [],
    terlaksana: -1
  }
  kegiatan: Kegiatan = this.kegiatan_ori;
  listkegiatan: Kegiatan[];
  filtered_listkegiatan: Kegiatan[];

  admin: boolean = false;
  valid: boolean = false;
  filtered_bpd: number = 0;
  filtered_program: number = 0;
  filtered_divisi: number = 0;
  filtered_pelaksanaan: number = 0;

  listbpd: User[] = [this.user];
  listprogram: Program[] = [];
  listdivisi: Divisi[] = [];
  id_terpilih: number = 0;

  constructor(private judul: Title, private kegiatanService: KegiatanService, private programService: ProgramService,
    private userService: UserService, private uploadService: UploadService, private divisiService: DivisiService, private router: Router) { }

  ngOnInit() {
    this.judul.setTitle('Dasbor::List Kegiatan');
    this.userService.user_masuk().subscribe(
      data => {
        if (data['status'] == 1) {
          console.log('absen', data);
          console.log('url program', this.programService.url_api_program);
          this.valid = true;
          this.user = data['user'];
          this.admin = this.user.admin == 1;
          this.list_program();
          this.list_bpd();

        } else {
          this.valid = false;
          this.router.navigate(['masuk']);
        }
      }
    );
  }

  list_bpd() {
    if (!this.admin)
      return;
    console.log("LIST BPD");
    this.userService.semua_bpd().subscribe(
      data => { this.listbpd = data; console.log(data) }
    )
  }

  list_divisi() {
    this.divisiService.list().subscribe(
      data => {
        this.listdivisi = data;
        this.filtered_listkegiatan.forEach(
          k => {
            var iddiv = this.listprogram.find(p => p.id == k.idprogram).iddivisi;
            k['namadivisi'] = this.listdivisi.find(d => d.id == iddiv).namadivisi;
          }
        );
        this.listprogram.forEach(p => {
          p['namadivisi'] = this.listdivisi.find(d => d.id == p.iddivisi).namadivisi;
        });
      }
    );
  }

  list_program() {
    this.programService.list().subscribe(
      data => {
        console.log(data);
        this.listprogram = data;
        this.list_kegiatan();
      }
    )
  }

  list_kegiatan() {
    this.clear();
    this.kegiatanService.list().subscribe(
      data => {
        console.log(data);
        this.listkegiatan = data;
        this.listkegiatan.forEach(
          k => {
            k['nama'] = this.listprogram.find(p => p.id == k.idprogram).namaprogram;
          }
        )
        this.filtered_listkegiatan = this.listkegiatan;
        this.list_divisi();
      }
    )
  }

  tambah() {
    if (!confirm('Lanjutkan?') || this.user.admin == 1)
      return;
    this.kegiatan.iduser = this.user.id;
    this.kegiatanService.tambah(this.kegiatan).subscribe(
      data => {
        if (data == true) {
          alert('berhasil');
          this.list_kegiatan();
        } else {
          alert('gagal');
        }
      });
  }


  tampil(id: number) {
    this.kegiatan = this.listkegiatan.find(p => p.id == id);
    this.id_terpilih = id;
    this.uploadService.galerikegiatan(this.kegiatan.id).subscribe(
      images => {
        if (isArray(images))
          this.kegiatan.galeri = images;
      }
    );
  }

  edit() {
    if (!confirm('lanjutkan?') || this.user.admin == 1)
      return;
    this.kegiatanService.edit(this.kegiatan).subscribe(
      data => {
        if (data == true) {
          alert('berhasil');
          this.list_kegiatan();
        } else {
          alert('gagal');
        }
      }
    )
  }

  hapus(k: Kegiatan) {
    var id = k.id;
    if (!confirm('hapus?') || this.user.admin == 1) {
      return;
    }

    if (k.galeri.length > 0) {
      alert("mohon hapus galeri kegiatan terlebih dahulu");
      return;
    }
    this.kegiatanService.hapus(id).subscribe(
      data => {
        if (data == true) {
          alert('berhasil dihapus');
          this.list_kegiatan();
        } else {
          alert('gagal dihapus');
        }
      }
    );
  }

  switch() {
    this.kegiatan = {
      id: 0,
      idprogram: 0,
      iduser: 0,
      tanggal: '',
      lokasi: '',
      peserta: 0,
      keterangan: '',
      galeri: [],
      terlaksana: -1
    }
  }

  clear() {
    this.id_terpilih = -1;
    this.filtered_listkegiatan = [];
    this.kegiatan = {
      id: 0,
      idprogram: 0,
      iduser: 0,
      tanggal: '',
      lokasi: '',
      peserta: 0,
      keterangan: '',
      galeri: [],
      terlaksana: -1
    };
  }

  preview() {
    var event = document.getElementById('gambar');
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById('output');
      output['src'] = reader.result;
    };
    reader.readAsDataURL(event['files'][0]);
  }

  upload() {
    if (this.kegiatan.id == 0) {
      alert('silakan simpan kegiatan terlebih dahulu..');
      return;
    }
    if (!confirm('Lanjut upload?')) {
      return;
    }
    var event = document.getElementById('gambar');
    var file = event['files'][0];
    this.uploadService.upload(file, event['value'], this.user, this.kegiatan.id).subscribe(
      data => {
        console.log(data);
        if (data == 1) {

          alert('oke')
          this.tampil(this.kegiatan.id);
        }
      }
    );
  }

  hapusgambar(id: number, list: boolean) {
    if (!confirm('Hapus gambar?')) {
      return;
    }
    this.uploadService.hapus(id).subscribe(
      data => {
        if (data == 1) {
          alert('berhasil');
          if (!list)
            this.tampil(this.kegiatan.id);
          else
            this.list_galeri();
        } else {
          alert('gagal');
        }
      }
    );
  }

  list_galeri() {
    this.uploadService.galeriuser(this.user.id).subscribe(
      data => {
        this.listgaleri = data;
      }
    );
  }

  togglegaleri() {
    this.tampilgaleri = !this.tampilgaleri;
    if (this.tampilgaleri) {
      this.list_galeri();
    }
  }

  filtercallback() {
  }

}
