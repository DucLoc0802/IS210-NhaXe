import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Khachhang } from "./Khachhang";
import { Phieudatve } from "../ve/Phieudatve";
import { Phieuguihang } from "../hanghoa/Phieuguihang";

@Index("PK_TICHDIEM", ["matichdiem"], { unique: true })
@Entity("TICHDIEM")
export class Tichdiem {
  @Column("varchar2", { primary: true, name: "MATICHDIEM", length: 20 })
  matichdiem: string;

  @Column("number", { name: "SODIEMGD", nullable: true })
  sodiemgd: number | null;

  @Column("timestamp", { name: "NGAYGD", nullable: true, scale: 6 })
  ngaygd: Date | null;

  @Column("varchar2", { name: "GHICHU", nullable: true, length: 200 })
  ghichu: string | null;

  @ManyToOne(() => Khachhang, (khachhang) => khachhang.tichdiiems)
  @JoinColumn([{ name: "MAKH", referencedColumnName: "makh" }])
  makh: Khachhang;

  @ManyToOne(() => Phieudatve, (phieudatve) => phieudatve.tichdiiems)
  @JoinColumn([{ name: "MAPHIEUVE", referencedColumnName: "maphieuve" }])
  maphieuve: Phieudatve;

  @ManyToOne(() => Phieuguihang, (phieuguihang) => phieuguihang.tichdiiems)
  @JoinColumn([{ name: "MAPHIEUHANG", referencedColumnName: "maphieuhang" }])
  maphieuhang: Phieuguihang;
}
