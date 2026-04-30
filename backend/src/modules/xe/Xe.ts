import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Hosochuyenxe } from "./Hosochuyenxe";
import { Loaixe } from "./Loaixe";

@Index("PK_XE", ["maxe"], { unique: true })
@Index("UNQ_XE_BIENSO", ["biensoxe"], { unique: true })
@Entity("XE")
export class Xe {
  @Column("varchar2", { primary: true, name: "MAXE", length: 20 })
  maxe: string;

  @Column("varchar2", { name: "BIENSOXE", unique: true, length: 20 })
  biensoxe: string;

  @Column("date", { name: "HANDANGKIEM", nullable: true })
  handangkiem: Date | null;

  @Column("number", {
    name: "TRANGTHAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  trangthai: number | null;

  @OneToMany(() => Hosochuyenxe, (hosochuyenxe) => hosochuyenxe.maxe)
  hosochuyenxes: Hosochuyenxe[];

  @ManyToOne(() => Loaixe, (loaixe) => loaixe.xes)
  @JoinColumn([{ name: "MALOAIXE", referencedColumnName: "maloaixe" }])
  maloaixe: Loaixe;
}
