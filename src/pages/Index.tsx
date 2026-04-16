import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ─── DATA ─── */
const HOUSES = [
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/3a10e71d-ef93-4b53-8b41-da3c7a52c0ec.jpg",
    title: "Шале 6×8",
    area: "48 м²",
    price: "от 996 000 ₽",
    oldPrice: null,
    badge: null,
    tag: "Хит продаж",
    desc: "Каркасный дом с открытой верандой. Тёмное дерево и стекло.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/c9b8c086-0c50-4b98-92de-0db2c68899ee.jpg",
    title: "Шале 6×6",
    area: "36 м²",
    price: "от 790 000 ₽",
    oldPrice: "970 000 ₽",
    badge: "Акция",
    tag: "Скандинав",
    desc: "Светлый дом в скандинавском стиле. Плоская кровля.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/b54beb16-2abf-4dac-aa20-162d1cb3b35d.jpg",
    title: "Дом 8×8",
    area: "64 м²",
    price: "от 1 101 000 ₽",
    oldPrice: null,
    badge: null,
    tag: "Премиум",
    desc: "Тёмный антрацит и дерево. Панорамные окна.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/a05fb1e0-6538-4d41-85b9-0e4864f13ea1.jpg",
    title: "Дачный 5×6",
    area: "30 м²",
    price: "от 496 000 ₽",
    oldPrice: null,
    badge: null,
    tag: "Эконом",
    desc: "Тёплый кедровый домик с открытой верандой.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/015baeb7-74ae-4fd2-8ced-cea95b0ef9b7.jpg",
    title: "Дом 8×10",
    area: "80 м²",
    price: "от 1 450 000 ₽",
    oldPrice: null,
    badge: "Новинка",
    tag: "Два этажа",
    desc: "Двухэтажный. Чёрная сталь и дерево. Балкон.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/c5800bf9-4934-4837-821b-d3e97c7776c8.jpg",
    title: "Баня 4×6",
    area: "24 м²",
    price: "от 380 000 ₽",
    oldPrice: null,
    badge: null,
    tag: "Баня",
    desc: "Классическая русская баня. Тёмные брёвна.",
  },
];

const WHY = [
  { icon: "ShieldCheck", title: "Гарантия 5 лет", desc: "Официальная гарантия на все конструктивные элементы" },
  { icon: "Wallet", title: "Цена в договоре", desc: "Фиксированная стоимость — без сюрпризов в процессе" },
  { icon: "Clock", title: "Срок от 45 дней", desc: "Чёткие сроки. Фотоотчёт каждую неделю" },
  { icon: "Truck", title: "По всей России", desc: "Доставляем команду и материалы в любой регион" },
  { icon: "FileText", title: "Полный пакет", desc: "Договор, смета, технический паспорт" },
  { icon: "Home", title: "Под ключ", desc: "Фундамент, стены, кровля, отделка, коммуникации" },
];

const PROCESS = [
  { title: "Заявка", desc: "Перезваниваем в течение 15 минут" },
  { title: "Проект", desc: "Подбираем под участок и бюджет" },
  { title: "Договор", desc: "Фиксируем стоимость и сроки" },
  { title: "Стройка", desc: "Фотоотчёт каждую неделю" },
  { title: "Сдача", desc: "Подписываем акт, выдаём гарантию" },
];

const REVIEWS = [
  { name: "Андрей К.", city: "Самара", text: "Шале 6×8 построили за 55 дней — всё чётко по договору. Качество отличное, соседи уже спрашивают контакты.", stars: 5 },
  { name: "Ольга М.", city: "Казань", text: "Мечтала о своей даче много лет. Сделали проект под участок, держали в курсе на каждом этапе. Очень довольна!", stars: 5 },
  { name: "Василий П.", city: "Уфа", text: "Дом 8×8 за 60 дней. Еженедельные фотоотчёты — было приятно видеть прогресс. Рекомендую!", stars: 5 },
];

const STATS = [
  { num: "500+", label: "объектов построено" },
  { num: "18", label: "лет на рынке" },
  { num: "45", label: "дней до сдачи" },
  { num: "5", label: "лет гарантии" },
];

/* ─── COLORS ─── */
const C = {
  bg: "#0e1a14",
  surface: "#162012",
  card: "#1c2a1c",
  border: "rgba(255,255,255,0.07)",
  gold: "#c9a96e",
  goldLight: "#e8c987",
  text: "#f0ede8",
  muted: "rgba(240,237,232,0.5)",
  green: "#1e3d2a",
};

