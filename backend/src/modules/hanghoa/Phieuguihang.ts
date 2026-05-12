import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Giaodich } from "../giaodich/Giaodich";
import { Hanghoa } from "./Hanghoa";
import { Khachhang } from "../khachhang/Khachhang";
import { Tichdiem } from "../khachhang/Tichdiem";

@Index("PK_PHIEUGUIHANG", ["maphieuhang"], { unique: true })
@Entity("PHIEUGUIHANG")
export class Phieuguihang {
  @Column("varchar2", { primary: true, name: "MAPHIEUHANG", length: 20 })
  maphieuhang: string;

  @Column("varchar2", { name: "TENNGUOINHAN", nullable: true, length: 100 })
  tennguoinhan: string | null;

  @Column("varchar2", { name: "SDTNGUOINHAN", nullable: true, length: 15 })
  sdtnguoinhan: string | null;

  @Column("varchar2", { name: "DIACHINHAN", nullable: true, length: 200 })
  diachinhan: string | null;

  @Column("varchar2", { name: "DIACHIGUI", nullable: true, length: 200 })
  diachigui: string | null;

  @Column("number", {
    name: "THANHTIEN",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  thanhtien: number | null;

  @Column("timestamp", { name: "NGAYGUI", nullable: true, scale: 6 })
  ngaygui: Date | null;

  @Column("number", {
    name: "TRANGTHAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  trangthai: number | null;

  @OneToMany(() => Giaodich, (giaodich) => giaodich.maphieuhang)
  giaodiches: Giaodich[];

  @OneToMany(() => Hanghoa, (hanghoa) => hanghoa.maphieuhang)
  hanghoas: Hanghoa[];

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.phieuguihangs)
  @JoinColumn([{ name: "MAKH", referencedColumnName: "makh" }])
  makh: Khachhang;

  @OneToMany(() => Tichdiem, (tichdiem) => tichdiem.maphieuhang)
  tichdiiems: Tichdiem[];
}
