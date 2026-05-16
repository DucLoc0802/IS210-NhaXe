import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/vehicles')
export class VehicleProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('them')
  them(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_XE(:1, :2, :3, :4, :5); END;`,
      [dto.p_MaXe, dto.p_MaLoaiXe, dto.p_BienSoXe, dto.p_HanDangKiem, 0],
    );
  }

  @Post('cap-nhat')
  capNhat(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_CAPNHAT_XE(:1, :2, :3, :4, :5); END;`,
      [dto.p_MaXe, dto.p_MaLoaiXe, dto.p_BienSoXe, dto.p_TrangThai, 0],
    );
  }

  @Post('danh-sach')
  danhSach(@Body() dto: { p_TrangThai?: number }) {
    return this.proc.call(`BEGIN SP_DS_XE(:1, :2); END;`, [dto.p_TrangThai ?? '', '']);
  }

  @Post('kiem-tra-dang-kiem')
  kiemTraDangKiem(@Body() dto: { p_MaXe: string }) {
    return this.proc.call(`BEGIN SP_KIEMTRA_DANGKIEM(:1, :2, :3); END;`, [dto.p_MaXe, '', 0]);
  }

  @Post('them-loai-xe')
  themLoaiXe(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_LOAIXE(:1, :2, :3, :4, :5, :6, :7); END;`,
      [dto.p_MaLoaiXe, dto.p_TenLoai, dto.p_SoLuongGhe, dto.p_SoDoGhe, dto.p_HangXe, dto.p_PhanLoai, 0],
    );
  }

  @Get('danh-sach-loai-xe')
  danhSachLoaiXe() {
    return this.proc.call(`BEGIN SP_DS_LOAIXE(:1); END;`, ['']);
  }
}
