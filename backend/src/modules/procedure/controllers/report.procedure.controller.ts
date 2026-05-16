import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/reports')
export class ReportProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('doanh-thu-ngay')
  doanhThuNgay(@Body() dto: { p_Ngay: string }) {
    return this.proc.call(`BEGIN SP_TONGDOANHTHU_NGAY(:1, :2); END;`, [dto.p_Ngay, 0]);
  }

  @Post('bao-cao-doanh-thu-thang')
  baoCaoDoanhThuThang(@Body() dto: { p_Thang: number; p_Nam: number }) {
    return this.proc.call(`BEGIN SP_BAOCAO_DOANHTHU_THANG(:1, :2, :3); END;`, [dto.p_Thang, dto.p_Nam, '']);
  }

  @Post('bao-cao-ve-ban')
  baoCaoVeBan(@Body() dto: { p_TuNgay: string; p_DenNgay: string }) {
    return this.proc.call(`BEGIN SP_BAOCAO_VE_BAN(:1, :2, :3); END;`, [dto.p_TuNgay, dto.p_DenNgay, '']);
  }
}
