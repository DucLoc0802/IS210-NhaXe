-- ======================================================================
-- SEED DATA for BusGo/IS210-NhaXe
-- ~50 records per entity, respecting FK dependency order
-- Run AFTER init.sql
-- ======================================================================

-- Clean existing dummy data (if any)
DELETE FROM giaodich;
DELETE FROM tichdiem;
DELETE FROM hanghoa;
DELETE FROM ve;
DELETE FROM phieuguihang;
DELETE FROM phieudatve;
DELETE FROM hosochuyenxe;
DELETE FROM giolaixe;
DELETE FROM taixe;
DELETE FROM hanhkhach;
DELETE FROM khachhang;
DELETE FROM nhanvien;
DELETE FROM xe;
DELETE FROM tuyenxe;
DELETE FROM khuyenmai;
DELETE FROM benxe;
DELETE FROM loaixe;
DELETE FROM hangthanhvien;
DELETE FROM taikhoan;
COMMIT;

-- ======================================================================
-- 1. TAIKHOAN (101: 1 admin + 50 nhanvien + 50 khachhang)
-- ======================================================================
BEGIN
  -- Admin
  INSERT INTO taikhoan (matk, tentk, matkhau, ngaytao, vaitro)
  VALUES ('TK001', 'admin', 'admin', SYSDATE, 'admin');

  -- Employees
  FOR i IN 1..50 LOOP
    INSERT INTO taikhoan (matk, tentk, matkhau, ngaytao, vaitro)
    VALUES (
      'TK' || LPAD(TO_CHAR(i + 1), 3, '0'),
      'nhanvien' || i,
      'pass' || i,
      SYSDATE - DBMS_RANDOM.VALUE(0, 365),
      'nhanvien'
    );
  END LOOP;

  -- Customers
  FOR i IN 1..50 LOOP
    INSERT INTO taikhoan (matk, tentk, matkhau, ngaytao, vaitro)
    VALUES (
      'TK' || LPAD(TO_CHAR(i + 51), 3, '0'),
      'khachhang' || i,
      'pass' || i,
      SYSDATE - DBMS_RANDOM.VALUE(0, 365),
      'khachhang'
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 2. HANGTHANHVIEN (5 tiers)
-- ======================================================================
INSERT ALL
  INTO hangthanhvien (mahang, tenhang, diemtoithieu, giamgia, hesotichdiem) VALUES ('HANG01', N'Đồng',   0,    0,   1.0)
  INTO hangthanhvien (mahang, tenhang, diemtoithieu, giamgia, hesotichdiem) VALUES ('HANG02', N'Bạc',    100,  5,   1.2)
  INTO hangthanhvien (mahang, tenhang, diemtoithieu, giamgia, hesotichdiem) VALUES ('HANG03', N'Vàng',   300,  10,  1.5)
  INTO hangthanhvien (mahang, tenhang, diemtoithieu, giamgia, hesotichdiem) VALUES ('HANG04', N'Bạch kim', 500, 15,  2.0)
  INTO hangthanhvien (mahang, tenhang, diemtoithieu, giamgia, hesotichdiem) VALUES ('HANG05', N'Kim cương', 1000, 20, 3.0)
SELECT * FROM dual;
COMMIT;

-- ======================================================================
-- 3. LOAIXE (8 types)
-- ======================================================================
INSERT ALL
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX01', N'Ghế ngồi 30 chỗ',    30, '1-2|1-2|1-2|1-2|1-2|...',  'Thaco',        0, NULL)
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX02', N'Ghế ngồi 45 chỗ',    45, '1-2|1-2|1-2|1-2|1-2|...',  'Thaco',        0, NULL)
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX03', N'Giường nằm 34 chỗ',  34, '1-1|1-1|1-1|1-1|1-1|...',  'Thaco',        1, NULL)
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX04', N'Giường nằm 40 chỗ',  40, '1-1|1-1|1-1|1-1|1-1|...',  'Thaco',        1, NULL)
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX05', N'Limousine 18 chỗ',   18, '1-1|1-1|1-1|...',          'Limousine',    0, NULL)
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX06', N'Limousine 22 chỗ',   22, '1-1|1-1|1-1|...',          'Limousine',    0, NULL)
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX07', N'Xe tải nhẹ 2 tấn',   3,  '1|1|1',                       'Hyundai',      2, 2000)
  INTO loaixe (maloaixe, tenloai, soluongghe, sodoghe,          hangxe,            phanloai, taitrongtoida) VALUES ('LX08', N'Xe tải 5 tấn',        3,  '1|1|1',                       'Isuzu',        2, 5000)
SELECT * FROM dual;
COMMIT;

-- ======================================================================
-- 4. BENXE (50 bus stations across Vietnam)
-- ======================================================================
INSERT ALL
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX001', N'Bến xe Miền Đông',       N'292 Đinh Bộ Lĩnh, P.26',                    N'TP Hồ Chí Minh')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX002', N'Bến xe Miền Tây',        N'395 Kinh Dương Vương',                      N'TP Hồ Chí Minh')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX003', N'Bến xe An Sương',        N'QL22, Quận 12',                             N'TP Hồ Chí Minh')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX004', N'Bến xe Ngã Tư Ga',       N'QL1A, Quận 12',                             N'TP Hồ Chí Minh')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX005', N'Bến xe Mỹ Đình',         N'Đ.Phạm Hùng, Nam Từ Liêm',                  N'Hà Nội')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX006', N'Bến xe Gia Lâm',         N'Đ.Đức Giang, Long Biên',                    N'Hà Nội')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX007', N'Bến xe Nước Ngầm',       N'QL1A, Hoàng Mai',                           N'Hà Nội')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX008', N'Bến xe Yên Nghĩa',       N'QL6, Hà Đông',                              N'Hà Nội')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX009', N'Bến xe Đà Nẵng',          N'402 Đ.Điện Biên Phủ, Thanh Khê',            N'Đà Nẵng')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX010', N'Bến xe Trung tâm Đà Nẵng', N'Đ.Tôn Đức Thắng, Sơn Trà',                 N'Đà Nẵng')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX011', N'Bến xe Phía Nam Hải Phòng', N'Đ.Đình Vũ, Ngô Quyền',                    N'Hải Phòng')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX012', N'Bến xe Cầu Rào',          N'Đ.Hạ Lý, Hồng Bàng',                        N'Hải Phòng')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX013', N'Bến xe Cần Thơ',          N'Đ.Đồng Văn Cống, Bình Thủy',                N'Cần Thơ')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX014', N'Bến xe Trung tâm Cần Thơ', N'Đ.Nguyễn Văn Cừ, Ninh Kiều',                N'Cần Thơ')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX015', N'Bến xe An Khánh',         N'Đ.Đại lộ Nguyễn Văn Linh, Bình Thủy',       N'Cần Thơ')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX016', N'Bến xe Biên Hòa',          N'Xa lộ Hà Nội, P.Trảng Dài',                  N'Đồng Nai')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX017', N'Bến xe Long Khánh',        N'Đ.QL1A, TP.Long Khánh',                      N'Đồng Nai')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX018', N'Bến xe Vũng Tàu',          N'Đ.Nam Kỳ Khởi Nghĩa',                        N'Bà Rịa - Vũng Tàu')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX019', N'Bến xe Bến Tre',           N'Đ.Đại lộ Đồng Khởi',                         N'Bến Tre')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX020', N'Bến xe Mỹ Tho',            N'Đ.Trương Văn Sáu',                           N'Tiền Giang')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX021', N'Bến xe Long Xuyên',        N'Đ.Hùng Vương, TP.Long Xuyên',                N'An Giang')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX022', N'Bến xe Châu Đốc',          N'Đ.Lê Lợi, TP.Châu Đốc',                      N'An Giang')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX023', N'Bến xe Rạch Giá',          N'Đ.Nguyễn Trung Trực',                        N'Kiên Giang')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX024', N'Bến xe Phú Quốc',          N'Đ.30/4, Dương Đông',                         N'Kiên Giang')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX025', N'Bến xe Nha Trang',         N'Đ.Quốc lộ 1A, Nha Trang',                    N'Khánh Hòa')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX026', N'Bến xe Phía Bắc Nha Trang', N'Đ.23/10, Nha Trang',                        N'Khánh Hòa')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX027', N'Bến xe Đà Lạt',            N'Đ.Trần Phú, P.3',                            N'Lâm Đồng')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX028', N'Bến xe Liên tỉnh Đà Lạt',  N'Đ.3/4, P.3',                                 N'Lâm Đồng')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX029', N'Bến xe Phan Thiết',        N'Đ.Quốc lộ 1A, TP.Phan Thiết',                N'Bình Thuận')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX030', N'Bến xe Mũi Né',            N'Đ.Nguyễn Đình Chiểu, Mũi Né',                N'Bình Thuận')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX031', N'Bến xe Huế',               N'Đ.An Vương, TP.Huế',                         N'Thừa Thiên Huế')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX032', N'Bến xe Phía Nam Huế',      N'Đ.QL1A, Hương Thủy',                         N'Thừa Thiên Huế')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX033', N'Bến xe Vinh',              N'Đ.QL1A, TP.Vinh',                            N'Nghệ An')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX034', N'Bến xe Phía Tây Vinh',     N'Đ.Nguyễn Văn Trỗi, TP.Vinh',                 N'Nghệ An')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX035', N'Bến xe Hạ Long',           N'Đ.QL18, TP.Hạ Long',                         N'Quảng Ninh')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX036', N'Bến xe Cẩm Phả',           N'Đ.Quang Trung, Cẩm Phả',                     N'Quảng Ninh')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX037', N'Bến xe Thanh Hóa',          N'Đ.QL1A, TP.Thanh Hóa',                       N'Thanh Hóa')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX038', N'Bến xe Sầm Sơn',            N'Đ.Lê Lợi, Sầm Sơn',                          N'Thanh Hóa')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX039', N'Bến xe Nam Định',           N'Đ.Trần Hưng Đạo, TP.Nam Định',               N'Nam Định')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX040', N'Bến xe Thái Bình',          N'Đ.Lý Thường Kiệt, TP.Thái Bình',             N'Thái Bình')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX041', N'Bến xe Hải Dương',          N'Đ.Trần Phú, TP.Hải Dương',                   N'Hải Dương')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX042', N'Bến xe Bắc Ninh',           N'Đ.QL1A, TP.Bắc Ninh',                        N'Bắc Ninh')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX043', N'Bến xe Bắc Giang',          N'Đ.Lê Lợi, TP.Bắc Giang',                     N'Bắc Giang')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX044', N'Bến xe Thái Nguyên',        N'Đ.QL3, TP.Thái Nguyên',                      N'Thái Nguyên')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX045', N'Bến xe Phú Thọ',            N'Đ.Hùng Vương, TP.Việt Trì',                  N'Phú Thọ')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX046', N'Bến xe Hòa Bình',           N'Đ.QL6, TP.Hòa Bình',                         N'Hòa Bình')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX047', N'Bến xe Tây Nguyên',         N'Đ.Phan Đình Giót, TP.Buôn Ma Thuột',         N'Đắk Lắk')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX048', N'Bến xe Pleiku',             N'Đ.Trần Hưng Đạo, TP.Pleiku',                 N'Gia Lai')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX049', N'Bến xe Quy Nhơn',           N'Đ.QL1D, TP.Quy Nhơn',                        N'Bình Định')
  INTO benxe (maben, tenben, diachi, tinhthanh) VALUES ('BX050', N'Bến xe Phú Yên',            N'Đ.QL1A, TP.Tuy Hòa',                         N'Phú Yên')
