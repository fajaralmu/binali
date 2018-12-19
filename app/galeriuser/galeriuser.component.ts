import { Component, OnInit } from '@angular/core';
import { animasi } from '../animasi';
import { Gambar } from '../gambar';
import { Kegiatan } from '../kegiatan';
import { Program } from '../program';
import { UploadService } from '../upload.service';
import { KegiatanService } from '../kegiatan.service';
import { ProgramService } from '../program.service';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { User } from '../user';
import { url_image } from '../api_url';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-galeriuser',
  templateUrl: './galeriuser.component.html',
  styleUrls: ['./galeriuser.component.css', '../app.component.css'],
  animations: [animasi]
})
export class GaleriuserComponent implements OnInit {
  url_image:string = url_image;
  gambartampil: Gambar = {
    id: 0,
    nama: '',
    idkegiatan: 0
  };
  indexgambar: number = 0;
  bpd: string;
  kegiatan: Kegiatan;
  tampilgambar: boolean = false;
  listgaleri: Gambar[];
  listkegiatan: Kegiatan[];
  listprogram: Program[];

  constructor(private judul: Title,private gambarService: UploadService, private userService: UserService,
    private kegiatanService: KegiatanService, private programService: ProgramService, private app: AppComponent) { }

  ngOnInit() {
    this.judul.setTitle('Galeri');
    this.app.setMenu(6);
    this.list_program();
  }

  list_program() {
    this.programService.list().subscribe(
      data => {
        console.log('program', data);
        this.listprogram = data;
        this.list_kegiatan();
      }
    )
  }

  list_kegiatan() {
    this.kegiatanService.all().subscribe(
      data => {
        console.log('kegiatan',data);
        this.listkegiatan = data;
        this.listkegiatan.forEach(
          k => {
            k['nama'] = this.listprogram.find(p => p.id == k.idprogram).namaprogram;
          }
        );
        this.list_galeri();
      }
    )
  }

  list_galeri() {
    this.gambarService.all().subscribe(
      data => {
        this.listgaleri = data;
      }
    )
  }

  navimage(action: string) {
    if (action == 'next') {
      this.indexgambar++;
      if (this.indexgambar > this.listgaleri.length) {
        this.indexgambar = 0;
      }
    } else if (action == 'prev') {
      this.indexgambar--;
      if (this.indexgambar < 0) {
        this.indexgambar = this.listgaleri.length - 1;
      }
    }
    this.gambartampil = this.listgaleri.find((v, i) => i == this.indexgambar);
    this.tampil(this.gambartampil, this.indexgambar);
  }

  tutup(){
    this.tampilgambar = false;
  }

  tampil(img: Gambar, index) {
    this.tampilgambar = true;
    this.gambartampil = img;
    this.kegiatan = this.listkegiatan.find((k) => k.id == img.idkegiatan);
    console.log(this.kegiatan);

    this.indexgambar = index;
    this.userService.get_id(this.kegiatan.iduser).subscribe(
      data => {
        if (data['ok'] == 1) {
          this.bpd = data['namauser'];
        }
      }
    )
  }
}
