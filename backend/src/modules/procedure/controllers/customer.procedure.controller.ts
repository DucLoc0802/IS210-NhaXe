import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/customers')
export class CustomerProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('them')
  them(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEMKHACHHANG(:1, :2, :3, :4, :5, :6, :7, :8, :9, :10); END;`,
      [dto.p_MaTK, dto.p_MaHang, dto.p_HoTen, dto.p_NgaySinh, dto.p_GioiTinh, dto.p_SDT, dto.p_Email, dto.p_CCCD, '', 0],
    );
  }

  @Post('cap-nhat')
  capNhat(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_CAPNHAT_KHACHHANG(:1, :2, :3, :4, :5, :6, :7, :8); END;`,
      [dto.p_MaKH, dto.p_HoTen, dto.p_NgaySinh, dto.p_GioiTinh, dto.p_SDT, dto.p_Email, dto.p_CCCD, 0],
    );
  }

  @Post('tim-sdt')
  timSDT(@Body() dto: { p_SDT: string }) {
    return this.proc.call(
      `BEGIN SP_TIM_KH_SDT(:1, :2, :3, :4); END;`,
      [dto.p_SDT, '', '', 0],
    );
  }

  @Post('danh-sach')
  danhSach(@Body() dto: { p_TuNgay: string; p_DenNgay: string }) {
    return this.proc.call(
      `BEGIN SP_DS_KHACHHANG(:1, :2, :3); END;`,
      [dto.p_TuNgay, dto.p_DenNgay, ''],
    );
  }

  @Post('them-hanh-khach')
  themHanhKhach(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_THEM_HANHKHACH(:1, :2, :3, :4, :5, :6); END;`,
      [dto.p_MaHK, dto.p_MaKH, dto.p_HoTen, dto.p_NgaySinh, dto.p_SDT, 0],
    );
  }

  @Post('danh-sach-hk')
  danhSachHK(@Body() dto: { p_MaKH: string }) {
    return this.proc.call(
      `BEGIN SP_DS_HANHKHACH_MAKH(:1, :2); END;`,
      [dto.p_MaKH, ''],
    );
  }
}
