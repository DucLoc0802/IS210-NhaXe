import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/employees')
export class EmployeeProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('them')
  them(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_NHANVIEN(:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11, :12); END;`,
      [dto.p_MaTK, dto.p_HoTen, dto.p_NgaySinh, dto.p_GioiTinh, dto.p_SDT, dto.p_Email, dto.p_CCCD, dto.p_ViTri, dto.p_NgayVaoLam, dto.p_LuongCB, '', 0],
    );
  }

  @Post('cap-nhat')
  capNhat(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_CAPNHAT_NHANVIEN(:1, :2, :3, :4, :5, :6, :7, :8, :9, :10); END;`,
      [dto.p_MaNV, dto.p_HoTen, dto.p_NgaySinh, dto.p_GioiTinh, dto.p_SDT, dto.p_Email, dto.p_ViTri, dto.p_LuongCB, dto.p_TrangThai, 0],
    );
  }

  @Post('danh-sach')
  danhSach(@Body() dto: { p_ViTri?: string; p_TrangThai?: number }) {
    return this.proc.call(
      `BEGIN SP_DS_NHANVIEN(:1, :2, :3); END;`,
      [dto.p_ViTri ?? '', dto.p_TrangThai ?? '', ''],
    );
  }

  @Post('them-tai-xe')
  themTaiXe(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_TAIXE(:1, :2, :3, :4, :5); END;`,
      [dto.p_MaTX, dto.p_MaGPLX, dto.p_NgayHetHanGPLX, dto.p_HangGPLX, 0],
    );
  }

  @Post('cap-nhat-tai-xe')
  capNhatTaiXe(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_CAPNHAT_TAIXE(:1, :2, :3, :4, :5); END;`,
      [dto.p_MaTX, dto.p_MaGPLX, dto.p_NgayHetHanGPLX, dto.p_HangGPLX, 0],
    );
  }

  @Post('kiem-tra-gplx')
  kiemTraGPLX(@Body() dto: { p_MaTX: string }) {
    return this.proc.call(
      `BEGIN SP_KIEMTRA_GPLX(:1, :2, :3); END;`,
      [dto.p_MaTX, '', 0],
    );
  }

  @Get('danh-sach-tai-xe')
  danhSachTaiXe() {
    return this.proc.call(`BEGIN SP_DS_TAIXE(:1); END;`, ['']);
  }

  @Post('cap-nhat-gio-lai-xe')
  capNhatGioLaiXe(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_CAPNHAT_GIOLAIXE(:1, :2, :3, :4); END;`,
      [dto.p_MaTX, dto.p_NgayLai, dto.p_TongGioLai, 0],
    );
  }

  @Post('lich-su-gio-lai')
  lichSuGioLai(@Body() dto: { p_MaTX: string; p_TuNgay: string; p_DenNgay: string }) {
    return this.proc.call(
      `BEGIN SP_LAY_GIOLAIXE_TAIXE(:1, :2, :3, :4); END;`,
      [dto.p_MaTX, dto.p_TuNgay, dto.p_DenNgay, ''],
    );
  }
}
