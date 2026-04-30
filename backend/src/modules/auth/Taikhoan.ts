import { Column, Entity, Index, OneToMany } from "typeorm";
import { Khachhang } from "../khachhang/Khachhang";
import { Nhanvien } from "./Nhanvien";

@Index("PK_TAIKHOAN", ["matk"], { unique: true })
@Entity("TAIKHOAN")
export class Taikhoan {
  @Column("varchar2", { primary: true, name: "MATK", length: 20 })
  matk: string;

  @Column("varchar2", { name: "TENTK", length: 50 })
  tentk: string;

  @Column("varchar2", { name: "MATKHAU", length: 50 })
  matkhau: string;

  @Column("date", { name: "NGAYTAO", nullable: true, default: () => "SYSDATE" })
  ngaytao: Date | null;

  @Column("varchar2", { name: "VAITRO", nullable: true, length: 20 })
  vaitro: string | null;

  @OneToMany(() => Khachhang, (khachhang) => khachhang.matk)
  khachhangs: Khachhang[];

  @OneToMany(() => Nhanvien, (nhanvien) => nhanvien.matk)
  nhanviens: Nhanvien[];
}
