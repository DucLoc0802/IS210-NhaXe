import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import các Module của bạn
import { LoginModule } from './modules/login/login.module'; // Đảm bảo có dòng này

// Import các Entity (Bảng) của bạn
import { User } from './modules/login/entities/user.entity'; // Đảm bảo đường dẫn này đúng

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // CẤU HÌNH KẾT NỐI DATABASE CHÍNH (DataSource)
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 1521,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      serviceName: process.env.DB_SERVICE_NAME || 'XE',

      // BƯỚC QUAN TRỌNG NHẤT LÀ Ở ĐÂY: Phải liệt kê TẤT CẢ các bảng vào mảng này
      entities: [User],

      synchronize: false, // Tự động tạo bảng
    }),

    // Khai báo các module con
    LoginModule,
  ],
})
export class AppModule { }