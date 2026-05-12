import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Giaodich } from "../giaodich/Giaodich";
import { Khachhang } from "../khachhang/Khachhang";
import { Khuyenmai } from "../giaodich/Khuyenmai";
import { Tichdiem } from "../khachhang/Tichdiem";
import { Ve } from "./Ve";

@Index("PK_PHIEUDATVE", ["maphieuve"], { unique: true })
@Entity("PHIEUDATVE")
export class Phieudatve {
  @Column("varchar2", { primary: true, name: "MAPHIEUVE", length: 20 })
  maphieuve: string;

  @Column("timestamp", { name: "NGAYDAT", nullable: true, scale: 6 })
  ngaydat: Date | null;

  @Column("number", {
    name: "THANHTIEN",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  thanhtien: number | null;

  @Column("number", {
    name: "TRANGTHAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  trangthai: number | null;

  @OneToMany(() => Giaodich, (giaodich) => giaodich.maphieuve)
  giaodiches: Giaodich[];

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.phieudatves)
  @JoinColumn([{ name: "MAKH", referencedColumnName: "makh" }])
  makh: Khachhang;

  @ManyToOne(() => Khuyenmai, (khuyenmai) => khuyenmai.phieudatves)
  @JoinColumn([{ name: "MAKM", referencedColumnName: "makm" }])
  makm: Khuyenmai;

  @OneToMany(() => Tichdiem, (tichdiem) => tichdiem.maphieuve)
  tichdiiems: Tichdiem[];

  @OneToMany(() => Ve, (ve) => ve.maphieuve)
  ves: Ve[];
}
