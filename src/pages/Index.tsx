import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO_IMG_1 = "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/b3a12828-c0a7-42e3-ae71-825bda762602.jpg";
const PORTFOLIO_IMG_2 = "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/8c38386c-02a9-4fbb-a14e-2f150d2805ee.jpg";
const PORTFOLIO_IMG_3 = "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/452bb653-4f57-426b-a7c2-060f3f9202d4.jpg";

const services = [
  { icon: "Palette", title: "UI/UX Дизайн", desc: "Создаём интерфейсы, которые влюбляют пользователей с первого взгляда. Прототипирование, дизайн-системы, адаптивная верстка.", price: "от 80 000 ₽" },
  { icon: "Code2", title: "Веб-разработка", desc: "Быстрые современные сайты и веб-приложения на передовых технологиях. От лендинга до сложных SaaS-платформ.", price: "от 150 000 ₽" },
  { icon: "TrendingUp", title: "Маркетинг", desc: "Комплексное продвижение: SEO, таргетированная реклама, контент-стратегия. Реальные цифры роста.", price: "от 60 000 ₽" },
  { icon: "Megaphone", title: "Брендинг", desc: "Разрабатываем уникальный образ бренда: логотип, фирменный стиль, гайдлайны. Становитесь узнаваемыми.", price: "от 120 000 ₽" },
  { icon: "BarChart3", title: "Аналитика", desc: "Настраиваем аналитику, отслеживаем KPI, строим дашборды. Принимайте решения на основе данных.", price: "от 40 000 ₽" },
  { icon: "Smartphone", title: "Мобильные приложения", desc: "Нативные и кроссплатформенные приложения для iOS и Android. Запускаем в App Store и Google Play.", price: "от 300 000 ₽" },
];

const portfolio = [
  { img: PORTFOLIO_IMG_1, title: "Redesign платформы", category: "Дизайн + Разработка", tag: "SaaS" },
  { img: PORTFOLIO_IMG_2, title: "Кампания для бренда", category: "Маркетинг + Брендинг", tag: "E-commerce" },
  { img: PORTFOLIO_IMG_3, title: "Цифровой продукт", category: "UX + Аналитика", tag: "Mobile" },
];

const process = [
  { num: "01", title: "Брифинг и анализ", desc: "Погружаемся в ваш бизнес, изучаем конкурентов, формируем стратегию." },
  { num: "02", title: "Концепция и прототип", desc: "Создаём концепцию, согласовываем видение, строим прототип." },
  { num: "03", title: "Дизайн и разработка", desc: "Воплощаем идеи в жизнь с вниманием к каждой детали." },
  { num: "04", title: "Тестирование", desc: "Тщательно проверяем на всех устройствах и сценариях использования." },
  { num: "05", title: "Запуск и поддержка", desc: "Выводим продукт в свет и сопровождаем после релиза." },
];

const reviews = [
  { name: "Александр Петров", role: "CEO, TechFlow", text: "APEX полностью перевернули восприятие нашего продукта. Новый дизайн увеличил конверсию на 340%. Работать с ними — одно удовольствие.", stars: 5, avatar: "А" },
  { name: "Мария Соколова", role: "CMO, BrandLab", text: "Реклама стала приносить в 4 раза больше лидов при тех же бюджетах. Команда глубоко понимает маркетинг и умеет работать с данными.", stars: 5, avatar: "М" },
  { name: "Дмитрий Козлов", role: "Founder, StartupX", text: "За 3 месяца с нуля вышли на 1 млн оборота. APEX сделали нам не просто сайт, а настоящий инструмент продаж.", stars: 5, avatar: "Д" },
];

const stats = [
  { num: "8+", label: "лет на рынке" },
  { num: "340+", label: "проектов" },
  { num: "98%", label: "довольных клиентов" },
  { num: "x4", label: "средний рост KPI" },
];

