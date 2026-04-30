import { Column, Entity, Index, OneToMany } from "typeorm";
import { Xe } from "./Xe";

@Index("PK_LOAIXE", ["maloaixe"], { unique: true })
@Entity("LOAIXE")
export class Loaixe {
  @Column("varchar2", { primary: true, name: "MALOAIXE", length: 20 })
  maloaixe: string;

  @Column("varchar2", { name: "TENLOAI", nullable: true, length: 50 })
  tenloai: string | null;

  @Column("number", { name: "SOLUONGGHE", nullable: true })
  soluongghe: number | null;

  @Column("varchar2", { name: "SODOGHE", nullable: true, length: 100 })
  sodoghe: string | null;

  @Column("varchar2", { name: "HANGXE", nullable: true, length: 50 })
  hangxe: string | null;

  @Column("varchar2", { name: "PHANLOAI", nullable: true, length: 50 })
  phanloai: string | null;

  @OneToMany(() => Xe, (xe) => xe.maloaixe)
  xes: Xe[];
}
