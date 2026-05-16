import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/promotions')
export class PromotionProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('them')
  them(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_KHUYENMAI(:1, :2, :3, :4, :5, :6, :7, :8); END;`,
      [dto.p_TenKM, dto.p_NgayBD, dto.p_NgayKT, dto.p_LoaiKM, dto.p_DieuKien, dto.p_GiamGia, '', 0],
    );
  }

  @Post('kiem-tra')
  kiemTra(@Body() dto: { p_MaKM: string; p_TongTien: number }) {
    return this.proc.call(`BEGIN SP_KIEMTRA_KHUYENMAI(:1, :2, :3, :4); END;`, [dto.p_MaKM, dto.p_TongTien, 0, '']);
  }
}
