import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/loyalty')
export class LoyaltyProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('them-diem')
  themDiem(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_TICHDIEM(:1, :2, :3, :4, :5); END;`,
      [dto.p_MaKH, dto.p_MaPhieuVe, dto.p_SoDiemGD, 0, 0],
    );
  }

  @Post('tru-diem')
  truDiem(@Body() dto: { p_MaKH: string; p_SoDiem: number }) {
    return this.proc.call(`BEGIN SP_TRU_TICHDIEM(:1, :2, :3); END;`, [dto.p_MaKH, dto.p_SoDiem, 0]);
  }

  @Post('lay-diem')
  layDiem(@Body() dto: { p_MaKH: string }) {
    return this.proc.call(`BEGIN SP_LAY_TICHDIEM_MAKH(:1, :2, :3); END;`, [dto.p_MaKH, 0, '']);
  }

  @Post('cap-nhat-hang-tv')
  capNhatHangTV(@Body() dto: { p_MaKH: string }) {
    return this.proc.call(`BEGIN SP_CAPNHAT_HANG_TV(:1, :2, :3); END;`, [dto.p_MaKH, '', 0]);
  }

  @Get('danh-sach-hang-tv')
  danhSachHangTV() {
    return this.proc.call(`BEGIN SP_DS_HANGTV(:1); END;`, ['']);
  }
}