/* ─── COMPONENT ─── */
const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHouse, setActiveHouse] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");
  const [phone, setPhone] = useState("");
  const [heroSent, setHeroSent] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", comment: "" });
  const [orderSent, setOrderSent] = useState(false);
  const [heroImg, setHeroImg] = useState(0);

  const heroImages = [
    "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/3a10e71d-ef93-4b53-8b41-da3c7a52c0ec.jpg",
    "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/b54beb16-2abf-4dac-aa20-162d1cb3b35d.jpg",
    "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/015baeb7-74ae-4fd2-8ced-cea95b0ef9b7.jpg",
  ];

  const filters = ["Все", "до 500 000 ₽", "500 000 – 1 млн", "от 1 млн"];

  const filteredHouses = HOUSES.filter((h) => {
    if (filter === "Все") return true;
    const price = parseInt(h.price.replace(/\D/g, ""));
    if (filter === "до 500 000 ₽") return price < 500000;
    if (filter === "500 000 – 1 млн") return price >= 500000 && price < 1000000;
    if (filter === "от 1 млн") return price >= 1000000;
    return true;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    // Hero slideshow
    const timer = setInterval(() => setHeroImg(p => (p + 1) % heroImages.length), 5000);

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("sr-visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".sr").forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Golos Text', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── STYLES ── */}
      <style>{`
        .sr { opacity: 0; transform: translateY(32px); transition: opacity .8s ease, transform .8s ease; }
        .sr-visible { opacity: 1; transform: none; }
        .sr.d1 { transition-delay: .1s; }
        .sr.d2 { transition-delay: .2s; }
        .sr.sr.d3 { transition-delay: .3s; }
        .house-card:hover .house-img { transform: scale(1.06); }
        .house-card:hover { border-color: rgba(201,169,110,0.35) !important; }
        .why-card:hover { background: #1e3d2a !important; border-color: rgba(201,169,110,0.25) !important; }
        .process-item:hover .proc-num { color: ${C.gold} !important; }
        .btn-gold { transition: all .25s; }
        .btn-gold:hover { background: ${C.goldLight} !important; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,169,110,0.35); }
        .btn-outline:hover { background: rgba(201,169,110,0.08) !important; border-color: ${C.gold} !important; }
        .nav-link:hover { color: ${C.gold} !important; }
        input:focus, textarea:focus { border-color: ${C.gold} !important; outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.gold}; border-radius: 2px; }
        @keyframes fadeSlide { from { opacity: 0; } to { opacity: 1; } }
        .hero-img { animation: fadeSlide .8s ease; }
        .tag-pill { backdrop-filter: blur(8px); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(14,26,20,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "all .4s",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          {/* Logo */}
          <button onClick={() => go("hero")} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${C.gold}, #a07840)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="Home" size={18} style={{ color: "#fff" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: 16, color: C.gold, letterSpacing: 1 }}>СК ДАЧА №1</div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1 }}>СТРОИМ ДОМА</div>
            </div>
          </button>

          {/* Desktop links */}
          <div style={{ display: "none", alignItems: "center", gap: 32 }} className="hidden md:flex">
            {[["Каталог", "catalog"], ["О нас", "about"], ["Процесс", "process"], ["Отзывы", "reviews"]].map(([l, id]) => (
              <button key={id} onClick={() => go(id)} className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: C.muted, fontWeight: 500, transition: "color .2s", letterSpacing: .3 }}>{l}</button>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="tel:+79273401893" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: C.text, fontSize: 14, fontWeight: 700 }} className="hidden md:flex">
              <Icon name="Phone" size={15} style={{ color: C.gold }} />
              +7 927-340-18-93
            </a>
            <button onClick={() => go("order")} className="btn-gold hidden md:block" style={{ padding: "10px 22px", borderRadius: 10, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
              Заявка
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} style={{ color: C.text }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "rgba(14,26,20,0.99)", borderTop: `1px solid ${C.border}`, padding: "16px 24px 24px" }}>
            {[["Каталог", "catalog"], ["О нас", "about"], ["Процесс", "process"], ["Отзывы", "reviews"], ["Заявка", "order"]].map(([l, id]) => (
              <button key={id} onClick={() => go(id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 15, fontWeight: 500, borderBottom: `1px solid ${C.border}` }}>{l}</button>
            ))}
            <a href="tel:+79273401893" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, color: C.text, textDecoration: "none", fontWeight: 700 }}>
              <Icon name="Phone" size={16} style={{ color: C.gold }} />+7 927-340-18-93
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* BG slideshow */}
        <div key={heroImg} className="hero-img" style={{ position: "absolute", inset: 0 }}>
          <img src={heroImages[heroImg]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(14,26,20,0.92) 0%, rgba(14,26,20,0.7) 50%, rgba(14,26,20,0.3) 100%)" }} />
        </div>

        {/* Grid lines overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
          <div style={{ maxWidth: 620 }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: "rgba(201,169,110,0.12)", border: `1px solid rgba(201,169,110,0.3)`, marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>18 лет в строительстве · По всей России</span>
            </div>

            <h1 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(2.8rem,7vw,5.5rem)", lineHeight: .95, marginBottom: 24, color: C.text }}>
              КУПИТЕ ДОМ<br />
              <span style={{ color: C.gold }}>СВОЕЙ МЕЧТЫ</span>
            </h1>

            <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.65, marginBottom: 16, maxWidth: 480 }}>
              Строим каркасные дома, шале и бани под ключ. Эксклюзивные проекты класса премиум и комфорт.
            </p>

            {/* Key points */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {["Фиксированная цена", "Срок от 45 дней", "Гарантия 5 лет", "Юридическое сопровождение"].map((t, i) => (
                <span key={i} style={{ padding: "6px 14px", borderRadius: 100, border: `1px solid rgba(201,169,110,0.25)`, fontSize: 12, color: C.muted, fontWeight: 500 }}>
                  ✓ {t}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 52 }}>
              <button onClick={() => go("catalog")} className="btn-gold" style={{ padding: "16px 32px", borderRadius: 12, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
                Смотреть каталог
              </button>
              <button onClick={() => go("order")} className="btn-outline" style={{ padding: "16px 32px", borderRadius: 12, background: "transparent", color: C.text, fontWeight: 700, fontSize: 15, border: `1px solid rgba(240,237,232,0.25)`, cursor: "pointer", transition: "all .25s" }}>
                Оставить заявку
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, maxWidth: 480 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ padding: "16px 12px", background: i === 0 ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.04)", borderRadius: 12, textAlign: "center", border: `1px solid ${i === 0 ? "rgba(201,169,110,0.3)" : C.border}` }}>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: 26, color: C.gold }}>{s.num}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slideshow dots */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 5 }}>
          {heroImages.map((_, i) => (
            <button key={i} onClick={() => setHeroImg(i)} style={{ width: i === heroImg ? 28 : 8, height: 8, borderRadius: 4, background: i === heroImg ? C.gold : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all .3s" }} />
          ))}
        </div>
      </section>

      {/* ── WHY ── */}
      <section style={{ padding: "96px 24px", background: C.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sr" style={{ marginBottom: 56, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>Наши преимущества</div>
              <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.5rem)", color: C.text, lineHeight: 1 }}>ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
            </div>
            <button onClick={() => go("order")} className="btn-gold" style={{ padding: "14px 28px", borderRadius: 12, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
              Оставить заявку →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {WHY.map((w, i) => (
              <div key={i} className={`sr why-card d${(i % 3) + 1}`} style={{ padding: "28px", borderRadius: 18, background: C.card, border: `1px solid ${C.border}`, transition: "all .3s", cursor: "default" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(201,169,110,0.12)", border: `1px solid rgba(201,169,110,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  <Icon name={w.icon} size={22} style={{ color: C.gold }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: C.text }}>{w.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" style={{ padding: "96px 24px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Header */}
          <div className="sr" style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>Наши проекты</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20 }}>
              <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.5rem)", color: C.text, lineHeight: 1 }}>КАТАЛОГ ДОМОВ</h2>
              {/* Filters */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {filters.map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 100, border: `1px solid ${filter === f ? C.gold : C.border}`, background: filter === f ? "rgba(201,169,110,0.15)" : "transparent", color: filter === f ? C.gold : C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer", transition: "all .2s" }}>{f}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 20 }}>
            {filteredHouses.map((h, i) => (
              <div key={i} className={`sr house-card d${(i % 3) + 1}`} onClick={() => setActiveHouse(i)} style={{ borderRadius: 20, overflow: "hidden", background: C.card, border: `1px solid ${C.border}`, cursor: "pointer", transition: "all .35s" }}>
                {/* Image */}
                <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                  <img className="house-img" src={h.img} alt={h.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s" }} />
                  {/* Gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,26,20,0.7) 0%, transparent 60%)" }} />
                  {/* Badges */}
                  <div style={{ position: "absolute", top: 14, left: 14, right: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span className="tag-pill" style={{ padding: "5px 12px", borderRadius: 100, background: "rgba(14,26,20,0.7)", border: `1px solid ${C.border}`, fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 1 }}>{h.tag}</span>
                    {h.badge && <span style={{ padding: "5px 12px", borderRadius: 100, background: C.gold, fontSize: 11, fontWeight: 700, color: "#0e1a14" }}>{h.badge}</span>}
                  </div>
                  {/* Area */}
                  <div style={{ position: "absolute", bottom: 14, left: 14 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>{h.area}</span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "22px 22px 20px" }}>
                  <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: 20, color: C.text, marginBottom: 6 }}>{h.title} {h.area}</h3>
                  <p style={{ fontSize: 12, color: C.muted, marginBottom: 16, lineHeight: 1.5 }}>{h.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: 22, color: C.gold }}>{h.price}</div>
                      {h.oldPrice && <div style={{ fontSize: 12, color: C.muted, textDecoration: "line-through" }}>{h.oldPrice}</div>}
                    </div>
                    <button onClick={e => { e.stopPropagation(); go("order"); }} className="btn-gold" style={{ padding: "10px 20px", borderRadius: 10, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer" }}>
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below */}
          <div className="sr" style={{ textAlign: "center", marginTop: 48 }}>
            <p style={{ color: C.muted, marginBottom: 16, fontSize: 14 }}>Не нашли нужный проект? Сделаем индивидуально под ваш участок и бюджет</p>
            <button onClick={() => go("order")} className="btn-outline" style={{ padding: "14px 32px", borderRadius: 12, background: "transparent", color: C.gold, fontWeight: 700, fontSize: 14, border: `1px solid rgba(201,169,110,0.4)`, cursor: "pointer", transition: "all .25s" }}>
              Обсудить индивидуальный проект →
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "96px 24px", background: C.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-about">
          <div className="sr">
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>О компании</div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,3.2rem)", color: C.text, lineHeight: 1.05, marginBottom: 24 }}>
              СК ДАЧА №1 —<br /><span style={{ color: C.gold }}>СТРОИМ С ДУШОЙ</span>
            </h2>
            <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 16, fontSize: 15 }}>
              Более 5 лет строим каркасные дома, шале и бани по всей России. Свыше 500 объектов — от Самары до Сибири.
            </p>
            <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 32, fontSize: 15 }}>
              Фиксированная цена в договоре, чёткие сроки и полная прозрачность. Каждую неделю присылаем фотоотчёт.
            </p>
            {[
              "Собственные бригады строителей",
              "Официальный договор и смета",
              "Еженедельный фотоотчёт",
              "Принимаем маткапитал и ипотеку",
              "Гарантия 5 лет на конструктив",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(201,169,110,0.15)", border: `1px solid rgba(201,169,110,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="Check" size={12} style={{ color: C.gold }} />
                </div>
                <span style={{ fontSize: 14, color: C.muted }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Photo collage */}
          <div className="sr d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/3a10e71d-ef93-4b53-8b41-da3c7a52c0ec.jpg", tall: true },
              { img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/c9b8c086-0c50-4b98-92de-0db2c68899ee.jpg", tall: false },
              { img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/a05fb1e0-6538-4d41-85b9-0e4864f13ea1.jpg", tall: false },
              { img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/b54beb16-2abf-4dac-aa20-162d1cb3b35d.jpg", tall: true },
            ].map((item, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", height: item.tall ? 260 : 170 }}>
                <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media(max-width:768px){ .grid-about { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "96px 24px", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>Как мы работаем</div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.5rem)", color: C.text }}>ПРОЦЕСС СТРОИТЕЛЬСТВА</h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* Line */}
            <div style={{ position: "absolute", left: 28, top: 24, bottom: 24, width: 1, background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} className="hidden md:block" />

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {PROCESS.map((p, i) => (
                <div key={i} className={`sr process-item d${(i % 3) + 1}`} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: i === 0 ? C.gold : "rgba(201,169,110,0.12)", border: `1px solid ${i === 0 ? C.gold : "rgba(201,169,110,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                    <span className="proc-num" style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: 18, color: i === 0 ? "#0e1a14" : C.gold, transition: "color .3s" }}>0{i + 1}</span>
                  </div>
                  <div style={{ flex: 1, padding: "14px 24px", borderRadius: 16, background: C.card, border: `1px solid ${C.border}`, transition: "all .3s" }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: C.text, marginBottom: 4 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: C.muted }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ padding: "96px 24px", background: C.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>Отзывы</div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.5rem)", color: C.text }}>ВЛАДЕЛЬЦЫ О НАС</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className={`sr d${i + 1}`} style={{ padding: "28px", borderRadius: 20, background: C.card, border: `1px solid ${C.border}` }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} style={{ color: C.gold, fontSize: 16 }}>★</span>
                  ))}
                </div>
                {/* Quote mark */}
                <div style={{ fontSize: 48, lineHeight: 1, color: "rgba(201,169,110,0.15)", fontFamily: "Georgia, serif", marginBottom: -8 }}>"</div>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 24 }}>{r.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, #7a5a30)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "#0e1a14" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div style={{ padding: "80px 24px", background: `linear-gradient(135deg, ${C.green} 0%, #0e1a14 100%)`, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="sr" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,3rem)", color: C.text, marginBottom: 16 }}>
            ПОЛУЧИТЕ БЕСПЛАТНЫЙ<br /><span style={{ color: C.gold }}>РАСЧЁТ СТОИМОСТИ</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 16, marginBottom: 36 }}>Укажите площадь и регион — пришлём смету в течение 1 часа</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 14 }}>
            <button onClick={() => go("order")} className="btn-gold" style={{ padding: "16px 36px", borderRadius: 12, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
              Получить расчёт бесплатно
            </button>
            <a href="tel:+79273401893" style={{ padding: "16px 28px", borderRadius: 12, border: `1px solid rgba(240,237,232,0.2)`, color: C.text, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="Phone" size={18} style={{ color: C.gold }} />
              +7 927-340-18-93
            </a>
          </div>
        </div>
      </div>

      {/* ── ORDER FORM ── */}
      <section id="order" style={{ padding: "96px 24px", background: C.bg }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>Заявка</div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.2rem)", color: C.text }}>ОСТАВИТЬ ЗАЯВКУ</h2>
            <p style={{ color: C.muted, marginTop: 12, fontSize: 15 }}>Перезвоним в течение 15 минут. Первая консультация бесплатно.</p>
          </div>

          <div className="sr" style={{ borderRadius: 24, border: `1px solid ${C.border}`, background: C.card, padding: "44px 40px" }}>
            {orderSent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(201,169,110,0.12)", border: `2px solid ${C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Icon name="Check" size={32} style={{ color: C.gold }} />
                </div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: 28, color: C.text, marginBottom: 8 }}>Заявка принята!</div>
                <p style={{ color: C.muted }}>Перезвоним в течение 15 минут</p>
                <button onClick={() => setOrderSent(false)} style={{ marginTop: 20, background: "none", border: "none", color: C.gold, cursor: "pointer", textDecoration: "underline", fontSize: 13 }}>Отправить ещё</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setOrderSent(true); }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  {[
                    { label: "Ваше имя *", placeholder: "Иван", key: "name", type: "text" },
                    { label: "Телефон *", placeholder: "+7 (___) ___-__-__", key: "phone", type: "tel" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8, letterSpacing: .5 }}>{f.label}</label>
                      <input
                        required
                        type={f.type}
                        placeholder={f.placeholder}
                        value={orderForm[f.key as keyof typeof orderForm]}
                        onChange={e => setOrderForm({ ...orderForm, [f.key]: e.target.value })}
                        style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: C.bg, border: `1px solid ${C.border}`, color: C.text, fontSize: 14, boxSizing: "border-box", transition: "border-color .2s" }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8, letterSpacing: .5 }}>Комментарий</label>
                  <textarea
                    rows={4}
                    placeholder="Опишите желаемый проект: площадь, регион, бюджет..."
                    value={orderForm.comment}
                    onChange={e => setOrderForm({ ...orderForm, comment: e.target.value })}
                    style={{ width: "100%", padding: "14px 16px", borderRadius: 12, background: C.bg, border: `1px solid ${C.border}`, color: C.text, fontSize: 14, resize: "none", boxSizing: "border-box", fontFamily: "'Golos Text',sans-serif", transition: "border-color .2s" }}
                  />
                </div>
                <button type="submit" className="btn-gold" style={{ width: "100%", padding: "17px", borderRadius: 14, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
                  Отправить заявку
                </button>
                <p style={{ textAlign: "center", fontSize: 11, color: "rgba(240,237,232,0.25)", marginTop: 12 }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a1410", borderTop: `1px solid ${C.border}`, padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.gold}, #7a5a30)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="Home" size={16} style={{ color: "#fff" }} />
                </div>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, color: C.gold, letterSpacing: 1 }}>СК ДАЧА №1</span>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>Строим каркасные дома и шале под ключ по всей России. 500+ объектов за 5 лет.</p>
            </div>

            {/* Nav */}
            <div>
              <div style={{ fontWeight: 700, color: C.text, marginBottom: 16, fontSize: 14 }}>Навигация</div>
              {[["Каталог", "catalog"], ["О компании", "about"], ["Процесс", "process"], ["Отзывы", "reviews"], ["Заявка", "order"]].map(([l, id]) => (
                <button key={id} onClick={() => go(id)} className="nav-link" style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 13, padding: "5px 0", textAlign: "left", transition: "color .2s" }}>{l}</button>
              ))}
            </div>

            {/* Contacts */}
            <div>
              <div style={{ fontWeight: 700, color: C.text, marginBottom: 16, fontSize: 14 }}>Контакты</div>
              <a href="tel:+79273401893" style={{ display: "flex", alignItems: "center", gap: 8, color: C.text, textDecoration: "none", fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
                <Icon name="Phone" size={16} style={{ color: C.gold }} />+7 927-340-18-93
              </a>
              {[
                { icon: "Clock", text: "Пн–Вс: 8:00 – 20:00" },
                { icon: "MapPin", text: "По всей России" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: C.muted, fontSize: 13, marginBottom: 10 }}>
                  <Icon name={c.icon} size={15} style={{ color: C.gold }} />{c.text}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(240,237,232,0.25)" }}>© 2026 СК ДАЧА №1. Все права защищены.</span>
            <span style={{ fontSize: 12, color: "rgba(240,237,232,0.25)" }}>Политика конфиденциальности</span>
          </div>
        </div>
      </footer>

      {/* ── HOUSE MODAL ── */}
      {activeHouse !== null && (
        <div onClick={() => setActiveHouse(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: C.card, border: `1px solid rgba(201,169,110,0.3)`, borderRadius: 24, overflow: "hidden", maxWidth: 500, width: "100%", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "relative", height: 280 }}>
              <img src={HOUSES[activeHouse].img} alt={HOUSES[activeHouse].title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={() => setActiveHouse(null)} style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="X" size={18} style={{ color: "#fff" }} />
              </button>
              {HOUSES[activeHouse].badge && (
                <span style={{ position: "absolute", top: 14, left: 14, padding: "6px 14px", borderRadius: 100, background: C.gold, fontSize: 12, fontWeight: 700, color: "#0e1a14" }}>{HOUSES[activeHouse].badge}</span>
              )}
            </div>
            <div style={{ padding: "28px 28px 24px" }}>
              <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: 24, color: C.text, marginBottom: 8 }}>{HOUSES[activeHouse].title} {HOUSES[activeHouse].area}</h3>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>{HOUSES[activeHouse].desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 900, fontSize: 28, color: C.gold }}>{HOUSES[activeHouse].price}</span>
                {HOUSES[activeHouse].oldPrice && <span style={{ fontSize: 14, color: C.muted, textDecoration: "line-through" }}>{HOUSES[activeHouse].oldPrice}</span>}
              </div>
              <button onClick={() => { setActiveHouse(null); go("order"); }} className="btn-gold" style={{ width: "100%", padding: "15px", borderRadius: 12, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>
                Заказать этот проект
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick hero form — floating on mobile */}
      {!heroSent && (
        <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 90 }} className="md:hidden">
          <button onClick={() => go("order")} className="btn-gold" style={{ padding: "14px 20px", borderRadius: 14, background: C.gold, color: "#0e1a14", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", boxShadow: "0 8px 30px rgba(201,169,110,0.45)" }}>
            Оставить заявку
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;