import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Taikhoan } from "../auth/Taikhoan";
import { Taixe } from "./Taixe";

@Index("PK_NHANVIEN", ["manv"], { unique: true })
@Index("UNQ_NV_EMAIL", ["email"], { unique: true })
@Index("UNQ_NV_SDT", ["sdt"], { unique: true })
@Entity("NHANVIEN")
export class Nhanvien {
  @Column("varchar2", { primary: true, name: "MANV", length: 20 })
  manv: string;

  @Column("varchar2", { name: "HOTEN", nullable: true, length: 100 })
  hoten: string | null;

  @Column("date", { name: "NGAYSINH", nullable: true })
  ngaysinh: Date | null;

  @Column("varchar2", { name: "GIOITINH", nullable: true, length: 10 })
  gioitinh: string | null;

  @Column("varchar2", { name: "SDT", nullable: true, unique: true, length: 15 })
  sdt: string | null;

  @Column("varchar2", {
    name: "EMAIL",
    nullable: true,
    unique: true,
    length: 100,
  })
  email: string | null;

  @Column("varchar2", { name: "CCCD", nullable: true, length: 20 })
  cccd: string | null;

  @Column("varchar2", { name: "VITRI", nullable: true, length: 50 })
  vitri: string | null;

  @Column("date", { name: "NGAYVAOLAM", nullable: true })
  ngayvaolam: Date | null;

  @Column("number", {
    name: "LUONGCB",
    nullable: true,
    precision: 15,
    scale: 2,
  })
  luongcb: number | null;

  @Column("number", {
    name: "TRANGTHAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  trangthai: number | null;

  @ManyToOne(() => Taikhoan, (taikhoan) => taikhoan.nhanviens)
  @JoinColumn([{ name: "MATK", referencedColumnName: "matk" }])
  matk: Taikhoan;

  @OneToOne(() => Taixe, (taixe) => taixe.matx2)
  taixe: Taixe;
}
