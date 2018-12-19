import { Gambar } from "./gambar";

export class Kegiatan{
    id:number;
    idprogram:number;
    iduser:number;
    tanggal:string;
    lokasi:string;
    peserta:number;
    keterangan:string;
    galeri:Gambar[];
    terlaksana:number
}