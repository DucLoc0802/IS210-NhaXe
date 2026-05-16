import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('lookup')
export class LookupController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Post('sdt')
  async lookupBySdt(@Body('sdt') sdt: string) {
    const customers = await this.dataSource.query(
      `SELECT * FROM khachhang WHERE sdt = :0`,
      [sdt],
    );
    if (customers.length === 0) return { customer: null, tickets: [] };
    const kh = customers[0];
    const tickets = await this.dataSource.query(
      `SELECT v.mave, v.maghe, v.giave, v.trangthai trangthai_ve,
              cx.machuyen, cx.tgkhoihanh, cx.tgden,
              tx.matuyen, tx.tentuyen,
              bd.tenben bendau, bd.tinhthanh tinhthanh_di,
              bc.tenben bencuoi, bc.tinhthanh tinhthanh_den,
              hk.hoten ten_hanhkhach
       FROM ve v
       JOIN hosochuyenxe cx ON v.machuyen = cx.machuyen
       JOIN tuyenxe tx ON cx.matuyen = tx.matuyen
       JOIN benxe bd ON tx.mabendau = bd.maben
       JOIN benxe bc ON tx.mabencuoi = bc.maben
       LEFT JOIN hanhkhach hk ON v.mahk = hk.mahk
       LEFT JOIN phieudatve pdv ON v.maphieuve = pdv.maphieuve
       WHERE pdv.makh = :0
       ORDER BY cx.tgkhoihanh DESC`,
      [kh.makh],
    );
    return { customer: kh, tickets };
  }

  @Get('ticket/:maVe')
  async lookupByTicketCode(@Param('maVe') maVe: string) {
    const result = await this.dataSource.query(
      `SELECT v.mave, v.maghe, v.giave, v.trangthai trangthai_ve,
              cx.machuyen, cx.tgkhoihanh, cx.tgden,
              tx.matuyen, tx.tentuyen,
              bd.tenben bendau, bd.tinhthanh tinhthanh_di,
              bc.tenben bencuoi, bc.tinhthanh tinhthanh_den,
              hk.hoten ten_hanhkhach
       FROM ve v
       JOIN hosochuyenxe cx ON v.machuyen = cx.machuyen
       JOIN tuyenxe tx ON cx.matuyen = tx.matuyen
       JOIN benxe bd ON tx.mabendau = bd.maben
       JOIN benxe bc ON tx.mabencuoi = bc.maben
       LEFT JOIN hanhkhach hk ON v.mahk = hk.mahk
       WHERE v.mave = :0`,
      [maVe],
    );
    return result.length > 0 ? result[0] : null;
  }
}
