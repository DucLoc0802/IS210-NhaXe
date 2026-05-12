"use client";
// page.tsx - Trang chủ của BusGo - Ứng dụng đặt vé xe buýt
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ============================================
// DỮ LIỆU MẪU
// ============================================

/** Danh sách tuyến đường phổ biến */
const POPULAR_ROUTES = [
  {
    id: 1,
    from: "TP. Hồ Chí Minh",
    to: "Đà Lạt",
    duration: "6–7 giờ",
    fromPrice: 180_000,
    tag: "Phổ biến",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80&auto=format",
  },
  {
    id: 2,
    from: "Hà Nội",
    to: "Hải Phòng",
    duration: "2–3 giờ",
    fromPrice: 120_000,
    tag: "Nhiều chuyến",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80&auto=format",
  },
  {
    id: 3,
    from: "Đà Nẵng",
    to: "Hội An",
    duration: "45 phút",
    fromPrice: 60_000,
    tag: "Ngắn nhất",
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80&auto=format",
  },
];

/** Tính năng nổi bật */
const FEATURES = [
  {
    icon: "🔒",
    title: "Thanh toán an toàn 100%",
    desc: "Mã hóa SSL tiêu chuẩn ngân hàng. Hỗ trợ đa dạng phương thức: ví điện tử, thẻ ATM, QR Pay.",
  },
  {
    icon: "📱",
    title: "Vé điện tử tức thì",
    desc: "Nhận vé ngay trên điện thoại sau khi đặt thành công. Không cần in giấy, lên xe quét mã là xong.",
  },
  {
    icon: "🔄",
    title: "Đổi/hoàn vé linh hoạt",
    desc: "Chính sách hoàn vé minh bạch. Đổi lịch dễ dàng trước giờ khởi hành theo quy định từng tuyến.",
  },
  {
    icon: "🛎️",
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng. Gọi hotline, chat trực tiếp hoặc gửi email bất cứ lúc nào.",
  },
  {
    icon: "📍",
    title: "Theo dõi xe thời gian thực",
    desc: "Biết chính xác xe đang ở đâu, dự kiến đến bến lúc nào. Không phải chờ đợi mù quáng.",
  },
  {
    icon: "⭐",
    title: "Hơn 500+ tuyến đường",
    desc: "Phủ sóng toàn quốc từ Lạng Sơn đến Cà Mau. Hợp tác với 200+ nhà xe uy tín được kiểm định.",
  },
];

const BUS_TYPES = [
  {
    id: "sleeper-32",
    icon: "🛏️",
    name: "Giường nằm 32 chỗ",
    badge: "WC",
    badgeColor: "#00bcd4",
    tag: "Phổ biến",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80&auto=format",
    amenities: [
      { icon: "🚻", label: "Nhà vệ sinh" },
      { icon: "🪟", label: "Rèm cửa" },
      { icon: "💧", label: "Nước uống" },
      { icon: "📶", label: "Wifi" },
      { icon: "❄️", label: "Điều hòa" },
      { icon: "🛌", label: "Chăn, gối" },
      { icon: "🔌", label: "Sạc điện thoại" },
    ],
  },
  {
    id: "sleeper-21",
    icon: "👑",
    name: "Giường nằm 21 chỗ",
    badge: "WC",
    badgeColor: "#f59e0b",
    tag: "Cao cấp",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80&auto=format",
    amenities: [
      { icon: "🚻", label: "Nhà vệ sinh" },
      { icon: "🚪", label: "Phòng riêng" },
      { icon: "🪟", label: "Rèm cửa, rèm phòng" },
      { icon: "🍪", label: "Nước uống, bánh" },
      { icon: "📶", label: "Wifi" },
      { icon: "❄️", label: "Điều hòa" },
      { icon: "🛌", label: "Chăn, gối" },
      { icon: "🔌", label: "Sạc điện thoại" },
      { icon: "📺", label: "Tivi" },
    ],
  },
  {
    id: "seat-45",
    icon: "💺",
    name: "Xe ghế ngồi 45 chỗ",
    badge: null,
    badgeColor: null,
    tag: "Tiết kiệm",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format",
    amenities: [
      { icon: "🪟", label: "Rèm cửa" },
      { icon: "💧", label: "Nước uống" },
      { icon: "📶", label: "Wifi" },
      { icon: "❄️", label: "Điều hòa" },
      { icon: "🪑", label: "Ghế mút êm" },
    ],
  },
];

