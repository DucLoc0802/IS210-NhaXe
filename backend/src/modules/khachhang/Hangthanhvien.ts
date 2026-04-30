import { Column, Entity, Index, OneToMany } from "typeorm";
import { Khachhang } from "./Khachhang";

@Index("PK_HANGTHANHVIEN", ["mahang"], { unique: true })
@Entity("HANGTHANHVIEN")
export class Hangthanhvien {
  @Column("varchar2", { primary: true, name: "MAHANG", length: 20 })
  mahang: string;

  @Column("varchar2", { name: "TENHANG", nullable: true, length: 50 })
  tenhang: string | null;

  @Column("number", {
    name: "DIEMTOITHIEU",
    nullable: true,
    default: () => "0",
  })
  diemtoithieu: number | null;

  @Column("number", {
    name: "GIAMGIA",
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => "0",
  })
  giamgia: number | null;

  @Column("number", {
    name: "HESOTICHDIEM",
    nullable: true,
    precision: 5,
    scale: 2,
    default: () => "1",
  })
  hesotichdiem: number | null;

  @OneToMany(() => Khachhang, (khachhang) => khachhang.mahang)
  khachhangs: Khachhang[];
}
