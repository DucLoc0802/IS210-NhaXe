import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Hosochuyenxe } from "../chuyenxe/Hosochuyenxe";
import { Hanhkhach } from "../khachhang/Hanhkhach";
import { Phieudatve } from "./Phieudatve";

@Index("PK_VE", ["mave"], { unique: true })
@Index("UNQ_VE_GHECHUYEN", ["machuyen", "maghe"], { unique: true })
@Entity("VE")
export class Ve {
  @Column("varchar2", {
    name: "MACHUYEN",
    nullable: true,
    unique: true,
    length: 20,
  })
  machuyen: string | null;

  @Column("varchar2", {
    name: "MAGHE",
    nullable: true,
    unique: true,
    length: 10,
  })
  maghe: string | null;

  @Column("number", { name: "PHUTHU", nullable: true, precision: 15, scale: 2 })
  phuthu: number | null;

  @Column("number", { name: "GIAVE", nullable: true, precision: 15, scale: 2 })
  giave: number | null;

  @Column("number", {
    name: "TRANGTHAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  trangthai: number | null;

  @Column("varchar2", { primary: true, name: "MAVE", length: 20 })
  mave: string;

  @ManyToOne(() => Hosochuyenxe, (hosochuyenxe) => hosochuyenxe.ves)
  @JoinColumn([{ name: "MACHUYEN", referencedColumnName: "machuyen" }])
  machuyen2: Hosochuyenxe;

  @ManyToOne(() => Hanhkhach, (hanhkhach) => hanhkhach.ves)
  @JoinColumn([{ name: "MAHK", referencedColumnName: "mahk" }])
  mahk: Hanhkhach;

  @ManyToOne(() => Phieudatve, (phieudatve) => phieudatve.ves)
  @JoinColumn([{ name: "MAPHIEUVE", referencedColumnName: "maphieuve" }])
  maphieuve: Phieudatve;
}