/** Đánh giá từ khách hàng */
const TESTIMONIALS = [
  {
    id: 1,
    text: "Đặt vé chỉ mất 2 phút, giao diện cực kỳ dễ dùng. Giá vé hiển thị rõ ràng, không phát sinh phí ẩn nào cả. Sẽ dùng mãi!",
    name: "Trương Như Khải",
    role: "Khách hàng thường xuyên",
    avatar: "T",
    stars: 5,
  },
  {
    id: 2,
    text: "Lần đầu dùng BusGo để đặt vé Sài Gòn – Đà Lạt. Xe đúng giờ, ghế ngồi thoải mái đúng như mô tả. Hoàn toàn hài lòng.",
    name: "Trần Anh Thư",
    role: "Du lịch gia đình",
    avatar: "L",
    stars: 5,
  },
  {
    id: 3,
    text: "Tính năng theo dõi xe thời gian thực rất tiện. Biết giờ đến để ra bến đúng lúc, không phải chờ lâu. Ứng dụng xịn thật!",
    name: "Phương Thiên Lộc",
    role: "Khách hàng thân thiết",
    avatar: "V",
    stars: 5,
  },
];

/** Thống kê nổi bật */
const STATS = [
  { number: "Hơn 2 triệu", label: "Lượt đặt vé thành công" },
  { number: "10+", label: "Tuyến đường toàn quốc" },
  { number: "Gần 100", label: "Chuyến xe mỗi ngày" },
  { number: "4.9★", label: "Điểm đánh giá trung bình" },
];

// ============================================
// DANH SÁCH ĐIỂM ĐI / ĐẾN
// ============================================
const LOCATIONS = [
  "TP. Hồ Chí Minh",
  "Vũng Tàu",
  "Nha Trang",
  "Gia Lai",
  "Quảng Ngãi",
  "Đà Nẵng",
];

// ============================================
// FORMAT TIỀN TỆ
// ============================================
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount
  );

