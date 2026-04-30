'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }

            const data = await response.json();
            setSuccess(true);
            console.log('Registration successful:', data);
            // Example: window.location.href = '/email-verification';
        } catch (err) {
            setErrors({
                submit: err instanceof Error ? err.message : 'An error occurred',
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.authContainer}>
                <div className={styles.formSection}>
                    <div className={styles.formContent}>
                        <div className={styles.successContainer}>
                            <div className={styles.successIcon}>✓</div>
                            <h1 className={styles.successTitle}>Account created!</h1>
                            <p className={styles.successMessage}>
                                We've sent a confirmation link to your email. Please verify your account to get started.
                            </p>
                            <Link href="/login" className={styles.successLink}>
                                Back to sign in
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.visualSection}>
                    <div className={styles.visualBackground} />
                    <div className={styles.visualContent}>
                        <svg
                            viewBox="0 0 120 120"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.carIcon}
                        >
                            <path
                                d="M60 20 L90 50 L85 60 L75 55 L60 70 L45 55 L35 60 L30 50 Z"
                                fill="white"
                                opacity="0.9"
                            />
                            <path
                                d="M35 60 L30 80 Q30 95 40 100 L80 100 Q90 95 90 80 L85 60 Z"
                                fill="white"
                                opacity="0.9"
                            />
                            <circle cx="45" cy="85" r="6" fill="#185FA5" />
                            <circle cx="75" cy="85" r="6" fill="#185FA5" />
                            <line x1="55" y1="92" x2="65" y2="92" stroke="white" strokeWidth="2" opacity="0.6" />
                        </svg>
                        <h2 className={styles.visualTitle}>Welcome to CarDrive</h2>
                        <p className={styles.visualSubtitle}>
                            Your journey starts now. Access your vehicle and enjoy exclusive features.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.authContainer}>
            {/* Left Side - Form */}
            <div className={styles.formSection}>
                <div className={styles.formContent}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Tạo tài khoản</h1>
                        <p className={styles.subtitle}></p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {errors.submit && <div className={styles.errorMessage}>{errors.submit}</div>}

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                disabled={isLoading}
                            />
                            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="phone" className={styles.label}>
                                Số điện thoại
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="0123456789"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                                disabled={isLoading}
                            />
                            {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.label}>
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                                disabled={isLoading}
                            />
                            {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
                            <p className={styles.hint}>Độ dài tôi thiểu 8 ký tự</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword" className={styles.label}>
                                Nhập lại mật khẩu
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
                        </div>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                        </button>
                    </form>

                    <p className={styles.loginPrompt}>
                        Đã có tài khoản?{' '}
                        <Link href="/login" className={styles.loginLink}>
                            Đăng nhập
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