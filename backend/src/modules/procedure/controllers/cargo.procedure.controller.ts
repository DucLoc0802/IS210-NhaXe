import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/cargo')
export class CargoProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('gui-hang')
  guiHang(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_GUI_HANG(:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11); END;`,
      [dto.p_MaChuyen, dto.p_LoaiHH, dto.p_KhoiLuong, dto.p_MaKH, dto.p_TenNguoiNhan, dto.p_SDTNguoiNhan, dto.p_DiaChiNhan, dto.p_DiaChiGui, '', 0, 0],
    );
  }

  @Post('lay-phieu-hang')
  layPhieuHang(@Body() dto: { p_MaPhieuHang: string }) {
    return this.proc.call(`BEGIN SP_LAY_PHIEUHANG_MA(:1, :2); END;`, [dto.p_MaPhieuHang, '']);
  }

  @Post('danh-sach-hang-hoa')
  danhSachHangHoa(@Body() dto: { p_MaChuyen: string }) {
    return this.proc.call(`BEGIN SP_DS_HANGHOA_CHUYEN(:1, :2); END;`, [dto.p_MaChuyen, '']);
  }
}
