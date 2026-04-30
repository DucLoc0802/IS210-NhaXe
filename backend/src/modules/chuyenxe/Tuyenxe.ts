import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Hosochuyenxe } from "./Hosochuyenxe";
import { Benxe } from "./Benxe";

@Index("PK_TUYENXE", ["matuyen"], { unique: true })
@Entity("TUYENXE")
export class Tuyenxe {
  @Column("varchar2", { primary: true, name: "MATUYEN", length: 20 })
  matuyen: string;

  @Column("varchar2", { name: "TENTUYEN", nullable: true, length: 100 })
  tentuyen: string | null;

  @Column("number", {
    name: "KHOANGCACH",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  khoangcach: number | null;

  @Column("number", { name: "THOIGIAN", nullable: true })
  thoigian: number | null;

  @Column("number", {
    name: "GIAVECB",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  giavecb: number | null;

  @OneToMany(() => Hosochuyenxe, (hosochuyenxe) => hosochuyenxe.matuyen)
  hosochuyenxes: Hosochuyenxe[];

  @ManyToOne(() => Benxe, (benxe) => benxe.tuyenxes)
  @JoinColumn([{ name: "MABENCUOI", referencedColumnName: "maben" }])
  mabencuoi: Benxe;

  @ManyToOne(() => Benxe, (benxe) => benxe.tuyenxes2)
  @JoinColumn([{ name: "MABENDAU", referencedColumnName: "maben" }])
  mabendau: Benxe;
}
