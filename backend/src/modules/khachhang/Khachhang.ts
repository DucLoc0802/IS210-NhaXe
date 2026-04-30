import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Hanhkhach } from "./Hanhkhach";
import { Hangthanhvien } from "./Hangthanhvien";
import { Taikhoan } from "../auth/Taikhoan";
import { Phieudatve } from "../ve/Phieudatve";
import { Phieuguihang } from "../hanghoa/Phieuguihang";
import { Tichdiiem } from "./Tichdiiem";

@Index("PK_KHACHHANG", ["makh"], { unique: true })
@Index("UNQ_KH_EMAIL", ["email"], { unique: true })
@Index("UNQ_KH_SDT", ["sdt"], { unique: true })
@Entity("KHACHHANG")
export class Khachhang {
  @Column("varchar2", { primary: true, name: "MAKH", length: 20 })
  makh: string;

  @Column("varchar2", { name: "HOTEN", nullable: true, length: 100 })
  hoten: string | null;

  @Column("date", { name: "NGAYSINH", nullable: true })
  ngaysinh: Date | null;

  @Column("varchar2", { name: "GIOITINH", nullable: true, length: 10 })
  gioitinh: string | null;

  @Column("varchar2", { name: "SDT", nullable: true, unique: true, length: 15 })
  sdt: string | null;

  @Column("varchar2", {
    name: "EMAIL",
    nullable: true,
    unique: true,
    length: 100,
  })
  email: string | null;

  @Column("varchar2", { name: "CCCD", nullable: true, length: 20 })
  cccd: string | null;

  @Column("number", { name: "DIEMTICHLUY", nullable: true, default: () => "0" })
  diemtichluy: number | null;

  @OneToMany(() => Hanhkhach, (hanhkhach) => hanhkhach.makh)
  hanhkhaches: Hanhkhach[];

  @ManyToOne(() => Hangthanhvien, (hangthanhvien) => hangthanhvien.khachhangs)
  @JoinColumn([{ name: "MAHANG", referencedColumnName: "mahang" }])
  mahang: Hangthanhvien;

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.khachhangs)
  @JoinColumn([{ name: "MATK", referencedColumnName: "matk" }])
  matk: Taikhoan;

  @OneToMany(() => Phieudatve, (phieudatve) => phieudatve.makh)
  phieudatves: Phieudatve[];

  @OneToMany(() => Phieuguihang, (phieuguihang) => phieuguihang.makh)
  phieuguihangs: Phieuguihang[];

  @OneToMany(() => Tichdiiem, (tichdiiem) => tichdiiem.makh)
  tichdiiems: Tichdiiem[];
}
