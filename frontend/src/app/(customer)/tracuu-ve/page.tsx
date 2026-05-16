'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './tracuu.module.css';

const API = 'http://localhost:3001';

const STATUS_LABEL: Record<number, string> = {
  0: 'Chờ thanh toán',
  1: 'Đã thanh toán',
  2: 'Đã huỷ',
};

const STATUS_CLASS: Record<number, string> = {
  0: styles.badgeActive,
  1: styles.badgeUsed,
  2: styles.badgeCancelled,
};

interface Ticket {
  mave: string;
  machuyen: string;
  maghe: string;
  giave: number;
  trangthai_ve: number;
  tgkhoihanh: string;
  tgden: string;
  tentuyen: string;
  bendau: string;
  bencuoi: string;
  tinhthanh_di: string;
  tinhthanh_den: string;
  ten_hanhkhach: string | null;
}

interface Customer {
  makh: string;
  hoten: string;
  sdt: string;
}

export default function TraCuuVePage() {
  const [tab, setTab] = useState<'sdt' | 'maVe'>('sdt');
  const [sdt, setSdt] = useState('');
  const [maVe, setMaVe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [singleTicket, setSingleTicket] = useState<Ticket | null>(null);

  const searchBySdt = async () => {
    setError('');
    setCustomer(null);
    setTickets([]);
    setSingleTicket(null);
    if (!sdt.trim()) { setError('Vui lòng nhập số điện thoại'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/lookup/sdt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sdt: sdt.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Lỗi tra cứu');
      if (!data.customer) { setError('Không tìm thấy khách hàng với số điện thoại này'); return; }
      setCustomer(data.customer);
      setTickets(data.tickets || []);
      if (data.tickets.length === 0) setError('Khách hàng chưa có vé nào');
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const searchByMaVe = async () => {
    setError('');
    setCustomer(null);
    setTickets([]);
    setSingleTicket(null);
    if (!maVe.trim()) { setError('Vui lòng nhập mã vé'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/lookup/ticket/${maVe.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Lỗi tra cứu');
      if (!data) { setError('Không tìm thấy vé với mã này'); return; }
      setSingleTicket(data);
    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('vi-VN');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Tra cứu vé</h1>
        <p className={styles.subtitle}>Tra cứu thông tin vé xe buýt của bạn</p>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'sdt' ? styles.tabActive : ''}`}
            onClick={() => setTab('sdt')}
          >
            Theo số điện thoại
          </button>
          <button
            className={`${styles.tab} ${tab === 'maVe' ? styles.tabActive : ''}`}
            onClick={() => setTab('maVe')}
          >
            Theo mã vé
          </button>
        </div>

        <div className={styles.card}>
          {error && <div className={styles.error}>{error}</div>}

          {tab === 'sdt' ? (
            <>
              <div className={styles.formRow}>
                <input
                  className={styles.input}
                  placeholder="Nhập số điện thoại..."
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchBySdt()}
                />
                <button className={styles.searchBtn} onClick={searchBySdt} disabled={loading}>
                  {loading ? 'Đang tra...' : 'Tra cứu'}
                </button>
              </div>

              {customer && (
                <div className={styles.customerInfo}>
                  <span><strong>Họ tên:</strong> {customer.hoten}</span>
                  <span><strong>Mã KH:</strong> {customer.makh}</span>
                  <span><strong>SĐT:</strong> {customer.sdt}</span>
                </div>
              )}

              {loading ? (
                <div className={styles.loading}>Đang tra cứu...</div>
              ) : tickets.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Mã vé</th>
                      <th>Tuyến</th>
                      <th>Bến đi → Bến đến</th>
                      <th>Khởi hành</th>
                      <th>Ghế</th>
                      <th>Giá vé</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t.mave}>
                        <td>{t.mave}</td>
                        <td>{t.tentuyen}</td>
                        <td>{t.bendau} → {t.bencuoi}</td>
                        <td>{formatDate(t.tgkhoihanh)}</td>
                        <td>{t.maghe}</td>
                        <td>{formatCurrency(t.giave)}</td>
                        <td>
                          <span className={`${styles.badge} ${STATUS_CLASS[t.trangthai_ve] || ''}`}>
                            {STATUS_LABEL[t.trangthai_ve] || 'Không xác định'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </>
          ) : (
            <>
              <div className={styles.formRow}>
                <input
                  className={styles.input}
                  placeholder="Nhập mã vé (VD: V00001)..."
                  value={maVe}
                  onChange={(e) => setMaVe(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchByMaVe()}
                />
                <button className={styles.searchBtn} onClick={searchByMaVe} disabled={loading}>
                  {loading ? 'Đang tra...' : 'Tra cứu'}
                </button>
              </div>

              {loading ? (
                <div className={styles.loading}>Đang tra cứu...</div>
              ) : singleTicket ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Mã vé</th>
                      <th>Tuyến</th>
                      <th>Bến đi → Bến đến</th>
                      <th>Khởi hành</th>
                      <th>Ghế</th>
                      <th>Giá vé</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{singleTicket.mave}</td>
                      <td>{singleTicket.tentuyen}</td>
                      <td>{singleTicket.bendau} → {singleTicket.bencuoi}</td>
                      <td>{formatDate(singleTicket.tgkhoihanh)}</td>
                      <td>{singleTicket.maghe}</td>
                      <td>{formatCurrency(singleTicket.giave)}</td>
                      <td>
                        <span className={`${styles.badge} ${STATUS_CLASS[singleTicket.trangthai_ve] || ''}`}>
                          {STATUS_LABEL[singleTicket.trangthai_ve] || 'Không xác định'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
            </>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" className={styles.backLink}>← Quay lại trang chủ</Link>
        </div>
      </div>
    </div>
  );
}
