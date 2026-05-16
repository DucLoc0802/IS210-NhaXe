-- 1. Bảng TAIKHOAN
create table taikhoan (
   matk    varchar2(20)
      constraint pk_taikhoan primary key,
   tentk   varchar2(50) not null,
   matkhau varchar2(50) not null,
   ngaytao date default sysdate not null,
   vaitro  varchar2(20) not null,
   constraint chk_tk_vaitro
      check ( vaitro in ( 'admin',
                          'nhanvien',
                          'khachhang' ) )
);

-- 2. Bảng HANGTHANHVIEN
create table hangthanhvien (
   mahang       varchar2(20)
      constraint pk_hangthanhvien primary key,
   tenhang      nvarchar2(50) not null,
   diemtoithieu number default 0 not null,
   giamgia      number(5,2) default 0 not null,
   hesotichdiem number(5,2) default 1 not null,
   constraint chk_htv_diem check ( diemtoithieu >= 0 )
);

-- 3. Bảng LOAIXE
create table loaixe (
   maloaixe      varchar2(20)
      constraint pk_loaixe primary key,
   tenloai       nvarchar2(50) not null,
   soluongghe    number not null,
   sodoghe       varchar2(500),
   hangxe        varchar2(50),
   phanloai      number(1) not null,
   taitrongtoida number(10,2),
   constraint chk_loaixe_soghe check ( soluongghe > 0 ),
   constraint chk_loaixe_phanloai
      check ( phanloai in ( 0, 1, 2 ) )
);

-- 4. Bảng BENXE
create table benxe (
   maben     varchar2(20)
      constraint pk_benxe primary key,
   tenben    nvarchar2(100) not null,
   diachi    varchar2(200) not null,
   tinhthanh varchar2(50) not null
);

-- 5. Bảng KHUYENMAI
create table khuyenmai (
   makm      varchar2(20)
      constraint pk_khuyenmai primary key,
   tenkm     nvarchar2(100) not null,
   ngaybd    date not null,
   ngaykt    date not null,
   loaikm    number(1) not null,
   dieukien  number(15,2) default 0,
   giamgia   number(10,2) not null,
   tinhtrang number(1) not null,
   constraint chk_km_ngay check ( ngaykt > ngaybd ),
   constraint chk_km_loai check ( loaikm in ( 0, 1 ) ),
   constraint chk_km_tinhtrang check ( tinhtrang in ( 0, 1 ) )
);

-- 6. Bảng TUYENXE
create table tuyenxe (
   matuyen    varchar2(20)
      constraint pk_tuyenxe primary key,
   mabendau   varchar2(20) not null
      constraint fk_tuyenxe_bendau
         references benxe ( maben ),
   mabencuoi  varchar2(20) not null
      constraint fk_tuyenxe_bencuoi
         references benxe ( maben ),
   tentuyen   nvarchar2(100) not null,
   khoangcach number(10,2) not null,
   thoigian   number not null,
   giavecb    number(15,2) not null,
   constraint chk_tuyenxe_dinhmuc check ( khoangcach > 0 and giavecb > 0 )
);

-- 7. Bảng XE
create table xe (
   maxe        varchar2(20)
      constraint pk_xe primary key,
   maloaixe    varchar2(20) not null
      constraint fk_xe_loaixe
         references loaixe ( maloaixe ),
   biensoxe    varchar2(20) not null,
   handangkiem date not null,
   trangthai   number(1) not null,
   constraint chk_xe_trangthai
      check ( trangthai in ( 0, 1, 2 ) ),
   constraint unq_xe_bienso unique ( biensoxe )
);

-- 8. Bảng NHANVIEN
create table nhanvien (
   manv       varchar2(20)
      constraint pk_nhanvien primary key,
   matk       varchar2(20)
      constraint fk_nv_taikhoan
         references taikhoan ( matk ),
   hoten      nvarchar2(100) not null,
   ngaysinh   date,
   gioitinh   varchar2(10),
   sdt        varchar2(15) not null,
   email      varchar2(100),
   cccd       varchar2(20) not null,
   vitri      varchar2(50) not null,
   ngayvaolam date not null,
   luongcb    number(15,2) not null,
   trangthai  number(1) not null,
   constraint chk_nv_trangthai check ( trangthai in ( 0, 1 ) ),
   constraint unq_nv_sdt unique ( sdt ),
   constraint unq_nv_email unique ( email ),
   constraint unq_nv_cccd unique ( cccd )
);

