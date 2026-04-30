import { Column, Entity, Index, OneToMany } from "typeorm";
import { Tuyenxe } from "./Tuyenxe";

@Index("PK_BENXE", ["maben"], { unique: true })
@Entity("BENXE")
export class Benxe {
  @Column("varchar2", { primary: true, name: "MABEN", length: 20 })
  maben: string;

  @Column("varchar2", { name: "TENBEN", nullable: true, length: 100 })
  tenben: string | null;

  @Column("varchar2", { name: "DIACHI", nullable: true, length: 200 })
  diachi: string | null;

  @Column("varchar2", { name: "TINHTHANH", nullable: true, length: 50 })
  tinhthanh: string | null;

  @OneToMany(() => Tuyenxe, (tuyenxe) => tuyenxe.mabencuoi)
  tuyenxes: Tuyenxe[];

  @OneToMany(() => Tuyenxe, (tuyenxe) => tuyenxe.mabendau)
  tuyenxes2: Tuyenxe[];
}
