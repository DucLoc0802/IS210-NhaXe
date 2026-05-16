import { Controller, Post, Body } from '@nestjs/common';
import { ProcedureService } from '../procedure.service';

@Controller('procedures/tickets')
export class TicketProcedureController {
  constructor(private readonly proc: ProcedureService) {}

  @Post('dat-ve')
  datVe(@Body() dto: any) {
    return this.proc.call(
      `BEGIN SP_DAT_VE(:1, :2, :3, :4, :5, :6, :7, :8, :9); END;`,
      [dto.p_MaHK, dto.p_MaChuyen, dto.p_MaGhe, dto.p_MaKM, dto.p_MaKH, '', 0, 0, 0],
    );
  }

  @Post('ban-ve')
  banVe(@Body() dto: { p_MaVe: string }) {
    return this.proc.call(`BEGIN SP_BAN_VE(:1, :2); END;`, [dto.p_MaVe, 0]);
  }

  @Post('huy-ve')
  huyVe(@Body() dto: { p_MaVe: string }) {
    return this.proc.call(`BEGIN SP_HUY_VE(:1, :2); END;`, [dto.p_MaVe, 0]);
  }

  @Post('lay-ve-ma')
  layVeMa(@Body() dto: { p_MaVe: string }) {
    return this.proc.call(`BEGIN SP_LAY_VE_MA(:1, :2); END;`, [dto.p_MaVe, '']);
  }

  @Post('lay-ve-kh')
  layVeKH(@Body() dto: { p_MaKH: string }) {
    return this.proc.call(`BEGIN SP_LAY_VE_MAKH(:1, :2); END;`, [dto.p_MaKH, '']);
  }

  @Post('danh-sach-ve-chuyen')
  danhSachVeChuyen(@Body() dto: { p_MaChuyen: string }) {
    return this.proc.call(`BEGIN SP_DS_VE_CHUYEN(:1, :2); END;`, [dto.p_MaChuyen, '']);
  }

  @Post('tinh-doanh-thu-ve')
  tinhDoanhThuVe(@Body() dto: { p_MaChuyen: string }) {
    return this.proc.call(`BEGIN SP_TINH_DOANHTHU_VE(:1, :2); END;`, [dto.p_MaChuyen, 0]);
  }
}
