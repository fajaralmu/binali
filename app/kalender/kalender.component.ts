import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { ProgramService } from '../program.service';
import { Kegiatan } from '../kegiatan';
import { KegiatanService } from '../kegiatan.service';
import { Program } from '../program';
import { User } from '../user';
import { UserService } from '../user.service';
import { Bulan } from './bulan';
import { Router } from '@angular/router';
import { animasi } from '../animasi';
import { Divisi } from '../divisi';
import { DivisiService } from '../divisi.service';
import { url_image } from '../api_url';

//import * as k from './kalender.js';

@Component({
  selector: 'app-kalender',
  templateUrl: './kalender.component.html',
  styleUrls: ['../dasbor/dasbor.component.css', './kalender.component.css', '../app.component.css'],
  animations: [
    animasi
  ]
})
export class KalenderComponent implements AfterViewInit {
  comp: any = this;
  bulan = Bulan;
  //@Input('user') 
  user: User = { id: 0, nama: '', username: '', email: '', katasandi: '', admin: 0 };


  index_bulan_skrg: number = 0;
  mulai = { pekan: 2, hari: 1, jmlhari: 31 };
  mulai_lama = { pekan: 0, hari: 0, jmlhari: 0 };
  tahun_skrg: number = 2018;

  url_gambar: string = url_image;

  @ViewChild('tgl') tabel: ElementRef;
  @ViewChild('src_bulan') input_bulan: ElementRef;
  @ViewChild('src_tahun') input_tahun: ElementRef;

  listprogram: Program[] = [];
  listbpd: User[] = [];
  listdivisi: Divisi[] = [];
  listkegiatan: Kegiatan[] = [];
  filtered_listkegiatan: Kegiatan[] = [];
  listKegiatanBulanan: Kegiatan[] = [];
  listKegiatanHarian: Kegiatan[] = [];

  filtered_bpd: number = 0;
  filtered_program: number = 0;
  filtered_divisi: number = 0;
  filtered_pelaksanaan: number = 0;

  tampildetailharian: boolean = false;
  admin: boolean = false;
  tanggal: Date = new Date();


  constructor(private kegiatanService: KegiatanService,
    private programService: ProgramService, private userService: UserService,
    private renderer: Renderer2, private router: Router, private divisiService: DivisiService) { }

  ngAfterViewInit() {
    this.tanggal = new Date();

    this.userService.user_masuk().subscribe(data => {
      if (data['status'] == 1) {
        console.log('timeline', data);
        this.user = data['user'];
        this.admin = this.user.admin == 1;
        this.list_program();
        this.list_bpd();
      } else {
        this.router.navigate(['masuk']);
      }
    });

  }

  list_bpd() {
    this.userService.semua_bpd().subscribe(
      data => this.listbpd = data
    )
  }

  list_program() {
    this.programService.list().subscribe(data => {
      console.log(data);
      this.listprogram = data;
      this.list_kegiatan();
    });
  }

  list_divisi() {
    this.divisiService.list().subscribe(
      data => {
        this.listdivisi = data;
        this.filtered_listkegiatan.forEach(k => {
          var iddiv = this.listprogram.find(p => p.id == k.idprogram).iddivisi;
          k['namadivisi'] = this.listdivisi.find(d => d.id == iddiv).namadivisi;
        });
        this.listprogram.forEach(p => {
          p['namadivisi'] = this.listdivisi.find(d => d.id == p.iddivisi).namadivisi;
        });
      }
    );
  }


  list_kegiatan() {
    this.kegiatanService.list().subscribe(
      data => {
        this.listkegiatan = data;
        this.filtered_listkegiatan = this.listkegiatan;
        this.list_divisi();
        this.load();
      }
    )
  }

  load() {
    this.buatTabel();
    this.mulai_lama = this.mulai;
    this.mulai = this.isiHari(this.index_bulan_skrg, true, this.mulai);
    this.cari(this.tanggal.getMonth(), this.tanggal.getFullYear());
  }

  buatTabel() {
    for (let r = 1; r <= 6; r++) {
      let tr = this.renderer.createElement('tr');
      // tr.setAttribute('pekan',r);
      for (let i = 1; i <= 7; i++) {
        let col = this.renderer.createElement('td');
        let className = '';
        if (i == 7) {
          className = '_tanggal_ libur'
        } else {
          className = '_tanggal_';
        }
        this.renderer.setAttribute(col, 'class', className);
        col.setAttribute('hari', i.toString());
        col.setAttribute('pekan', r.toString());
        this.renderer.appendChild(tr, col);
      }
      this.renderer.appendChild(this.tabel.nativeElement, tr);

    }

  }

