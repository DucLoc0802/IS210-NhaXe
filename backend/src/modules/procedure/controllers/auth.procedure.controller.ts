import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/auth')
export class AuthProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('dang-nhap')
  dangNhap(@Body() dto: { p_TenTK: string; p_MatKhau: string }) {
    return this.proc.call(
      `BEGIN SP_DANGNHAP(:1, :2, :3, :4, :5); END;`,
      [dto.p_TenTK, dto.p_MatKhau, '', '', 0],
    );
  }

  @Post('doi-mat-khau')
  doiMatKhau(@Body() dto: { p_MaTK: string; p_MatKhauCu: string; p_MatKhauMoi: string }) {
    return this.proc.call(
      `BEGIN SP_DOIMATKHAU(:1, :2, :3, :4); END;`,
      [dto.p_MaTK, dto.p_MatKhauCu, dto.p_MatKhauMoi, 0],
    );
  }

  @Post('tao-tai-khoan')
  taoTaiKhoan(@Body() dto: { p_TenTK: string; p_MatKhau: string; p_VaiTro: string }) {
    return this.proc.call(
      `BEGIN SP_TAOTAIKHOAN(:1, :2, :3, :4, :5); END;`,
      [dto.p_TenTK, dto.p_MatKhau, dto.p_VaiTro, '', 0],
    );
  }

  @Post('thong-tin-tk')
  thongTinTK(@Body() dto: { p_MaTK: string }) {
    return this.proc.call(
      `BEGIN SP_LAYTHONGTIN_TK(:1, :2); END;`,
      [dto.p_MaTK, ''],
    );
  }
}
