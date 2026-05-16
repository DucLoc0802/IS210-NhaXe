import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ProcedureModule } from './modules/procedure/procedure.module';
import { AuthModule } from './modules/auth/auth.module';
import { Taikhoan } from './modules/auth/Taikhoan';
import { Hangthanhvien } from './modules/khachhang/Hangthanhvien';
import { Loaixe } from './modules/xe/Loaixe';
import { Benxe } from './modules/xe/Benxe';
import { Khuyenmai } from './modules/giaodich/Khuyenmai';
import { Tuyenxe } from './modules/chuyenxe/Tuyenxe';
import { Xe } from './modules/xe/Xe';
import { Nhanvien } from './modules/nhanvien/Nhanvien';
import { Taixe } from './modules/nhanvien/Taixe';
import { Giolaixe } from './modules/nhanvien/Giolaixe';
import { Khachhang } from './modules/khachhang/Khachhang';
import { Hanhkhach } from './modules/khachhang/Hanhkhach';
import { Phieudatve } from './modules/ve/Phieudatve';
import { Phieuguihang } from './modules/hanghoa/Phieuguihang';
import { Hosochuyenxe } from './modules/chuyenxe/Hosochuyenxe';
import { Ve } from './modules/ve/Ve';
import { Hanghoa } from './modules/hanghoa/Hanghoa';
import { Giaodich } from './modules/giaodich/Giaodich';
import { Tichdiem } from './modules/khachhang/Tichdiem';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 1521,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      serviceName: process.env.DB_SERVICE_NAME || 'XE',
      entities: [
        Taikhoan, Hangthanhvien, Loaixe, Benxe, Khuyenmai,
        Tuyenxe, Xe, Nhanvien, Taixe, Giolaixe,
        Khachhang, Hanhkhach, Phieudatve, Phieuguihang, Hosochuyenxe,
        Ve, Hanghoa, Giaodich, Tichdiem,
      ],
      synchronize: false,
    }),
    ProcedureModule,
    AuthModule,
  ],
})
export class AppModule { }