const marqueeItems = ["Дизайн", "Разработка", "Маркетинг", "Брендинг", "Аналитика", "Мобайл", "SEO", "UX/UI"];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", description: "" });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("anim-hidden");
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".observe-me").forEach((el) => {
      el.classList.add("anim-hidden");
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#080c14", color: "#f0f4ff", fontFamily: "'Golos Text', sans-serif" }}>
      {/* Cursor glow */}
      <div
        className="cursor-glow hidden lg:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8, 12, 20, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,255,135,0.1)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow" style={{ background: "linear-gradient(135deg, #00ff87, #0066ff)" }}>
              <span className="text-black font-black text-sm">A</span>
            </div>
            <span className="font-black text-xl tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
              APEX<span className="neon-text">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[["Услуги", "services"], ["Портфолио", "portfolio"], ["О нас", "about"], ["Процесс", "process"], ["Контакты", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link text-sm font-medium cursor-pointer bg-transparent border-none">
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00ff87, #00cc6a)", color: "#080c14" }}
          >
            Обсудить проект
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ color: "#f0f4ff", background: "none", border: "none" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6" style={{ background: "rgba(8,12,20,0.98)" }}>
            {[["Услуги", "services"], ["Портфолио", "portfolio"], ["О нас", "about"], ["Процесс", "process"], ["Контакты", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left py-3 border-b nav-link" style={{ borderColor: "rgba(0,255,135,0.1)", background: "none" }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-float" style={{ background: "radial-gradient(circle, #00ff87 0%, transparent 70%)", top: "-100px", left: "-100px", animationDelay: "0s" }} />
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-15 animate-float" style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)", bottom: "-50px", right: "-50px", animationDelay: "3s" }} />
          <div className="absolute w-[300px] h-[300px] rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #00ff87 0%, transparent 70%)", top: "50%", left: "50%", animationDelay: "1.5s" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,255,135,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-spin-slow" style={{ border: "1px solid rgba(0,255,135,0.08)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-slide-up" style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.3)" }}>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium" style={{ color: "#00ff87" }}>Принимаем проекты</span>
          </div>

          <h1 className="font-black leading-none mb-6 animate-slide-up delay-200" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: "0.95" }}>
            <span className="block text-white">ДЕЛАЕМ</span>
            <span className="block gradient-text">БИЗНЕС</span>
            <span className="block text-white">ВИДИМЫМ</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-slide-up delay-300" style={{ color: "rgba(240,244,255,0.6)", lineHeight: "1.7" }}>
            Агентство полного цикла: создаём дизайн, разрабатываем продукты и выстраиваем маркетинг, который приносит реальные результаты.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-400">
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #00ff87, #00cc6a)", color: "#080c14", boxShadow: "0 0 40px rgba(0,255,135,0.3)" }}
            >
              Начать проект →
            </button>
            <button
              onClick={() => scrollTo("portfolio")}
              className="px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#f0f4ff" }}
            >
              Смотреть работы
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-up delay-500">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-black text-4xl md:text-5xl gradient-text" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.num}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(240,244,255,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2" style={{ border: "2px solid rgba(0,255,135,0.4)" }}>
            <div className="w-1.5 h-3 rounded-full animate-pulse" style={{ background: "#00ff87" }} />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-6 overflow-hidden" style={{ background: "rgba(0,255,135,0.05)", borderTop: "1px solid rgba(0,255,135,0.1)", borderBottom: "1px solid rgba(0,255,135,0.1)" }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-8 text-2xl font-black uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif", color: i % 2 === 0 ? "#00ff87" : "rgba(240,244,255,0.25)" }}>
              {item} <span style={{ color: "rgba(0,255,135,0.3)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 observe-me">
            <div className="text-sm font-semibold mb-3 neon-text tracking-widest uppercase">Что мы делаем</div>
            <h2 className="font-black text-4xl md:text-6xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
              НАШИ <span className="gradient-text">УСЛУГИ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="glass-card service-card rounded-2xl p-8 observe-me cursor-pointer" style={{ border: "1px solid rgba(0,255,135,0.1)" }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, rgba(0,255,135,0.15), rgba(0,102,255,0.15))", border: "1px solid rgba(0,255,135,0.25)" }}>
                  <Icon name={s.icon} size={24} style={{ color: "#00ff87" }} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(240,244,255,0.55)" }}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-lg neon-text">{s.price}</span>
                  <Icon name="ArrowUpRight" size={20} style={{ color: "rgba(0,255,135,0.5)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-24 px-6" style={{ background: "rgba(13,20,33,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 observe-me">
            <div className="text-sm font-semibold mb-3 neon-text tracking-widest uppercase">Наши работы</div>
            <h2 className="font-black text-4xl md:text-6xl" style={{ fontFamily: "'Oswald', sans-serif" }}>ПОРТФОЛИО</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <div key={i} className="portfolio-card glass-card rounded-2xl overflow-hidden observe-me" style={{ border: "1px solid rgba(0,255,135,0.1)" }}>
                <div className="relative overflow-hidden" style={{ height: "260px" }}>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className="portfolio-overlay absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,255,135,0.12)", backdropFilter: "blur(4px)" }}>
                    <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(0,255,135,0.9)" }}>
                      <Icon name="ArrowUpRight" size={24} style={{ color: "#080c14" }} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,255,135,0.9)", color: "#080c14" }}>
                    {p.tag}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium mb-2" style={{ color: "rgba(0,255,135,0.7)" }}>{p.category}</div>
                  <h3 className="font-bold text-lg text-white">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 observe-me">
            <button className="px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105" style={{ border: "1px solid rgba(0,255,135,0.4)", color: "#00ff87", background: "transparent" }}>
              Смотреть все работы →
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="observe-me">
              <div className="text-sm font-semibold mb-3 neon-text tracking-widest uppercase">О нас</div>
              <h2 className="font-black text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                МЫ ДЕЛАЕМ<br /><span className="gradient-text">БОЛЬШЕ, ЧЕМ</span><br />КРАСИВЫЕ САЙТЫ
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>
                APEX Studio — это команда из 30+ специалистов: дизайнеров, разработчиков, маркетологов и стратегов. Мы работаем с бизнесами от стартапов до корпораций, создавая цифровые продукты, которые меняют рынки.
              </p>
              <p className="mb-8 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>
                За 8 лет мы запустили более 340 проектов в 15 странах. Наш подход — глубокое погружение в бизнес клиента и создание решений, которые работают на результат, а не на красоту ради красоты.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Awwwards Winner", "CSS Design Awards", "Behance 2024", "Рейтинг Рунета TOP-10"].map((award, i) => (
                  <span key={i} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.2)", color: "#00ff87" }}>
                    {award}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative observe-me">
              <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,135,0.2)" }}>
                <img src={PORTFOLIO_IMG_2} alt="Команда" className="w-full object-cover" style={{ height: "450px" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,12,20,0.7) 0%, transparent 60%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card rounded-xl p-4" style={{ border: "1px solid rgba(0,255,135,0.2)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(0,255,135,0.2)" }}>
                        <Icon name="Users" size={18} style={{ color: "#00ff87" }} />
                      </div>
                      <div>
                        <div className="font-bold text-white">30+ специалистов</div>
                        <div className="text-sm" style={{ color: "rgba(240,244,255,0.5)" }}>в нашей команде</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-50 animate-pulse-glow" style={{ background: "radial-gradient(circle, rgba(0,255,135,0.4), transparent)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 px-6" style={{ background: "rgba(13,20,33,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 observe-me">
            <div className="text-sm font-semibold mb-3 neon-text tracking-widest uppercase">Как мы работаем</div>
            <h2 className="font-black text-4xl md:text-6xl" style={{ fontFamily: "'Oswald', sans-serif" }}>
              ПРОЦЕСС <span className="gradient-text">РАБОТЫ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {process.map((p, i) => (
              <div key={i} className="process-step glass-card rounded-2xl p-8 flex gap-6 items-start observe-me" style={{ border: "1px solid rgba(0,255,135,0.1)" }}>
                <div className="flex-shrink-0 font-black text-5xl leading-none" style={{ fontFamily: "'Oswald', sans-serif", color: "rgba(0,255,135,0.15)" }}>
                  {p.num}
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-white">{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(240,244,255,0.55)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 observe-me">
            <div className="text-sm font-semibold mb-3 neon-text tracking-widest uppercase">Клиенты о нас</div>
            <h2 className="font-black text-4xl md:text-6xl" style={{ fontFamily: "'Oswald', sans-serif" }}>ОТЗЫВЫ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="glass-card service-card rounded-2xl p-8 observe-me" style={{ border: "1px solid rgba(0,255,135,0.1)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(240,244,255,0.7)" }}>«{r.text}»</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: "linear-gradient(135deg, #00ff87, #0066ff)", color: "#080c14" }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{r.name}</div>
                    <div className="text-xs" style={{ color: "rgba(240,244,255,0.4)" }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="relative py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,255,135,0.08) 0%, rgba(0,102,255,0.08) 100%)", borderTop: "1px solid rgba(0,255,135,0.15)", borderBottom: "1px solid rgba(0,255,135,0.15)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,255,135,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-4xl mx-auto text-center observe-me">
          <h2 className="font-black text-4xl md:text-6xl mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
            ГОТОВЫ ЗАПУСТИТЬ<br /><span className="gradient-text">ВАШ ПРОЕКТ?</span>
          </h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(240,244,255,0.6)" }}>Расскажите о задаче — ответим в течение часа и предложим решение</p>
          <button
            onClick={() => scrollTo("contact")}
            className="px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #00ff87, #00cc6a)", color: "#080c14", boxShadow: "0 0 60px rgba(0,255,135,0.3)" }}
          >
            Оставить заявку →
          </button>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6" style={{ background: "rgba(13,20,33,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="observe-me">
              <div className="text-sm font-semibold mb-3 neon-text tracking-widest uppercase">Связаться</div>
              <h2 className="font-black text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                НАЧНЁМ<br /><span className="gradient-text">РАБОТАТЬ</span><br />ВМЕСТЕ
              </h2>
              <p className="mb-10 leading-relaxed" style={{ color: "rgba(240,244,255,0.6)" }}>
                Заполните форму — наш менеджер свяжется с вами в течение одного рабочего часа. Первая консультация бесплатна.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "Mail", label: "Email", val: "hello@apex-studio.ru" },
                  { icon: "Phone", label: "Телефон", val: "+7 (495) 000-00-00" },
                  { icon: "MapPin", label: "Офис", val: "Москва, Пресненская наб., 6" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.2)" }}>
                      <Icon name={c.icon} size={20} style={{ color: "#00ff87" }} />
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: "rgba(240,244,255,0.4)" }}>{c.label}</div>
                      <div className="font-semibold text-white">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="observe-me">
              <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(0,255,135,0.15)" }}>
                {formSent ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow" style={{ background: "rgba(0,255,135,0.2)", border: "2px solid #00ff87" }}>
                      <Icon name="Check" size={36} style={{ color: "#00ff87" }} />
                    </div>
                    <h3 className="font-bold text-2xl text-white mb-3">Заявка отправлена!</h3>
                    <p style={{ color: "rgba(240,244,255,0.6)" }}>Свяжемся с вами в течение часа</p>
                    <button onClick={() => setFormSent(false)} className="mt-6 text-sm underline" style={{ color: "rgba(0,255,135,0.7)", background: "none", border: "none" }}>
                      Отправить ещё
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-bold text-xl text-white mb-6">Заявка на проект</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs mb-2 font-medium" style={{ color: "rgba(240,244,255,0.5)" }}>Ваше имя *</label>
                        <input
                          required
                          className="form-input w-full px-4 py-3 rounded-xl text-sm"
                          placeholder="Иван Иванов"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs mb-2 font-medium" style={{ color: "rgba(240,244,255,0.5)" }}>Телефон *</label>
                        <input
                          required
                          className="form-input w-full px-4 py-3 rounded-xl text-sm"
                          placeholder="+7 (___) ___-__-__"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs mb-2 font-medium" style={{ color: "rgba(240,244,255,0.5)" }}>Email *</label>
                      <input
                        required
                        type="email"
                        className="form-input w-full px-4 py-3 rounded-xl text-sm"
                        placeholder="ivan@company.ru"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs mb-2 font-medium" style={{ color: "rgba(240,244,255,0.5)" }}>Услуга</label>
                      <select
                        className="form-input w-full px-4 py-3 rounded-xl text-sm"
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option value="" style={{ background: "#0d1421" }}>Выберите услугу</option>
                        {services.map((s, i) => (
                          <option key={i} value={s.title} style={{ background: "#0d1421" }}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs mb-2 font-medium" style={{ color: "rgba(240,244,255,0.5)" }}>Описание проекта *</label>
                      <textarea
                        required
                        rows={4}
                        className="form-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                        placeholder="Расскажите о вашем проекте, целях и ожиданиях..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #00ff87, #00cc6a)", color: "#080c14", boxShadow: "0 0 30px rgba(0,255,135,0.25)" }}
                    >
                      Отправить заявку →
                    </button>

                    <p className="text-xs text-center" style={{ color: "rgba(240,244,255,0.3)" }}>
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(0,255,135,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00ff87, #0066ff)" }}>
              <span className="text-black font-black text-xs">A</span>
            </div>
            <span className="font-black tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
              APEX<span className="neon-text">.</span>
            </span>
          </div>
          <p className="text-sm" style={{ color: "rgba(240,244,255,0.3)" }}>© 2026 APEX Studio. Все права защищены.</p>
          <div className="flex gap-3">
            {[
              { icon: "Instagram", label: "Instagram" },
              { icon: "Linkedin", label: "LinkedIn" },
              { icon: "Send", label: "Telegram" },
            ].map((s, i) => (
              <button key={i} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(0,255,135,0.1)", border: "1px solid rgba(0,255,135,0.2)" }}>
                <Icon name={s.icon} size={16} style={{ color: "#00ff87" }} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;