SELECT * FROM dual;
COMMIT;

-- ======================================================================
-- 5. KHUYENMAI (50 promotions)
-- ======================================================================
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO khuyenmai (makm, tenkm, ngaybd, ngaykt, loaikm, dieukien, giamgia, tinhtrang)
    VALUES (
      'KM' || LPAD(TO_CHAR(i), 3, '0'),
      N'Khuyến mãi ' || i || CASE MOD(i, 3)
        WHEN 0 THEN N' - Giảm %'
        WHEN 1 THEN N' - Số tiền cố định'
        ELSE N' - Giảm theo hóa đơn'
      END,
      SYSDATE - DBMS_RANDOM.VALUE(0, 90),
      SYSDATE + DBMS_RANDOM.VALUE(1, 180),
      CASE WHEN MOD(i, 2) = 0 THEN 0 ELSE 1 END,
      CASE WHEN MOD(i, 2) = 0 THEN 0 ELSE ROUND(DBMS_RANDOM.VALUE(100000, 500000)) END,
      ROUND(DBMS_RANDOM.VALUE(10000, 200000), -3),
      CASE WHEN MOD(i, 5) = 0 THEN 0 ELSE 1 END
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 6. NHANVIEN (50 employees → TK002-TK051)
-- ======================================================================
DECLARE
  TYPE arr_names IS VARRAY(10) OF NVARCHAR2(20);
  ho   arr_names := arr_names(N'Nguyễn', N'Trần', N'Lê', N'Phạm', N'Hoàng', N'Huỳnh', N'Phan', N'Vũ', N'Đặng', N'Bùi');
  dem  arr_names := arr_names(N'Văn', N'Thị', N'Hữu', N'Công', N'Minh', N'Thanh', N'Quốc', N'Đức', N'Ngọc', N'Xuân');
  ten  arr_names := arr_names(N'Nam', N'Hùng', N'Dũng', N'Tuấn', N'Long', N'Hải', N'Minh', N'Quân', N'Huy', N'Tùng');
  vt   arr_names := arr_names(N'Nhân viên bán vé', N'Nhân viên điều độ', N'Nhân viên quản lý', N'Nhân viên lái xe');
  hoten_full  NVARCHAR2(100);
  sdt_str     VARCHAR2(15);
  email_str   VARCHAR2(100);
  cccd_str    VARCHAR2(20);
BEGIN
  FOR i IN 1..50 LOOP
    hoten_full := ho(TRUNC(DBMS_RANDOM.VALUE(1, 11))) || ' '
               || dem(TRUNC(DBMS_RANDOM.VALUE(1, 11))) || ' '
               || ten(TRUNC(DBMS_RANDOM.VALUE(1, 11)));
    sdt_str  := '09' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 99999999))), 8, '0');
    email_str := 'nhanvien' || i || '@busgo.com';
    cccd_str := LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 999999999999))), 12, '0');

    INSERT INTO nhanvien (manv, matk, hoten, ngaysinh, gioitinh, sdt, email, cccd, vitri, ngayvaolam, luongcb, trangthai)
    VALUES (
      'NV' || LPAD(TO_CHAR(i), 3, '0'),
      'TK' || LPAD(TO_CHAR(i + 1), 3, '0'),
      hoten_full,
      SYSDATE - DBMS_RANDOM.VALUE(7300, 18250),
      CASE WHEN MOD(i, 3) = 0 THEN N'Nữ' ELSE N'Nam' END,
      sdt_str,
      email_str,
      cccd_str,
      vt(TRUNC(DBMS_RANDOM.VALUE(1, 5))),
      SYSDATE - DBMS_RANDOM.VALUE(30, 1095),
      ROUND(DBMS_RANDOM.VALUE(5000000, 15000000), -5),
      1
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 7. TAIXE (20 drivers → subset of NHANVIEN)
-- ======================================================================
BEGIN
  FOR i IN 1..20 LOOP
    INSERT INTO taixe (matx, magplx, ngayhethangplx, hanggplx)
    VALUES (
      'NV' || LPAD(TO_CHAR(i), 3, '0'),
      'GPLX-' || LPAD(TO_CHAR(i), 5, '0'),
      SYSDATE + DBMS_RANDOM.VALUE(30, 1095),
      CASE TRUNC(DBMS_RANDOM.VALUE(1, 5))
        WHEN 1 THEN 'B1' WHEN 2 THEN 'B2' WHEN 3 THEN 'C' WHEN 4 THEN 'D' ELSE 'E'
      END
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 8. KHACHHANG (50 customers → TK052-TK101)
-- ======================================================================
DECLARE
  TYPE arr_names IS VARRAY(10) OF NVARCHAR2(20);
  ho   arr_names := arr_names(N'Nguyễn', N'Trần', N'Lê', N'Phạm', N'Hoàng', N'Huỳnh', N'Phan', N'Vũ', N'Đặng', N'Bùi');
  ten  arr_names := arr_names(N'Anh', N'Linh', N'Hà', N'Mai', N'Lan', N'Hương', N'Thảo', N'Trang', N'Nhung', N'Yến');
  hoten_full  NVARCHAR2(100);
  sdt_str     VARCHAR2(15);
  email_str   VARCHAR2(100);
  cccd_str    VARCHAR2(20);
BEGIN
  FOR i IN 1..50 LOOP
    hoten_full := ho(TRUNC(DBMS_RANDOM.VALUE(1, 11))) || ' Thị '
               || ten(TRUNC(DBMS_RANDOM.VALUE(1, 11)));
    IF MOD(i, 3) != 0 THEN
      hoten_full := REPLACE(hoten_full, N' Thị ', N' Văn ');
    END IF;
    sdt_str  := '09' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 99999999))), 8, '0');
    email_str := 'khach' || i || '@gmail.com';
    cccd_str := LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 999999999999))), 12, '0');

    INSERT INTO khachhang (makh, matk, mahang, hoten, ngaysinh, gioitinh, sdt, email, cccd, diemtichluy)
    VALUES (
      'KH' || LPAD(TO_CHAR(i), 3, '0'),
      'TK' || LPAD(TO_CHAR(i + 51), 3, '0'),
      'HANG' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 6))), 2, '0'),
      hoten_full,
      SYSDATE - DBMS_RANDOM.VALUE(7300, 21900),
      CASE WHEN MOD(i, 3) = 0 THEN N'Nữ' ELSE N'Nam' END,
      sdt_str,
      email_str,
      cccd_str,
      TRUNC(DBMS_RANDOM.VALUE(0, 2000))
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 9. TUYENXE (50 routes between BENXE stations)
-- ======================================================================
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO tuyenxe (matuyen, mabendau, mabencuoi, tentuyen, khoangcach, thoigian, giavecb)
    VALUES (
      'TX' || LPAD(TO_CHAR(i), 3, '0'),
      'BX' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      'BX' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      N'Tuyến ' || i,
      ROUND(DBMS_RANDOM.VALUE(50, 2000), 1),
      TRUNC(DBMS_RANDOM.VALUE(60, 1440)),
      ROUND(DBMS_RANDOM.VALUE(50000, 500000), -4)
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 10. XE (50 vehicles)
-- ======================================================================
DECLARE
  bs VARCHAR2(20);
BEGIN
  FOR i IN 1..50 LOOP
    bs := CASE TRUNC(DBMS_RANDOM.VALUE(1, 64))
      WHEN 1 THEN '29' WHEN 2 THEN '30' WHEN 3 THEN '31' WHEN 4 THEN '41'
      WHEN 5 THEN '43' WHEN 6 THEN '49' WHEN 7 THEN '50' WHEN 8 THEN '51'
      WHEN 9 THEN '52' WHEN 10 THEN '53' WHEN 11 THEN '59' WHEN 12 THEN '60'
      WHEN 13 THEN '61' WHEN 14 THEN '62' WHEN 15 THEN '63' WHEN 16 THEN '67'
      WHEN 17 THEN '68' WHEN 18 THEN '69' WHEN 19 THEN '70' WHEN 20 THEN '71'
      WHEN 21 THEN '72' WHEN 22 THEN '73' WHEN 23 THEN '74' WHEN 24 THEN '75'
      WHEN 25 THEN '76' WHEN 26 THEN '77' WHEN 27 THEN '78' WHEN 28 THEN '79'
      WHEN 29 THEN '80' WHEN 30 THEN '81' WHEN 31 THEN '82' WHEN 32 THEN '83'
      WHEN 33 THEN '84' WHEN 34 THEN '85' WHEN 35 THEN '86' WHEN 36 THEN '88'
      WHEN 37 THEN '89' WHEN 38 THEN '90' WHEN 39 THEN '92' WHEN 40 THEN '93'
      WHEN 41 THEN '94' WHEN 42 THEN '95' WHEN 43 THEN '96' WHEN 44 THEN '97'
      WHEN 45 THEN '98' WHEN 46 THEN '99' WHEN 47 THEN '15' WHEN 48 THEN '17'
      WHEN 49 THEN '18' WHEN 50 THEN '19' WHEN 51 THEN '20' WHEN 52 THEN '21'
      WHEN 53 THEN '22' WHEN 54 THEN '23' WHEN 55 THEN '24' WHEN 56 THEN '25'
      WHEN 57 THEN '26' WHEN 58 THEN '27' WHEN 59 THEN '33' WHEN 60 THEN '34'
      WHEN 61 THEN '35' WHEN 62 THEN '36' WHEN 63 THEN '37' ELSE '38'
    END || 'B-' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 99999))), 5, '0');

    INSERT INTO xe (maxe, maloaixe, biensoxe, handangkiem, trangthai)
    VALUES (
      'XE' || LPAD(TO_CHAR(i), 3, '0'),
      'LX' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 9))), 2, '0'),
      bs,
      SYSDATE + DBMS_RANDOM.VALUE(-180, 365),
      TRUNC(DBMS_RANDOM.VALUE(0, 3))
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 11. HANHKHACH (50 passengers → belongs to KHACHHANG)
-- ======================================================================
DECLARE
  TYPE arr_names IS VARRAY(10) OF NVARCHAR2(20);
  ho  arr_names := arr_names(N'Nguyễn', N'Trần', N'Lê', N'Phạm', N'Hoàng', N'Huỳnh', N'Phan', N'Vũ', N'Đặng', N'Bùi');
  ten arr_names := arr_names(N'Anh', N'Bình', N'Chi', N'Duy', N'Hiếu', N'Khôi', N'Lâm', N'My', N'Phúc', N'Quỳnh');
  hoten_full NVARCHAR2(100);
