import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Taixe } from "./Taixe";

@Index("PK_GIOLAIXE", ["matx", "ngaylai"], { unique: true })
@Entity("GIOLAIXE")
export class Giolaixe {
  @Column("varchar2", { primary: true, name: "MATX", length: 20 })
  matx: string;

  @Column("date", { primary: true, name: "NGAYLAI" })
  ngaylai: Date;

  @Column("number", {
    name: "TONGGIOLAI",
    nullable: true,
    precision: 4,
    scale: 2,
  })
  tonggiolai: number | null;

  @ManyToOne(() => Taixe, (taixe) => taixe.giolaixes)
  @JoinColumn([{ name: "MATX", referencedColumnName: "matx" }])
  matx2: Taixe;
}
