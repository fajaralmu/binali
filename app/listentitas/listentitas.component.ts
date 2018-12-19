import { Component, OnInit, Input } from '@angular/core';
import { animasi } from '../animasi';

@Component({
  selector: 'app-listentitas',
  templateUrl: './listentitas.component.html',
  styleUrls: ['../dasbor/dasbor.component.css', './listentitas.component.css', '../app.component.css'],
  animations: [animasi]
})
export class ListentitasComponent implements OnInit {
  filter: any;
  filterkey: string;
  jumlahtampil: number = 5;

  @Input('listdivisi_tampil')
  listdivisi_tampil: number;
  @Input('listkegiatan_tampil')
  listkegiatan_tampil: number;
  @Input('listprogram_tampil')
  listprogram_tampil: number;

  listentitas: Object[];
  listentitas_ori: Object[];

  @Input('comp')
  comp: any;

  halaman_skrg: number = 0;
  totalrecord: number = 0;
  jumlahtombol: number = 0;
  listtombol: Paginasi[] = [];

  constructor() { }

  @Input('listentitas')
  set list(list: Object[]) {
    this.listentitas_ori = list;
    this.listentitas = list;
    this.jumlahtombol = this.listentitas.length / this.jumlahtampil;
    this.totalrecord = list.length;
    this.updatepaginasi();
    this.tampil(0, 0, this.jumlahtampil);
  }

  updatepaginasi() {
    this.listtombol = [];
    for (let i = 0; i < this.jumlahtombol; i++) {
      let p: Paginasi = {
        mulai: this.jumlahtampil * i,
        sampai: this.jumlahtampil * i + this.jumlahtampil * 1
      }
      this.listtombol[i] = p;
    }
  }

  tampil(halaman: number, mulai: number, sampai: number) {
    this.halaman_skrg = halaman;
    this.listentitas = this.listentitas_ori.filter(
      (e, i) => {
        return i >= mulai && i < sampai;
      }
    )
  }

  nav(aksi) {
    if (aksi == 'prev') {
      this.halaman_skrg--;
      if (this.halaman_skrg < 0) {
        this.halaman_skrg = this.listtombol.length - 1;
      }
    } else if (aksi == 'next') {
      this.halaman_skrg++;
      if (this.halaman_skrg > this.listtombol.length - 1) {
        this.halaman_skrg = 0;
      }
    }
    let i = this.halaman_skrg;
    this.tampil(i, this.listtombol[i].mulai, this.listtombol[i].sampai);
  }

  ngOnInit() {
  }

  updatejumlahtampil() {
    this.jumlahtombol = this.listentitas_ori.length / this.jumlahtampil;
    this.updatepaginasi();
    this.tampil(0, 0, this.jumlahtampil);
  }

  tampilrinci(id){
    if(typeof(this.comp.tampil) == 'function'){
      this.comp.tampil(id);
    }
  }

}

class Paginasi {
  mulai: number;
  sampai: number;
}