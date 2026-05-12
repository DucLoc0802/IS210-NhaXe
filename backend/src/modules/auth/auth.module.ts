import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Taikhoan } from './Taikhoan';
import { Khachhang } from '../khachhang/Khachhang';
import { Nhanvien } from '../nhanvien/Nhanvien';

@Module({
  imports: [TypeOrmModule.forFeature([Taikhoan, Khachhang, Nhanvien])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
