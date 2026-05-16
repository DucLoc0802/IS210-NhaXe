import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/routes')
export class RouteProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('them-ben-xe')
  themBenXe(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_BENXE(:1, :2, :3, :4, :5); END;`,
      [dto.p_MaBen, dto.p_TenBen, dto.p_DiaChi, dto.p_TinhThanh, 0],
    );
  }

  @Post('danh-sach-ben-xe')
  danhSachBenXe(@Body() dto: { p_TinhThanh?: string }) {
    return this.proc.call(`BEGIN SP_DS_BENXE(:1, :2); END;`, [dto.p_TinhThanh ?? '', '']);
  }

  @Post('them-tuyen-xe')
  themTuyenXe(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_TUYENXE(:1, :2, :3, :4, :5, :6, :7, :8); END;`,
      [dto.p_MaTuyen, dto.p_MaBenDau, dto.p_MaBenCuoi, dto.p_TenTuyen, dto.p_KhoangCach, dto.p_ThoiGian, dto.p_GiaVeCB, 0],
    );
  }

  @Post('danh-sach-tuyen-xe')
  danhSachTuyenXe(@Body() dto: { p_MaBenDau?: string; p_MaBenCuoi?: string }) {
    return this.proc.call(
      `BEGIN SP_DS_TUYENXE(:1, :2, :3); END;`,
      [dto.p_MaBenDau ?? '', dto.p_MaBenCuoi ?? '', ''],
    );
  }

  @Post('tim-tuyen-xe')
  timTuyenXe(@Body() dto: { p_TenTuyen: string }) {
    return this.proc.call(`BEGIN SP_TIM_TUYENXE_TEN(:1, :2); END;`, [dto.p_TenTuyen, '']);
  }
}