  menuju() {
    let bln = this.input_bulan.nativeElement.value - 1;
    let thn = this.input_tahun.nativeElement.value;
    this.cari(bln, thn);
  }

  cari(bln, thn) {
    let selisih = +Math.abs(thn - this.tahun_skrg);
    let jmlbulan = 0;
    if (selisih > 0)
      jmlbulan = (11 - this.index_bulan_skrg) + (selisih > 1 ? ((selisih - 1) * 12) : 0) + (+bln);
    else
      jmlbulan = bln - this.index_bulan_skrg;
    //alert(jmlbulan);
    let kurangdari = false;
    if (thn - this.tahun_skrg > 0) {
      kurangdari = false;
    } else if (thn - this.tahun_skrg < 0) {
      kurangdari = true;
    } else {
      if (bln - this.index_bulan_skrg > 0) {
        kurangdari = false;
      } else {
        kurangdari = true;
      }
    }
    jmlbulan = Math.abs(jmlbulan);
    console.log('kurang dari: ', kurangdari);
    let b_calc = this.index_bulan_skrg;
    let to = (jmlbulan + this.index_bulan_skrg);
    if (jmlbulan <= 0)
      return;
    if (!kurangdari)
    //console.log('bulan skrg',index_bulan_skrg,'selisih',jmlbulan,'to',to);
    {
      for (let b = this.index_bulan_skrg + 1; b <= to; b++) {
        if (b_calc > 11) {
          b_calc = 0;

        }
        this.index_bulan_skrg = b_calc;
        this.nextmonth();
        //console.log('bulan',b_calc,'thn',tahun_skrg);
        b_calc++;
      }
    } else if (kurangdari) {
      let jmlbulankeblkg = (this.index_bulan_skrg) + (selisih > 1 ? ((selisih - 1) * 12) : 0) + (11 - bln);
      to = (jmlbulankeblkg + this.index_bulan_skrg);
      //console.log('bulan skrg', this.index_bulan_skrg, 'selisih', jmlbulan, 'from', to);
      let mulai_bulan = this.index_bulan_skrg;
      for (let b = to + 1; b >= mulai_bulan + 1; b--) {
        if (b_calc < 0) {
          b_calc = 11;
        }
        this.index_bulan_skrg = b_calc;
        this.prevmonth();
        //console.log('b',b,'bulan',b_calc);
        b_calc--;
      }

    }

  }

  date: Object = {
    hari: 0,
    bulan: 0,
    thn: 0
  }

  detail(hari, bulan, thn) {
    this.date = { hari, bulan, thn };
    this.listKegiatanHarian = [];
    this.listKegiatanHarian = this.filtered_listkegiatan.filter(p => {
      let d: Date = new Date(p.tanggal);
      if (d.getDate() == hari && (d.getMonth()) == bulan && d.getFullYear() == thn) {
        p['nama'] = this.listprogram.find(pg => pg.id == p.idprogram).namaprogram;
        return true;
      } else
        return false;
    });
    this.tampildetailharian = true;
  }

  tutupdetailharian() {
    this.listKegiatanHarian = [];
    this.tampildetailharian = false;
  }

  prevmonth() {
    this.listKegiatanBulanan = [];

    this.index_bulan_skrg--;
    if (this.index_bulan_skrg < 0) {
      this.index_bulan_skrg = 11;
      this.tahun_skrg--;
    }
    let mulai_prev = this.cariMulai(this.mulai_lama, this.mulai_lama.jmlhari);
    this.mulai_lama = {
      pekan: mulai_prev.pekan,
      hari: mulai_prev.hari,
      jmlhari: mulai_prev.jmlhari,
    }
    let switch_ = this.isiHari(this.index_bulan_skrg, false, mulai_prev);
    this.mulai = {
      pekan: switch_.pekan,
      hari: switch_.hari,
      jmlhari: switch_.jmlhari
    }

  }

