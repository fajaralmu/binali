import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../program';
import { User } from '../user';
import { Divisi } from '../divisi';
import { animasi } from '../animasi';
import { AbsenComponent } from '../absen/absen.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css', '../app.component.css'],
  animations: [animasi]
})
export class FilterComponent implements OnInit {
  @Input('user')
  user: User;
  @Input('comp')
  comp: any;
  @Input('listbpd')
  listbpd: User[];
  @Input('listprogram')
  listprogram: Program[];
  @Input('listdivisi')
  listdivisi: Divisi[];

  done: number = 1;
  undone: number = -1;
  show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  show_filterbox() {
    this.show = true;
  }

  close_filterbox() {
    this.show = false;
  }

  filter() {
    console.log(this.comp);
    this.comp.filtered_listkegiatan = this.comp.listkegiatan.filter(k => {
      var program: Program = this.comp.listprogram.find(p => p.id == k.idprogram);

      var filter_bpd: boolean = this.comp.filtered_bpd == 0 ? k.iduser != 0 : k.iduser == this.comp.filtered_bpd;
      var filter_program: boolean = this.comp.filtered_program == 0 ? k.idprogram != 0 : k.idprogram == this.comp.filtered_program;
      var filter_divisi: boolean = this.comp.filtered_divisi == 0 ? program.iddivisi != 0 : program.iddivisi == this.comp.filtered_divisi;
      var filter_pelaksanaan: boolean = this.comp.filtered_pelaksanaan == 0 ? k.terlaksana != 0 : k.terlaksana == this.comp.filtered_pelaksanaan;
      return filter_bpd && filter_program && filter_divisi && filter_pelaksanaan;
    });
    this.comp.filtercallback();
  }

}
