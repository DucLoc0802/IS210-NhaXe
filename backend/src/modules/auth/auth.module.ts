import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { Taikhoan } from './Taikhoan';
import { Khachhang } from '../khachhang/Khachhang';
import { Nhanvien } from '../nhanvien/Nhanvien';

@Module({
  imports: [
    TypeOrmModule.forFeature([Taikhoan, Khachhang, Nhanvien]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'busgo-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
