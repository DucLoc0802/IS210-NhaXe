import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taikhoan } from './Taikhoan';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Taikhoan)
    private readonly taikhoanRepo: Repository<Taikhoan>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'busgo-secret-key',
    });
  }

  async validate(payload: { sub: string; vaitro: string }) {
    const user = await this.taikhoanRepo.findOne({
      where: { matk: payload.sub },
    });
    if (!user) throw new UnauthorizedException();
    return { matk: user.matk, tentk: user.tentk, vaitro: user.vaitro };
  }
}
