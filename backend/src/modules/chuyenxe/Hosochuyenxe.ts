import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Hanghoa } from "../temp/entities/Hanghoa";
import { Tuyenxe } from "./Tuyenxe";
import { Taixe } from "../nhanvien/Taixe";
import { Xe } from "./Xe";
import { Ve } from "../xe/Ve";

@Index("PK_HOSOCHUYENXE", ["machuyen"], { unique: true })
@Entity("HOSOCHUYENXE")
export class Hosochuyenxe {
  @Column("varchar2", { name: "GHICHU", nullable: true, length: 200 })
  ghichu: string | null;

  @Column("number", {
    name: "TRANGTHAI",
    nullable: true,
    precision: 1,
    scale: 0,
  })
  trangthai: number | null;

  @Column("varchar2", { primary: true, name: "MACHUYEN", length: 20 })
  machuyen: string;

  @Column("timestamp", { name: "TGKHOIHANH", nullable: true, scale: 6 })
  tgkhoihanh: Date | null;

  @Column("timestamp", { name: "TGDEN", nullable: true, scale: 6 })
  tgden: Date | null;

  @OneToMany(() => Hanghoa, (hanghoa) => hanghoa.machuyen)
  hanghoas: Hanghoa[];

  @ManyToOne(() => Tuyenxe, (tuyenxe) => tuyenxe.hosochuyenxes)
  @JoinColumn([{ name: "MATUYEN", referencedColumnName: "matuyen" }])
  matuyen: Tuyenxe;

  @ManyToOne(() => Taixe, (taixe) => taixe.hosochuyenxes)
  @JoinColumn([{ name: "MATX1", referencedColumnName: "matx" }])
  matx: Taixe;

  @ManyToOne(() => Taixe, (taixe) => taixe.hosochuyenxes2)
  @JoinColumn([{ name: "MATX2", referencedColumnName: "matx" }])
  matx2: Taixe;

  @ManyToOne(() => Xe, (xe) => xe.hosochuyenxes)
  @JoinColumn([{ name: "MAXE", referencedColumnName: "maxe" }])
  maxe: Xe;

  @OneToMany(() => Ve, (ve) => ve.machuyen2)
  ves: Ve[];
}
