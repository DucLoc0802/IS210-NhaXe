'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
        <div className="logo-icon">🚌</div>
        <span className="logo-text">Nhà <span>Xe</span></span>
      </div>

      <ul className="navbar-links">
        <li><Link href="/#routes">Tuyến đường</Link></li>
        <li><Link href="/#features">Tính năng</Link></li>
        <li><Link href="/#testimonials">Đánh giá</Link></li>
        <li><Link href="/tracuu-ve">Tra cứu vé</Link></li>
        <li><Link href="#">Hỗ trợ</Link></li>
      </ul>

      <div className="navbar-actions">
        {user ? (
          <span style={{ color: 'white', fontWeight: 500 }}>Xin chào, {user.hoten || user.tentk}</span>
        ) : (
          <>
            <button className="btn-ghost" onClick={() => router.push('/login')}>Đăng nhập</button>
            <button className="btn-nav-primary" onClick={() => router.push('/register')}>Đăng ký</button>
          </>
        )}
      </div>

      <button className="hamburger" aria-label="Mở menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
