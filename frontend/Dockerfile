# Sử dụng môi trường Node.js
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file thư viện
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ code giao diện vào
COPY . .

# Build mã nguồn NextJS để tối ưu tốc độ chạy
RUN npm run build

# Mở cổng 3000 cho giao diện
EXPOSE 3000

# Lệnh khởi chạy NextJS ở chế độ Production
CMD ["npm", "run", "start"]