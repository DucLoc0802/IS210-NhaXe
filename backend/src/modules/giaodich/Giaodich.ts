import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Phieudatve } from "../../ve/Phieudatve";
import { Phieuguihang } from "./Phieuguihang";

@Index("PK_GIAODICH", ["magd"], { unique: true })
@Entity("GIAODICH")
export class Giaodich {
  @Column("varchar2", { primary: true, name: "MAGD", length: 20 })
  magd: string;

  @Column("timestamp", { name: "THOIGIANGD", nullable: true, scale: 6 })
  thoigiangd: Date | null;

  @Column("varchar2", { name: "PHUONGTHUC", nullable: true, length: 50 })
  phuongthuc: string | null;

  @Column("number", { name: "SOTIEN", nullable: true, precision: 15, scale: 2 })
  sotien: number | null;

  @Column("number", {
    name: "TRANGTHAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  trangthai: number | null;

  @ManyToOne(() => Phieudatve, (phieudatve) => phieudatve.giaodiches)
  @JoinColumn([{ name: "MAPHIEUVE", referencedColumnName: "maphieuve" }])
  maphieuve: Phieudatve;

  @ManyToOne(() => Phieuguihang, (phieuguihang) => phieuguihang.giaodiches)
  @JoinColumn([{ name: "MAPHIEUHANG", referencedColumnName: "maphieuhang" }])
  maphieuhang: Phieuguihang;
}
