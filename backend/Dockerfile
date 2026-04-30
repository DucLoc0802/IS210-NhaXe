# Sử dụng môi trường Node.js (bản 20 Alpine siêu nhẹ)
FROM node:20-alpine

# Tạo thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Chỉ copy 2 file quản lý thư viện vào trước để tận dụng cache của Docker
COPY package*.json ./

# Cài đặt các thư viện cần thiết
RUN npm install

# Copy toàn bộ source code của bạn vào container
COPY . .

# Đóng gói (Build) mã nguồn NestJS từ TypeScript sang JavaScript
RUN npm run build

# Mở cổng 3001 để bên ngoài có thể gọi vào
EXPOSE 3001

# Lệnh cuối cùng để khởi chạy server khi Container bắt đầu
CMD ["npm", "run", "start:prod"]