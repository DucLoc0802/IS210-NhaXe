import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Giolaixe } from "./Giolaixe";
import { Hosochuyenxe } from "../chuyenxe/Hosochuyenxe";
import { Nhanvien } from "./Nhanvien";

@Index("PK_TAIXE", ["matx"], { unique: true })
@Entity("TAIXE")
export class Taixe {
  @Column("varchar2", { primary: true, name: "MATX", length: 20 })
  matx: string;

  @Column("varchar2", { name: "MAGPLX", nullable: true, length: 50 })
  magplx: string | null;

  @Column("date", { name: "NGAYHETHANGPLX", nullable: true })
  ngayhethangplx: Date | null;

  @Column("varchar2", { name: "HANGGPLX", nullable: true, length: 20 })
  hanggplx: string | null;

  @OneToMany(() => Giolaixe, (giolaixe) => giolaixe.matx2)
  giolaixes: Giolaixe[];

  @OneToMany(() => Hosochuyenxe, (hosochuyenxe) => hosochuyenxe.matx)
  hosochuyenxes: Hosochuyenxe[];

  @OneToMany(() => Hosochuyenxe, (hosochuyenxe) => hosochuyenxe.matx2)
  hosochuyenxes2: Hosochuyenxe[];

  @OneToOne(() => Nhanvien, (nhanvien) => nhanvien.taixe)
  @JoinColumn([{ name: "MATX", referencedColumnName: "manv" }])
  matx2: Nhanvien;
}