BEGIN
  FOR i IN 1..50 LOOP
    hoten_full := ho(TRUNC(DBMS_RANDOM.VALUE(1, 11))) || ' '
               || ten(TRUNC(DBMS_RANDOM.VALUE(1, 11)));

    INSERT INTO hanhkhach (mahk, makh, hoten, ngaysinh, sdt)
    VALUES (
      'HK' || LPAD(TO_CHAR(i), 4, '0'),
      'KH' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      hoten_full,
      SYSDATE - DBMS_RANDOM.VALUE(7300, 25550),
      '09' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 99999999))), 8, '0')
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 12. GIOLAIXE (~150 driving hour logs)
-- ======================================================================
DECLARE
  ngay DATE;
  tonggio NUMBER(4,2);
BEGIN
  FOR i IN 1..20 LOOP
    FOR j IN 1..TRUNC(DBMS_RANDOM.VALUE(5, 10)) LOOP
      ngay := SYSDATE - DBMS_RANDOM.VALUE(1, 60);
      tonggio := ROUND(DBMS_RANDOM.VALUE(2, 12), 1);
      BEGIN
        INSERT INTO giolaixe (matx, ngaylai, tonggiolai)
        VALUES ('NV' || LPAD(TO_CHAR(i), 3, '0'), ngay, tonggio);
      EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL;
      END;
    END LOOP;
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 13. HOSOCHUYENXE (50 trips)
-- ======================================================================
DECLARE
  tgkh DATE;
  tgden DATE;
