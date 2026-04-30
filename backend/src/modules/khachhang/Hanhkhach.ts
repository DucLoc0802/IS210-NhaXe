import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Khachhang } from "./Khachhang";
import { Ve } from "./Ve";

@Index("PK_HANHKHACH", ["mahk"], { unique: true })
@Entity("HANHKHACH")
export class Hanhkhach {
  @Column("varchar2", { primary: true, name: "MAHK", length: 20 })
  mahk: string;

  @Column("varchar2", { name: "HOTEN", nullable: true, length: 100 })
  hoten: string | null;

  @Column("date", { name: "NGAYSINH", nullable: true })
  ngaysinh: Date | null;

  @Column("varchar2", { name: "SDT", nullable: true, length: 15 })
  sdt: string | null;

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.hanhkhaches)
  @JoinColumn([{ name: "MAKH", referencedColumnName: "makh" }])
  makh: Khachhang;

  @OneToMany(() => Ve, (ve) => ve.mahk)
  ves: Ve[];
}