-- 9. Bảng TAIXE
create table taixe (
   matx           varchar2(20)
      constraint pk_taixe primary key,
   magplx         varchar2(50) not null,
   ngayhethangplx date not null,
   hanggplx       varchar2(20) not null,
   constraint fk_taixe_nhanvien foreign key ( matx )
      references nhanvien ( manv )
);

-- 10. Bảng GIOLAIXE
create table giolaixe (
   matx       varchar2(20),
   ngaylai    date,
   tonggiolai number(4,2) not null,
   constraint pk_giolaixe primary key ( matx, ngaylai ),
   constraint fk_giolaixe_taixe foreign key ( matx )
      references taixe ( matx )
);

-- 11. Bảng KHACHHANG
create table khachhang (
   makh        varchar2(20)
      constraint pk_khachhang primary key,
   matk        varchar2(20)
      constraint fk_kh_taikhoan
         references taikhoan ( matk ),
   mahang      varchar2(20)
      constraint fk_kh_hang
         references hangthanhvien ( mahang ),
   hoten       nvarchar2(100) not null,
   ngaysinh    date,
   gioitinh    varchar2(10),
   sdt         varchar2(15) not null,
   email       varchar2(100),
   cccd        varchar2(20),
   diemtichluy number default 0 not null,
   constraint unq_kh_sdt unique ( sdt ),
   constraint unq_kh_email unique ( email ),
   constraint unq_kh_cccd unique ( cccd )
);

-- 12. Bảng HANHKHACH
create table hanhkhach (
   mahk     varchar2(20)
      constraint pk_hanhkhach primary key,
   makh     varchar2(20) not null
      constraint fk_hk_khachhang
         references khachhang ( makh ),
   hoten    nvarchar2(100) not null,
   ngaysinh date,
   sdt      varchar2(15)
);

-- 13. Bảng PHIEUDATVE
create table phieudatve (
   maphieuve   varchar2(20)
      constraint pk_phieudatve primary key,
   makh        varchar2(20) not null
      constraint fk_pdv_kh
         references khachhang ( makh ),
   makm        varchar2(20)
      constraint fk_pdv_km
         references khuyenmai ( makm ),
   ngaydat     timestamp default systimestamp not null,
   thanhtien   number(15,2) not null,
   trangthai   number(1) not null,
   ngaycapnhat timestamp default systimestamp,
   constraint chk_pdv_trangthai
      check ( trangthai in ( 0, 1, 2 ) )
);

-- 14. Bảng PHIEUGUIHANG
create table phieuguihang (
   maphieuhang  varchar2(20)
      constraint pk_phieuguihang primary key,
   makh         varchar2(20)
      constraint fk_pgh_kh
         references khachhang ( makh ),
   tennguoinhan nvarchar2(100) not null,
   sdtnguoinhan varchar2(15) not null,
   diachinhan   nvarchar2(200) not null,
   diachigui    nvarchar2(200),
   thanhtien    number(15,2) not null,
   ngaygui      timestamp default systimestamp not null,
   trangthai    number(1) not null,
   ngaycapnhat  timestamp default systimestamp,
   constraint chk_pgh_trangthai
      check ( trangthai in ( 0, 1, 2, 3 ) )
);

-- 15. Bảng HOSOCHUYENXE
create table hosochuyenxe (
   machuyen    varchar2(20)
      constraint pk_hosochuyenxe primary key,
   matuyen     varchar2(20) not null
      constraint fk_hscx_tuyen
         references tuyenxe ( matuyen ),
   maxe        varchar2(20) not null
      constraint fk_hscx_xe
         references xe ( maxe ),
   matx1       varchar2(20) not null
      constraint fk_hscx_tx1
         references taixe ( matx ),
   matx2       varchar2(20)
      constraint fk_hscx_tx2
         references taixe ( matx ),
   tgkhoihanh  timestamp not null,
   tgden       timestamp not null,
   trangthai   number(1) not null,
   ghichu      nvarchar2(200),
   loaichuyen  number(1) default 0 not null,
   giavethucte number(15,2),
   constraint chk_hscx_thoigian check ( tgden > tgkhoihanh ),
   constraint chk_hscx_trangthai
      check ( trangthai in ( 0, 1, 2, 3 ) ),
   constraint chk_hscx_loaichuyen check ( loaichuyen in ( 0, 1 ) )
);