BEGIN
  FOR i IN 1..50 LOOP
    tgkh := SYSDATE + DBMS_RANDOM.VALUE(0, 30);
    tgden := tgkh + (DBMS_RANDOM.VALUE(60, 1440) / 1440);

    INSERT INTO hosochuyenxe (machuyen, matuyen, maxe, matx1, matx2, tgkhoihanh, tgden, trangthai, ghichu, loaichuyen, giavethucte)
    VALUES (
      'CX' || LPAD(TO_CHAR(i), 4, '0'),
      'TX' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      'XE' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      'NV' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 21))), 3, '0'),
      CASE WHEN TRUNC(DBMS_RANDOM.VALUE(1, 3)) = 1 THEN NULL
           ELSE 'NV' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 21))), 3, '0') END,
      tgkh,
      tgden,
      TRUNC(DBMS_RANDOM.VALUE(0, 3)),
      CASE WHEN MOD(i, 5) = 0 THEN N'Lưu ý: xe đời mới' ELSE NULL END,
      CASE WHEN MOD(i, 2) = 0 THEN 0 ELSE 1 END,
      ROUND(DBMS_RANDOM.VALUE(50000, 500000), -4)
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 14. PHIEUDATVE (50 booking tickets)
-- ======================================================================
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO phieudatve (maphieuve, makh, makm, ngaydat, thanhtien, trangthai, ngaycapnhat)
    VALUES (
      'PDV' || LPAD(TO_CHAR(i), 4, '0'),
      'KH' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      CASE WHEN MOD(i, 4) = 0 THEN 'KM' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0') ELSE NULL END,
      SYSTIMESTAMP - DBMS_RANDOM.VALUE(0, 30),
      ROUND(DBMS_RANDOM.VALUE(50000, 1000000), -4),
      TRUNC(DBMS_RANDOM.VALUE(0, 3)),
      SYSTIMESTAMP - DBMS_RANDOM.VALUE(0, 30)
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 15. PHIEUGUIHANG (50 cargo receipts)
-- ======================================================================
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO phieuguihang (maphieuhang, makh, tennguoinhan, sdtnguoinhan, diachinhan, diachigui, thanhtien, ngaygui, trangthai, ngaycapnhat)
    VALUES (
      'PGH' || LPAD(TO_CHAR(i), 4, '0'),
      'KH' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      N'Người nhận ' || i,
      '09' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(0, 99999999))), 8, '0'),
      N'Địa chỉ nhận ' || i,
      N'Địa chỉ gửi ' || i,
      ROUND(DBMS_RANDOM.VALUE(20000, 500000), -3),
      SYSTIMESTAMP - DBMS_RANDOM.VALUE(0, 30),
      TRUNC(DBMS_RANDOM.VALUE(0, 4)),
      SYSTIMESTAMP - DBMS_RANDOM.VALUE(0, 30)
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 16. VE (50 tickets)
-- ======================================================================
DECLARE
  maghe_str VARCHAR2(10);
  dup_count NUMBER;
