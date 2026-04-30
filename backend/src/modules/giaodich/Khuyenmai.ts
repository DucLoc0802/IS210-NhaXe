import { Column, Entity, Index, OneToMany } from "typeorm";
import { Phieudatve } from "../../ve/Phieudatve";

@Index("PK_KHUYENMAI", ["makm"], { unique: true })
@Entity("KHUYENMAI")
export class Khuyenmai {
  @Column("varchar2", { primary: true, name: "MAKM", length: 20 })
  makm: string;

  @Column("varchar2", { name: "TENKM", nullable: true, length: 100 })
  tenkm: string | null;

  @Column("date", { name: "NGAYBD", nullable: true })
  ngaybd: Date | null;

  @Column("date", { name: "NGAYKT", nullable: true })
  ngaykt: Date | null;

  @Column("varchar2", { name: "LOAIKM", nullable: true, length: 50 })
  loaikm: string | null;

  @Column("varchar2", { name: "DIEUKIEN", nullable: true, length: 200 })
  dieukien: string | null;

  @Column("number", {
    name: "GIAMGIA",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  giamgia: number | null;

  @Column("number", {
    name: "TINHTRANG",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  tinhtrang: number | null;

  @OneToMany(() => Phieudatve, (phieudatve) => phieudatve.makm)
  phieudatves: Phieudatve[];
}
