import { Controller, Post, Body, Delete } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/trips')
export class TripProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('tao')
  tao(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_TAO_CHUYENXE(:1, :2, :3, :4, :5, :6, :7, :8); END;`,
      [dto.p_MaChuyen, dto.p_MaXe, dto.p_MaTX1, dto.p_MaTX2, dto.p_MaTuyen, dto.p_TGKhoiHanh, dto.p_TGDen, 0],
    );
  }

  @Post('cap-nhat')
  capNhat(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_CAPNHAT_CHUYENXE(:1, :2, :3, :4); END;`,
      [dto.p_MaChuyen, dto.p_TrangThai, dto.p_GhiChu, 0],
    );
  }

  @Delete('xoa')
  xoa(@Body() dto: { p_MaChuyen: string }) {
    return this.proc.call(`BEGIN SP_XOA_CHUYENXE(:1, :2); END;`, [dto.p_MaChuyen, 0]);
  }

  @Post('thong-tin')
  thongTin(@Body() dto: { p_MaChuyen: string }) {
    return this.proc.call(`BEGIN SP_LAYTHONGTIN_CHUYEN(:1, :2); END;`, [dto.p_MaChuyen, '']);
  }

  @Post('danh-sach-theo-ngay')
  danhSachTheoNgay(@Body() dto: { p_MaTuyen: string; p_Ngay: string }) {
    return this.proc.call(`BEGIN SP_DS_CHUYEN_NGAY(:1, :2, :3); END;`, [dto.p_MaTuyen, dto.p_Ngay, '']);
  }

  @Post('tim-chuyen-trong')
  timChuyenTrong(@Body() dto: { p_MaTuyen: string; p_TGKhoiHanh: string }) {
    return this.proc.call(`BEGIN SP_TIM_CHUYEN_TRONG(:1, :2, :3); END;`, [dto.p_MaTuyen, dto.p_TGKhoiHanh, '']);
  }

  @Post('kiem-tra-ghe-trong')
  kiemTraGheTrong(@Body() dto: { p_MaChuyen: string }) {
    return this.proc.call(`BEGIN SP_KIEMTRA_GHE_TRONG(:1, :2, :3); END;`, [dto.p_MaChuyen, 0, 0]);
  }

  @Post('danh-sach-ghe-trong')
  danhSachGheTrong(@Body() dto: { p_MaChuyen: string }) {
    return this.proc.call(`BEGIN SP_DS_GHE_TRONG(:1, :2); END;`, [dto.p_MaChuyen, '']);
  }
}
