import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Khi cuộn xuống quá 200px, navbar sẽ chuyển sang trạng thái dính
            if (window.scrollY > 200) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Thêm sự kiện lắng nghe khi cuộn
        window.addEventListener('scroll', handleScroll);

        // Cleanup function để tránh rò rỉ bộ nhớ
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* 
        Nếu dùng position 'fixed', thanh navbar sẽ bị bứt ra khỏi luồng HTML. 
        Nên có thể bạn cần một div giả (placeholder) để tránh nội dung bên dưới bị giật lên.
      */}
            {isSticky && <div className="h-16"></div>}

            <nav
                className={`w-full h-16 flex items-center px-8 transition-all duration-300 z-50 
        ${isSticky
                        ? 'fixed top-0 left-0 bg-white shadow-md animate-slideDown'
                        : 'relative bg-blue-600 text-white'
                    }`}
            >
                <div className="font-bold text-xl">Hệ Thống Nhà Xe</div>
                {/* Các menu item khác... */}
            </nav>
        </>
    );
};

export default Navbar;