-- 16. Bảng VE
create table ve (
   mave      varchar2(20)
      constraint pk_ve primary key,
   mahk      varchar2(20)
      constraint fk_ve_hk
         references hanhkhach ( mahk ),
   machuyen  varchar2(20) not null
      constraint fk_ve_chuyen
         references hosochuyenxe ( machuyen ),
   maphieuve varchar2(20) not null
      constraint fk_ve_pdv
         references phieudatve ( maphieuve ),
   maghe     varchar2(10) not null,
   phuthu    number(15,2) default 0 not null,
   giave     number(15,2) not null,
   trangthai number(1) not null,
   constraint chk_ve_trangthai
      check ( trangthai in ( 0, 1, 2 ) ),
   constraint unq_ve_ghechuyen unique ( machuyen, maghe )
);

-- 17. Bảng HANGHOA
create table hanghoa (
   mahh        varchar2(20)
      constraint pk_hanghoa primary key,
   machuyen    varchar2(20) not null
      constraint fk_hh_chuyen
         references hosochuyenxe ( machuyen ),
   maphieuhang varchar2(20) not null
      constraint fk_hh_pgh
         references phieuguihang ( maphieuhang ),
   loaihh      number(1) not null,
   giacuoc     number(15,2) not null,
   khoiluong   number(10,2) not null,
   constraint chk_hh_loai
      check ( loaihh in ( 0, 1, 2 ) )
);

-- 18. Bảng GIAODICH
create table giaodich (
   magd        varchar2(20)
      constraint pk_giaodich primary key,
   maphieuve   varchar2(20)
      constraint fk_gd_pdv
         references phieudatve ( maphieuve ),
   maphieuhang varchar2(20)
      constraint fk_gd_pgh
         references phieuguihang ( maphieuhang ),
   thoigiangd  timestamp default systimestamp not null,
   phuongthuc  number(1) not null,
   sotien      number(15,2) not null,
   trangthai   number(1) not null,
   constraint chk_gd_phuongthuc
      check ( phuongthuc in ( 0, 1, 2 ) ),
   constraint chk_gd_trangthai check ( trangthai in ( 0, 1 ) ),
   constraint chk_gd_cophieu
      check ( maphieuve is not null or maphieuhang is not null )
);

-- 19. Bảng TICHDIEM
create table tichdiem (
   matichdiem  varchar2(20)
      constraint pk_tichdiem primary key,
   makh        varchar2(20) not null
      constraint fk_td_kh
         references khachhang ( makh ),
   maphieuve   varchar2(20)
      constraint fk_td_pdv
         references phieudatve ( maphieuve ),
   maphieuhang varchar2(20)
      constraint fk_td_pgh
         references phieuguihang ( maphieuhang ),
   sodiemgd    number not null,
   ngaygd      timestamp default systimestamp not null,
   ghichu      nvarchar2(200),
   constraint chk_td_cophieu
      check ( maphieuve is not null or maphieuhang is not null )
);

commit;

-- ============================================================================
-- DUMMY ACCOUNTS
-- ============================================================================

-- Admin
insert into taikhoan (matk, tentk, matkhau, vaitro) values ('TK001', 'admin', 'admin', 'admin');

-- Employee (needs TAIKHOAN + NHANVIEN)
insert into taikhoan (matk, tentk, matkhau, vaitro) values ('TK002', 'nhanvien', 'nhanvien', 'nhanvien');
insert into nhanvien (manv, matk, hoten, sdt, email, cccd, vitri, ngayvaolam, luongcb, trangthai) 
values ('NV001', 'TK002', N'Nhân Viên', '0900000001', 'nhanvien@busgo.com', '001099000001', N'Nhân viên bán vé', sysdate, 8000000, 1);

-- Customer (needs TAIKHOAN + KHACHHANG)
insert into taikhoan (matk, tentk, matkhau, vaitro) values ('TK003', 'khachhang', 'khachhang', 'khachhang');
insert into khachhang (makh, matk, hoten, sdt, email, diemtichluy) 
values ('KH001', 'TK003', N'Khách Hàng', '0900000002', 'khachhang@busgo.com', 0);

commit;
