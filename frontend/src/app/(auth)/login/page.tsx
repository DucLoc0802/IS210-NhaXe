'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter để chuyển trang
import styles from './login.module.css';

export default function AuthPage() {
    // Đổi biến email thành sdt cho đúng với logic số điện thoại
    const [sdt, setSdt] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter(); // Khởi tạo router

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // GỌI THẲNG SANG BACKEND NESTJS TẠI CỔNG 3001
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sdt: sdt, password: password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                // Bắt chính xác lỗi từ NestJS trả về (Ví dụ: Sai mật khẩu, User không tồn tại)
                throw new Error(errorData.message || 'Sai thông tin đăng nhập!');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            {/* Left Side - Form */}
            <div className={styles.formSection}>
                <div className={styles.formContent}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>(Nhà Xe) Xin chào!</h1>
                        <p className={styles.subtitle}>Đăng nhập để mua vé</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <div className={styles.formGroup}>
                            {/* Sửa lại Label cho đúng với số điện thoại */}
                            <label htmlFor="sdt" className={styles.label}>
                                Số điện thoại
                            </label>
                            <input
                                id="sdt"
                                type="tel" // HTML chuẩn cho số điện thoại là 'tel', không phải 'phone'
                                placeholder="0123456789"
                                value={sdt}
                                onChange={(e) => setSdt(e.target.value)}
                                className={styles.input}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.formFooter}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    disabled={isLoading}
                                    className={styles.checkbox}
                                />
                                <span>Ghi nhớ đăng nhập</span>
                            </label>
                            <Link href="/forgot-password" className={styles.forgotLink}>
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <p className={styles.signupPrompt}>
                        Bạn chưa có tài khoản?{' '}
                        <Link href="/register" className={styles.signupLink}>
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Branded Visual */}
            <div className={styles.visualSection}>
            </div>
        </div>
    );
}