BEGIN
  FOR i IN 1..50 LOOP
    maghe_str := CHR(64 + TRUNC(DBMS_RANDOM.VALUE(1, 6)))
              || '-' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 50))), 2, '0');

    BEGIN
      INSERT INTO ve (mave, mahk, machuyen, maphieuve, maghe, phuthu, giave, trangthai)
      VALUES (
        'V' || LPAD(TO_CHAR(i), 5, '0'),
        'HK' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0'),
        'CX' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0'),
        'PDV' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0'),
        maghe_str,
        CASE WHEN MOD(i, 5) = 0 THEN ROUND(DBMS_RANDOM.VALUE(10000, 50000), -3) ELSE 0 END,
        ROUND(DBMS_RANDOM.VALUE(50000, 350000), -4),
        TRUNC(DBMS_RANDOM.VALUE(0, 3))
      );
    EXCEPTION WHEN DUP_VAL_ON_INDEX THEN NULL;
    END;
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 17. HANGHOA (50 cargo items)
-- ======================================================================
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO hanghoa (mahh, machuyen, maphieuhang, loaihh, giacuoc, khoiluong)
    VALUES (
      'HH' || LPAD(TO_CHAR(i), 4, '0'),
      'CX' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0'),
      'PGH' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0'),
      TRUNC(DBMS_RANDOM.VALUE(0, 3)),
      ROUND(DBMS_RANDOM.VALUE(20000, 200000), -3),
      ROUND(DBMS_RANDOM.VALUE(1, 50), 1)
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 18. TICHDIEM (50 loyalty point records)
-- ======================================================================
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO tichdiem (matichdiem, makh, maphieuve, maphieuhang, sodiemgd, ngaygd, ghichu)
    VALUES (
      'TD' || LPAD(TO_CHAR(i), 5, '0'),
      'KH' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 3, '0'),
      CASE WHEN MOD(i, 3) != 0 THEN 'PDV' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0') ELSE NULL END,
      CASE WHEN MOD(i, 3) = 0 THEN 'PGH' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0') ELSE NULL END,
      TRUNC(DBMS_RANDOM.VALUE(10, 500)),
      SYSTIMESTAMP - DBMS_RANDOM.VALUE(0, 60),
      N'Tích điểm từ giao dịch'
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- 19. GIAODICH (50 transactions)
-- ======================================================================
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO giaodich (magd, maphieuve, maphieuhang, thoigiangd, phuongthuc, sotien, trangthai)
    VALUES (
      'GD' || LPAD(TO_CHAR(i), 5, '0'),
      CASE WHEN MOD(i, 4) != 0 THEN 'PDV' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0') ELSE NULL END,
      CASE WHEN MOD(i, 4) = 0 THEN 'PGH' || LPAD(TO_CHAR(TRUNC(DBMS_RANDOM.VALUE(1, 51))), 4, '0') ELSE NULL END,
      SYSTIMESTAMP - DBMS_RANDOM.VALUE(0, 60),
      TRUNC(DBMS_RANDOM.VALUE(0, 3)),
      ROUND(DBMS_RANDOM.VALUE(50000, 1000000), -4),
      TRUNC(DBMS_RANDOM.VALUE(0, 2))
    );
  END LOOP;
  COMMIT;
END;
/

-- ======================================================================
-- Done
-- ======================================================================
COMMIT;
