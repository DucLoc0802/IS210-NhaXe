import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Hosochuyenxe } from "../chuyenxe/Hosochuyenxe";
import { Phieuguihang } from "./Phieuguihang";

@Index("PK_HANGHOA", ["mahh"], { unique: true })
@Entity("HANGHOA")
export class Hanghoa {
  @Column("varchar2", { primary: true, name: "MAHH", length: 20 })
  mahh: string;

  @Column("varchar2", { name: "LOAIHH", nullable: true, length: 50 })
  loaihh: string | null;

  @Column("number", {
    name: "GIACUOC",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  giacuoc: number | null;

  @Column("number", {
    name: "KHOILUONG",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  khoiluong: number | null;

  @ManyToOne(() => Hosochuyenxe, (hosochuyenxe) => hosochuyenxe.hanghoas)
  @JoinColumn([{ name: "MACHUYEN", referencedColumnName: "machuyen" }])
  machuyen: Hosochuyenxe;

  @ManyToOne(() => Phieuguihang, (phieuguihang) => phieuguihang.hanghoas)
  @JoinColumn([{ name: "MAPHIEUHANG", referencedColumnName: "maphieuhang" }])
  maphieuhang: Phieuguihang;
}