// ============================================
// COMPONENT CHÍNH
// ============================================
export default function HomePage() {
  // State form đặt vé
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  // Cuộn navbar
  const [scrolled, setScrolled] = useState(false);

  // Trạng thái đang tìm kiếm
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xử lý đổi điểm đi/đến
  const handleSwap = () => {
    setDeparture(destination);
    setDestination(departure);
  };

  // Xử lý tìm kiếm
  // Xử lý tìm kiếm
  const handleSearch = () => {
    if (!departure || !destination || !departDate) return;
    setIsSearching(true);
    // Reset sau 3 giây (sau này thay bằng logic thật)
    setTimeout(() => setIsSearching(false), 3000);
  };

  // Ngày tối thiểu (hôm nay)
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* ==============================
          NAVIGATION BAR
          ============================== */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">🚌</div>
          <span className="logo-text">
            Nhà <span>Xe</span>
          </span>
        </div>

        {/* Link điều hướng (desktop) */}
        <ul className="navbar-links">
          <li><a href="#routes">Tuyến đường</a></li>
          <li><a href="#features">Tính năng</a></li>
          <li><a href="#testimonials">Đánh giá</a></li>
          <li><a href="#">Tra cứu vé</a></li>
          <li><a href="#">Hỗ trợ</a></li>
        </ul>

        {/* Nút hành động (desktop) */}
        <div className="navbar-actions">
          <button className="btn-ghost" onClick={() => router.push('/login')}>Đăng nhập</button>
          <button className="btn-nav-primary" onClick={() => router.push('/register')}>Đăng ký</button>
        </div>

        {/* Hamburger (mobile) */}
        <button className="hamburger" aria-label="Mở menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ==============================
          HERO SECTION
          ============================== */}
      <section className="hero">
        {/* Ảnh nền */}
        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1800&q=85&auto=format"
            alt="Xe buýt du lịch trên đường cao tốc"
          />
        </div>

        {/* Overlay gradient */}
        <div className="hero-overlay" />

        {/* Tiêu đề hero */}
        <div className="hero-content">
          <h1 className="hero-title">
            Hành trình của bạn<br />
            bắt đầu từ{" "}
            <span className="highlight">một cú nhấp</span>
          </h1>
          <p className="hero-subtitle">
            Chọn (Nhà Xe) - Chọn chuyến đi hạnh phúc.
          </p>
        </div>

        {/* ==============================
            BOOKING FORM (Chồng lên hero)
            ============================== */}
        <div className="booking-card-wrapper">
          <div className="booking-card">
            {/* Tab loại chuyến */}
            <div className="booking-tabs">
              <button
                className={`booking-tab${tripType === "one-way" ? " active" : ""}`}
                onClick={() => setTripType("one-way")}
              >
                Một chiều
              </button>
              <button
                className={`booking-tab${tripType === "round-trip" ? " active" : ""}`}
                onClick={() => setTripType("round-trip")}
              >
                Khứ hồi
              </button>
            </div>

            {/* Body form */}
            <div className="booking-form-body">
              {/* Lưới trường nhập liệu */}
              <div className="form-grid">
                {/* Điểm đi */}
                <div className="form-field">
                  <label className="field-label" htmlFor="departure">
                    Điểm đi
                  </label>
                  <select
                    id="departure"
                    className="field-input field-select"
                    value={departure}
                    onChange={(e) => {
                      setDeparture(e.target.value);
                      // Nếu điểm đến trùng thì reset
                      if (e.target.value === destination) setDestination("");
                    }}
                  >
                    <option value="">-- Chọn điểm đi --</option>
                    {LOCATIONS.filter((loc) => loc !== destination).map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <span className="field-subtext">Chọn bến xe xuất phát</span>
                </div>

                {/* Nút hoán đổi */}
                <button className="swap-btn" onClick={handleSwap} title="Đổi điểm đi/đến">
                  <span className="swap-icon">⇄</span>
                </button>

                {/* Điểm đến */}
                <div className="form-field">
                  <label className="field-label" htmlFor="destination">
                    Điểm đến
                  </label>
                  <select
                    id="destination"
                    className="field-input field-select"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      // Nếu điểm đi trùng thì reset
                      if (e.target.value === departure) setDeparture("");
                    }}
                  >
                    <option value="">-- Chọn điểm đến --</option>
                    {LOCATIONS.filter((loc) => loc !== departure).map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <span className="field-subtext">Chọn bến xe đến</span>
                </div>

                {/* Ngày đi */}
                <div className="form-field">
                  <label className="field-label" htmlFor="depart-date">
                    Ngày đi
                  </label>
                  <input
                    id="depart-date"
                    className="field-input"
                    type="date"
                    min={today}
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                  />
                  <span className="field-subtext">Chọn ngày khởi hành</span>
                </div>

                {/* Ngày về (tùy chọn) */}
                <div className="form-field" style={{ opacity: tripType === "round-trip" ? 1 : 0.5 }}>
                  <label className="field-label" htmlFor="return-date">
                    Ngày về{" "}
                    <span style={{ fontSize: "0.65rem", fontWeight: 400, textTransform: "none", opacity: 0.7 }}>
                      (tùy chọn)
                    </span>
                  </label>
                  <input
                    id="return-date"
                    className="field-input"
                    type="date"
                    min={departDate || today}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    disabled={tripType === "one-way"}
                  />
                  <span className="field-subtext">
                    {tripType === "one-way" ? "Chọn khứ hồi để kích hoạt" : "Chọn ngày quay về"}
                  </span>
                </div>
              </div>

              {/* Hàng dưới: hành khách + nút tìm */}
              <div className="form-row-bottom">
                {/* Bộ chọn số hành khách */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "var(--gray-100)",
                      borderRadius: "var(--radius-lg)",
                      padding: "10px 16px",
                      border: "1.5px solid var(--gray-200)",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Hành khách
                    </span>
                    <button
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        border: "1.5px solid var(--gray-300)",
                        background: "var(--white)", cursor: "pointer",
                        fontWeight: 700, fontSize: "1rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--blue-mid)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", minWidth: "1.5rem", textAlign: "center" }}>
                      {passengers}
                    </span>
                    <button
                      onClick={() => setPassengers(Math.min(10, passengers + 1))}
                      style={{
                        width: 28, height: 28, borderRadius: "50%",
                        border: "1.5px solid var(--gray-300)",
                        background: "var(--white)", cursor: "pointer",
                        fontWeight: 700, fontSize: "1rem",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--blue-mid)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Cam kết nhỏ */}
                  <div className="form-perks">
                    <span className="perk-item">
                      <span className="perk-icon">✓</span> Không phí ẩn
                    </span>
                    <span className="perk-item">
                      <span className="perk-icon">✓</span> Hoàn vé dễ dàng
                    </span>
                    <span className="perk-item">
                      <span className="perk-icon">✓</span> Vé điện tử ngay
                    </span>
                  </div>
                </div>

                {/* Nút tìm chuyến */}
                {/* Nút tìm chuyến */}
                <button
                  className={`btn-search${isSearching ? " btn-search--loading" : ""}`}
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? "Đang tìm kiếm..." : "Tìm chuyến xe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Khoảng cách sau hero (để bù phần card chồng xuống) */}
      <div className="hero-spacer" />

      {/* ==============================
          STATS
          ============================== */}
      <section className="stats-section">
        <div className="stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==============================
          TUYẾN PHỔ BIẾN
          ============================== */}
      <section id="routes" className="routes-section">
        <div className="section-header">
          <span className="section-eyebrow">Tuyến đường</span>
          <h2 className="section-title">Các tuyến được đặt nhiều nhất</h2>
          <p className="section-desc">
            Hàng nghìn chuyến xe khởi hành mỗi ngày. Đặt ngay để có giá tốt nhất!
          </p>
        </div>

        <div className="routes-grid">
          {POPULAR_ROUTES.map((route) => (
            <div key={route.id} className="route-card" onClick={() => {
              setDeparture(route.from);
              setDestination(route.to);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
              <div className="route-image-wrapper">
                <img
                  className="route-image"
                  src={route.image}
                  alt={`${route.from} đến ${route.to}`}
                />
                <span className="route-tag">{route.tag}</span>
              </div>
              <div className="route-info">
                <div className="route-name">
                  {route.from}
                  <span className="route-arrow">→</span>
                  {route.to}
                </div>
                <div className="route-meta">
                  <span className="route-time">
                    {route.duration}
                  </span>
                  <span className="route-price">
                    {formatCurrency(route.fromPrice)}{" "}
                    <small>/vé</small>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==============================
          TÍNH NĂNG
          ============================== */}
      <section id="features" className="features-section">
        <div className="features-inner">
          <div className="section-header">
            <span className="section-eyebrow">Đội xe của chúng tôi</span>
            <h2 className="section-title">Các loại xe phục vụ hành khách</h2>
            <p className="section-desc">
              Đa dạng lựa chọn phù hợp mọi nhu cầu — từ tiết kiệm đến cao cấp.
            </p>
          </div>

          <div className="bus-types-grid">
            {BUS_TYPES.map((bus) => (
              <div key={bus.id} className="bus-type-card">
                {/* Ảnh xe */}
                <div className="bus-type-image-wrap">
                  <img src={bus.image} alt={bus.name} className="bus-type-image" />
                  {/* Tag loại xe */}
                  <span className="bus-type-tag">{bus.tag}</span>
                  {/* Badge WC nếu có */}
                  {bus.badge && (
                    <span className="bus-type-badge" style={{ background: bus.badgeColor ?? undefined }}>
                      {bus.badge}
                    </span>
                  )}
                </div>

                {/* Nội dung */}
                <div className="bus-type-body">
                  <div className="bus-type-header">
                    <span className="bus-type-icon">{bus.icon}</span>
                    <h3 className="bus-type-name">{bus.name}</h3>
                  </div>

                  {/* Danh sách tiện ích */}
                  <ul className="bus-amenities">
                    {bus.amenities.map((item) => (
                      <li key={item.label} className="bus-amenity-item">
                        <span className="amenity-icon">{item.icon}</span>
                        <span className="amenity-label">{item.label}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="btn-bus-select">Chọn loại xe này →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          ĐÁNH GIÁ KHÁCH HÀNG
          ============================== */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <span className="section-eyebrow">Khách hàng nói gì</span>
          <h2 className="section-title">Hàng triệu người tin tưởng BusGo</h2>
          <p className="section-desc">
            Đánh giá thật từ những hành khách thật trên toàn quốc.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="stars">
                {"★".repeat(t.stars)}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.avatar}</div>
                <div className="author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==============================
          CTA CUỐI TRANG
          ============================== */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Sẵn sàng cho chuyến đi tiếp theo?</h2>
          <p className="cta-desc">
            Đặt vé ngay hôm nay, nhận ưu đãi đặc biệt dành cho thành viên mới.
            Tiết kiệm đến 30% cho chuyến đi đầu tiên!
          </p>
          <div className="cta-buttons">
            <button className="btn-cta-primary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              🎟️ Đặt vé ngay
            </button>
            <button className="btn-cta-outline">
              📲 Tải ứng dụng
            </button>
          </div>
        </div>
      </section>

      {/* ==============================
          FOOTER
          ============================== */}
      <footer className="footer">
        <div className="footer-grid">
          {/* Cột thương hiệu */}
          <div className="footer-brand">
            <div className="navbar-logo">
              <div className="logo-icon">🚌</div>
              <span className="logo-text">
                Bus<span>Go</span>
              </span>
            </div>
            <p>
              Nền tảng đặt vé xe buýt trực tuyến hàng đầu Việt Nam. Kết nối hành khách với 200+ nhà xe uy tín trên toàn quốc.
            </p>
          </div>

          {/* Cột dịch vụ */}
          <div className="footer-col">
            <h4>Dịch vụ</h4>
            <ul className="footer-links">
              <li><a href="#">Đặt vé xe buýt</a></li>
              <li><a href="#">Tra cứu vé</a></li>
              <li><a href="#">Tuyến đường</a></li>
              <li><a href="#">Lịch chạy xe</a></li>
            </ul>
          </div>

          {/* Cột hỗ trợ */}
          <div className="footer-col">
            <h4>Hỗ trợ</h4>
            <ul className="footer-links">
              <li><a href="#">Trung tâm trợ giúp</a></li>
              <li><a href="#">Chính sách hoàn vé</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Liên hệ chúng tôi</a></li>
            </ul>
          </div>

          {/* Cột công ty */}
          <div className="footer-col">
            <h4>Công ty</h4>
            <ul className="footer-links">
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Đối tác nhà xe</a></li>
              <li><a href="#">Tuyển dụng</a></li>
              <li><a href="#">Tin tức</a></li>
            </ul>
          </div>
        </div>

        {/* Dòng dưới footer */}
        <div className="footer-bottom">
          <span>© 2026 BusGo. Đã đăng ký bản quyền.</span>
          <div className="footer-bottom-links">
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Cookie</a>
          </div>
        </div>
      </footer>
    </>
  );
}