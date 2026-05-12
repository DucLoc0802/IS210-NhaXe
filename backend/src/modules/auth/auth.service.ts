import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taikhoan } from './Taikhoan';
import { Khachhang } from '../khachhang/Khachhang';
import { Nhanvien } from '../nhanvien/Nhanvien';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Taikhoan)
    private readonly taikhoanRepo: Repository<Taikhoan>,
    @InjectRepository(Khachhang)
    private readonly khachhangRepo: Repository<Khachhang>,
    @InjectRepository(Nhanvien)
    private readonly nhanvienRepo: Repository<Nhanvien>,
  ) {}

  async login(sdt: string, password: string) {
    let account: Taikhoan | null = null;
    let role = '';
    let hoten = '';

    const khachhang = await this.khachhangRepo.findOne({
      where: { sdt },
      relations: ['matk'],
    });

    if (khachhang?.matk) {
      account = khachhang.matk;
      role = 'khachhang';
      hoten = khachhang.hoten ?? '';
    } else {
      const nhanvien = await this.nhanvienRepo.findOne({
        where: { sdt },
        relations: ['matk'],
      });

      if (nhanvien?.matk) {
        account = nhanvien.matk;
        role = nhanvien.vitri ?? 'nhanvien';
        hoten = nhanvien.hoten ?? '';
      }
    }

    if (!account || account.matkhau !== password) {
      throw new UnauthorizedException('Sai thông tin đăng nhập!');
    }

    return {
      message: 'Đăng nhập thành công',
      user: {
        matk: account.matk,
        tentk: account.tentk,
        vaitro: account.vaitro,
        role,
        hoten,
      },
    };
  }
}
