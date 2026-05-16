import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/transactions')
export class TransactionProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('tao')
  tao(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_TAO_GIAODICH(:1, :2, :3, :4, :5, :6); END;`,
      [dto.p_MaPhieuVe, dto.p_MaPhieuHang, dto.p_PhuongThuc, dto.p_SoTien, '', 0],
    );
  }

  @Post('cap-nhat')
  capNhat(@Body() dto: { p_MaGD: string; p_TrangThai: number }) {
    return this.proc.call(`BEGIN SP_CAPNHAT_GIAODICH(:1, :2, :3); END;`, [dto.p_MaGD, dto.p_TrangThai, 0]);
  }

  @Post('danh-sach-kh')
  danhSachKH(@Body() dto: { p_MaKH: string }) {
    return this.proc.call(`BEGIN SP_LAY_GIAODICH_MAKH(:1, :2); END;`, [dto.p_MaKH, '']);
  }
}