  cariMulai(mulai_lama_, totalhari) {
    let b = this.index_bulan_skrg - 1;
    if (b < 0) {
      b = 11;
    }
    let hari = mulai_lama_.hari;
    let pekan = 6;
    let mulai_prev_ = {
      pekan: 0,
      hari: 0,
      jmlhari: this.bulan[b].hari
    }

    for (let h = totalhari; h >= 0; h--) {
      if (hari <= 0) {
        hari = 7;
        pekan--;
      }
      hari--;
    }
    mulai_prev_.pekan = pekan;
    mulai_prev_.hari = hari + 1;
    return mulai_prev_;
  }


  nextmonth() {
    this.listKegiatanBulanan = [];

    this.index_bulan_skrg++;
    if (this.index_bulan_skrg > 11) {
      this.index_bulan_skrg = 0;
      this.tahun_skrg++;
    }

    let switch_ = this.isiHari(this.index_bulan_skrg, true, this.mulai);
    this.mulai_lama = {
      pekan: this.mulai.pekan,
      hari: this.mulai.hari,
      jmlhari: this.mulai.jmlhari,
    }
    this.mulai = {
      pekan: switch_.pekan,
      hari: switch_.hari,
      jmlhari: switch_.jmlhari,
    }

  }

  settingHariBulan(attr, val, attr2, val2, h) {
    let dates = document.getElementsByClassName('_tanggal_');
    for (let i = 0; i < dates.length; i++) {
      let cek = dates[i].getAttribute(attr) == val;
      if (cek) {
        let cek2 = dates[i].getAttribute(attr2) == val2;
        if (cek2) {
          dates[i].innerHTML = '<b>' + h + '</b>';
          let c = 1;
          loop: for (let k = 0; k < this.filtered_listkegiatan.length; k++) {
            let p: Kegiatan = this.filtered_listkegiatan[k];
            let d: Date = new Date(p.tanggal);
            if (c < 4 && d.getDate() == h && (d.getMonth()) == this.index_bulan_skrg && d.getFullYear() == this.tahun_skrg) {
              p['nama'] = this.listprogram.find(pg => pg.id == p.idprogram).namaprogram;
              this.listKegiatanBulanan.push(p);
              let ceklist = p.terlaksana == 1 ? '&#9745;' : '&#9744;'
              dates[i].innerHTML += "<br><span style='font-size: 0.6em;'>" + c.toString() + "." + p['nama'] + ceklist + '</span>';
              c++;
            }
            if (c > 3) {
              dates[i].innerHTML += "<br>..... continue";
              break loop;
            }
          }
          this.renderer.listen(
            dates[i], 'click', () => {
              this.detail(h, this.index_bulan_skrg, this.tahun_skrg);
            }
          )
          // dates[i].setAttributeNode(klik);
        }
      }
    }
  }

  clear() {
    let dates = document.getElementsByClassName('_tanggal_');
    let a = 0;
    for (let i = 0; i < dates.length; i++) {
      dates[i].innerHTML = '';

    }
    if (this.tahun_skrg % 4 == 0) {
      this.bulan[1].hari = 29
    } else {
      this.bulan[1].hari = 28
    }
    this.listKegiatanBulanan = [];

  }

  isiHari(index_bulan_skrg, next, mulai) {
    this.clear();
    let mulai_baru = {
      pekan: mulai.pekan,
      hari: mulai.hari,
      jmlhari: mulai.jmlhari
    };
    let mulai_lama_ = {
      pekan: mulai.pekan,
      hari: mulai.hari,
      jmlhari: mulai.jmlhari
    };
    let pekan_ = mulai_baru.pekan;
    // let mulai_pekan = pekan_;
    if (mulai_baru.pekan > 1 && mulai_baru.hari > 1) {
      pekan_ = 1;
      //  mulai_pekan = 1;
    }
    let hari_ = mulai_baru.hari;
    // let mulai_hari = hari_;
    for (let h = 1; h <= this.bulan[index_bulan_skrg].hari; h++) {
      if (hari_ > 7) {
        hari_ = 1;
        pekan_++;
      }
      this.settingHariBulan('pekan', pekan_, 'hari', hari_, h);
      hari_++;
    }
    mulai_baru.pekan = pekan_ >= 5 ? 2 : 1;
    mulai_baru.hari = hari_;
    mulai_baru.jmlhari = this.bulan[index_bulan_skrg].hari;
    console.log("LAMA", mulai_lama_.hari, mulai_lama_.pekan);
    console.log("   ");
    console.log("BARU", mulai_baru.hari, mulai_baru.pekan);
    return mulai_baru;
  }

  filtercallback() {
    this.isiHari(this.index_bulan_skrg, false, this.mulai_lama);
  }

}
