import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HOUSES = [
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/69021e68-670b-4e9e-b23f-29dc2b9d4113.jpg",
    title: "Шале 6х8",
    area: "48 м²",
    price: "от 996 000 ₽",
    oldPrice: null,
    tag: null,
    desc: "Возможны иные размеры. Каркасный дом с открытой верандой.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/4013a940-dad2-4eb1-8d15-de0539785d73.jpg",
    title: "Шале 6х6",
    area: "36 м²",
    price: "от 790 000 ₽",
    oldPrice: "970 000 ₽",
    tag: "%",
    desc: "Возможны иные размеры. Уютный дом в скандинавском стиле.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/4180846d-3d0c-4f6a-9770-3cc8f41a7205.jpg",
    title: "Дом 8х8м",
    area: "64 м²",
    price: "от 1 101 000 ₽",
    oldPrice: null,
    tag: null,
    desc: "Возможны иные размеры. Просторный семейный дом.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/6e0ae0eb-a489-4c69-b87f-ae0b155a2a2d.jpg",
    title: "Дом Дачный 5х6м",
    area: "30 м²",
    price: "от 496 000 ₽",
    oldPrice: null,
    tag: null,
    desc: "Возможны иные размеры. Бюджетный дачный домик.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/a327a87f-13f2-47d3-aade-aaa8f2c14944.jpg",
    title: "Дом 8х10м",
    area: "80 м²",
    price: "от 1 450 000 ₽",
    oldPrice: null,
    tag: "Новинка",
    desc: "Двухэтажный дом с балконом. Большие окна.",
  },
  {
    img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/e32c9813-fdfe-4bd6-93bf-8926d889d58f.jpg",
    title: "Баня 4х6м",
    area: "24 м²",
    price: "от 380 000 ₽",
    oldPrice: null,
    tag: null,
    desc: "Классическая русская баня. Под ключ.",
  },
];

const WHY = [
  { icon: "ShieldCheck", title: "Гарантия 5 лет", desc: "Даём официальную гарантию на все конструктивные элементы дома" },
  { icon: "Wallet", title: "Фиксированная цена", desc: "Стоимость в договоре не меняется. Никаких доп. расходов в процессе" },
  { icon: "Clock", title: "Срок от 45 дней", desc: "Строим быстро, без задержек. Чёткие сроки зафиксированы в договоре" },
  { icon: "Truck", title: "Доставка по России", desc: "Работаем по всей России. Доставляем материалы и команду к вам" },
  { icon: "FileText", title: "Договор и смета", desc: "Полный пакет документов: договор, смета, технический паспорт" },
  { icon: "Home", title: "Под ключ", desc: "Сдаём готовый дом: фундамент, стены, кровля, отделка, коммуникации" },
];

const PROCESS = [
  { num: "01", title: "Заявка и консультация", desc: "Оставляете заявку — менеджер перезванивает в течение 15 минут, отвечает на все вопросы." },
  { num: "02", title: "Выбор проекта", desc: "Подбираем проект под ваш участок и бюджет. Возможна доработка под ваши пожелания." },
  { num: "03", title: "Договор и смета", desc: "Заключаем договор с фиксированной стоимостью. Никаких скрытых платежей." },
  { num: "04", title: "Строительство", desc: "Наша бригада приступает к работе. Присылаем фотоотчёт каждую неделю." },
  { num: "05", title: "Сдача объекта", desc: "Принимаете готовый дом, подписываем акт приёма-передачи. Даём гарантию." },
];

const REVIEWS = [
  {
    name: "Андрей К.",
    city: "Самара",
    text: "Заказали шале 6х8 — построили за 55 дней. Всё чётко по договору, никаких доп. расходов. Качество отличное, соседи уже спрашивают контакты.",
    stars: 5,
  },
  {
    name: "Ольга М.",
    city: "Казань",
    text: "Давно мечтала о своей даче. СК Дача №1 сделали проект под наш участок, всё объяснили, держали в курсе. Очень довольна результатом!",
    stars: 5,
  },
  {
    name: "Василий П.",
    city: "Уфа",
    text: "Брали дом 8х8. Стройка заняла 60 дней. Фотоотчёты присылали каждую неделю — было приятно видеть прогресс. Рекомендую всем!",
    stars: 5,
  },
];

const STATS = [
  { num: "500+", label: "домов построено" },
  { num: "5", label: "лет на рынке" },
  { num: "45", label: "дней от начала до сдачи" },
  { num: "100%", label: "клиентов довольны" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phone, setPhone] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", comment: "" });
  const [orderSent, setOrderSent] = useState(false);
  const [activeHouse, setActiveHouse] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");

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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
  };

  return (
    <div style={{ background: "#fff", color: "#1a1a1a", fontFamily: "'Golos Text', sans-serif" }} className="min-h-screen overflow-x-hidden">

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "0 1px 0 #eee",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 shrink-0" style={{ background: "none", border: "none" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#f5a623" }}>
              <Icon name="Home" size={18} style={{ color: "#fff" }} />
            </div>
            <div className="leading-tight">
              <div className="font-black text-base" style={{ color: "#f5a623", fontFamily: "'Oswald', sans-serif" }}>СК ДАЧА №1</div>
              <div className="text-xs" style={{ color: "#888" }}>строим дома</div>
            </div>
          </button>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {[["Каталог", "catalog"], ["О компании", "about"], ["Процесс", "process"], ["Отзывы", "reviews"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-sm font-medium transition-colors hover:text-orange-500" style={{ background: "none", border: "none", color: "#444" }}>
                {label}
              </button>
            ))}
          </div>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79273401893" className="flex items-center gap-2 text-sm font-bold" style={{ color: "#1a1a1a", textDecoration: "none" }}>
              <Icon name="Phone" size={16} style={{ color: "#f5a623" }} />
              +7 927-340-18-93
            </a>
            <button
              onClick={() => scrollTo("order")}
              className="px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: "#f5a623" }}
            >
              Оставить заявку
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ background: "none", border: "none" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} style={{ color: "#1a1a1a" }} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-3" style={{ borderColor: "#eee", background: "#fff" }}>
            {[["Каталог", "catalog"], ["О компании", "about"], ["Процесс", "process"], ["Отзывы", "reviews"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left py-2 font-medium text-sm" style={{ background: "none", border: "none", color: "#444" }}>
                {label}
              </button>
            ))}
            <a href="tel:+79273401893" className="flex items-center gap-2 font-bold py-2" style={{ color: "#1a1a1a", textDecoration: "none" }}>
              <Icon name="Phone" size={16} style={{ color: "#f5a623" }} />
              +7 927-340-18-93
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center" style={{ background: "linear-gradient(135deg, #1a2a1a 0%, #2d4a2d 50%, #1a3a2a 100%)", paddingTop: "80px" }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-sm font-semibold" style={{ background: "rgba(245,166,35,0.2)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.4)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#f5a623" }} />
              Строим в вашем городе
            </div>

            <h1 className="font-black mb-4 text-white" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1 }}>
              КУПИТЕ ДОМ<br />
              <span style={{ color: "#f5a623" }}>СВОЕЙ МЕЧТЫ</span>
            </h1>

            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              Строим каркасные дома, шале и дачи под ключ. Более 500 объектов по всей России. Фиксированная цена в договоре — без сюрпризов.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => scrollTo("catalog")}
                className="px-7 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 text-white"
                style={{ background: "#f5a623", boxShadow: "0 8px 30px rgba(245,166,35,0.4)" }}
              >
                Смотреть каталог
              </button>
              <a
                href="tel:+79273401893"
                className="px-7 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 flex items-center gap-2"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", textDecoration: "none" }}
              >
                <Icon name="Phone" size={18} />
                Позвонить
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <div className="font-black text-2xl" style={{ color: "#f5a623", fontFamily: "'Oswald', sans-serif" }}>{s.num}</div>
                  <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — quick form */}
          <div className="rounded-2xl p-8" style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            {formSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(245,166,35,0.15)" }}>
                  <Icon name="CheckCircle" size={36} style={{ color: "#f5a623" }} />
                </div>
                <h3 className="font-bold text-xl mb-2">Заявка принята!</h3>
                <p style={{ color: "#888" }}>Перезвоним в течение 15 минут</p>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-xl mb-1" style={{ color: "#1a1a1a" }}>Подбор каркасного дома</h3>
                <p className="text-sm mb-6" style={{ color: "#888" }}>Оставьте заявку — поможем выбрать проект прямо сейчас!</p>
                <form onSubmit={handleQuickSubmit} className="space-y-3">
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-3.5 rounded-xl text-sm border outline-none transition-all"
                    placeholder="Номер телефона"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{ borderColor: "#e5e5e5", color: "#1a1a1a" }}
                    onFocus={e => (e.target.style.borderColor = "#f5a623")}
                    onBlur={e => (e.target.style.borderColor = "#e5e5e5")}
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-base text-white transition-all hover:scale-105"
                    style={{ background: "#f5a623" }}
                  >
                    Оставить заявку
                  </button>
                </form>
                <p className="text-xs text-center mt-3" style={{ color: "#bbb" }}>Нажимая, вы соглашаетесь с политикой конфиденциальности</p>

                {/* Trust */}
                <div className="mt-6 pt-6 border-t flex items-center justify-center gap-6" style={{ borderColor: "#f0f0f0" }}>
                  {[
                    { icon: "Shield", text: "Гарантия 5 лет" },
                    { icon: "Clock", text: "Ответ за 15 мин" },
                    { icon: "Banknote", text: "Без предоплаты" },
                  ].map((t, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 text-center">
                      <Icon name={t.icon} size={20} style={{ color: "#f5a623" }} />
                      <span className="text-xs" style={{ color: "#888" }}>{t.text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} style={{ color: "rgba(255,255,255,0.4)" }} />
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-4" style={{ background: "#f9f7f4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: "#f5a623" }}>Почему выбирают нас</div>
            <h2 className="font-black text-3xl md:text-5xl" style={{ fontFamily: "'Oswald', sans-serif" }}>6 ПРИЧИН РАБОТАТЬ С НАМИ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY.map((w, i) => (
              <div key={i} className="reveal bg-white rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(245,166,35,0.12)" }}>
                  <Icon name={w.icon} size={22} style={{ color: "#f5a623" }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 reveal">
            <div>
              <div className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: "#f5a623" }}>Наши проекты</div>
              <h2 className="font-black text-3xl md:text-5xl" style={{ fontFamily: "'Oswald', sans-serif" }}>КАТАЛОГ ДОМОВ</h2>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: filter === f ? "#f5a623" : "#f5f5f5",
                    color: filter === f ? "#fff" : "#555",
                    border: "none",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHouses.map((h, i) => (
              <div
                key={i}
                className="reveal rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0" }}
                onClick={() => setActiveHouse(i)}
              >
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <img src={h.img} alt={h.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  {h.tag && (
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white" style={{ background: "#f5a623" }}>
                      {h.tag}
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
                    <span className="text-white font-bold text-sm">{h.area}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{h.title} {h.area}</h3>
                  <p className="text-xs mb-3" style={{ color: "#999" }}>{h.desc}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-black text-xl" style={{ color: "#f5a623" }}>{h.price}</span>
                    {h.oldPrice && <span className="text-sm line-through" style={{ color: "#bbb" }}>{h.oldPrice}</span>}
                  </div>
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "#f5a623" }}
                    onClick={e => { e.stopPropagation(); scrollTo("order"); }}
                  >
                    Заказать проект
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <p className="text-sm mb-4" style={{ color: "#888" }}>Не нашли подходящий проект? Разработаем индивидуально под ваш участок и бюджет</p>
            <button onClick={() => scrollTo("order")} className="px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ border: "2px solid #f5a623", color: "#f5a623", background: "transparent" }}>
              Обсудить индивидуальный проект →
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-4" style={{ background: "#f9f7f4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: "#f5a623" }}>О компании</div>
              <h2 className="font-black text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
                СК ДАЧА №1 —<br />СТРОИМ С ДУШОЙ
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
                Мы строим каркасные дома, шале, дачи и бани уже более 5 лет. За это время возвели свыше 500 объектов по всей России — от Самары до Сибири.
              </p>
              <p className="mb-6 leading-relaxed" style={{ color: "#555" }}>
                Наш принцип: фиксированная цена в договоре, чёткие сроки и полная прозрачность на каждом этапе стройки. Каждую неделю присылаем фотоотчёт прямо на телефон.
              </p>
              <div className="space-y-3">
                {[
                  "Собственное производство и бригады строителей",
                  "Работаем по официальному договору",
                  "Фотоотчёт каждую неделю строительства",
                  "Гарантия 5 лет на все конструктивные элементы",
                  "Принимаем материнский капитал и ипотеку",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#f5a623" }}>
                      <Icon name="Check" size={12} style={{ color: "#fff" }} />
                    </div>
                    <span className="text-sm" style={{ color: "#444" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal grid grid-cols-2 gap-4">
              {[
                { img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/69021e68-670b-4e9e-b23f-29dc2b9d4113.jpg", span: false },
                { img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/4013a940-dad2-4eb1-8d15-de0539785d73.jpg", span: false },
                { img: "https://cdn.poehali.dev/projects/a273b61b-da5b-41c4-b25b-cbd1f6d77188/files/4180846d-3d0c-4f6a-9770-3cc8f41a7205.jpg", span: true },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden ${item.span ? "col-span-2" : ""}`} style={{ height: item.span ? "180px" : "160px" }}>
                  <img src={item.img} alt="дом" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: "#f5a623" }}>Как мы работаем</div>
            <h2 className="font-black text-3xl md:text-5xl" style={{ fontFamily: "'Oswald', sans-serif" }}>ПРОЦЕСС СТРОИТЕЛЬСТВА</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block" style={{ background: "linear-gradient(to bottom, #f5a623, rgba(245,166,35,0.1))" }} />
            <div className="space-y-6">
              {PROCESS.map((p, i) => (
                <div key={i} className="reveal flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-black text-lg relative z-10" style={{ background: "#f5a623", color: "#fff", fontFamily: "'Oswald', sans-serif" }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 rounded-2xl p-6 transition-all hover:-translate-x-1" style={{ background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
                    <div className="font-black text-xs mb-1" style={{ color: "#f5a623", fontFamily: "'Oswald', sans-serif" }}>ШАГ {p.num}</div>
                    <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-20 px-4" style={{ background: "#f9f7f4" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: "#f5a623" }}>Клиенты о нас</div>
            <h2 className="font-black text-3xl md:text-5xl" style={{ fontFamily: "'Oswald', sans-serif" }}>ОТЗЫВЫ ВЛАДЕЛЬЦЕВ</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="reveal bg-white rounded-2xl p-6 transition-all hover:-translate-y-1" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0" }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} style={{ color: "#f5a623", fontSize: "18px" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#444" }}>«{r.text}»</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "#f5a623" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{r.name}</div>
                    <div className="text-xs" style={{ color: "#999" }}>{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="py-16 px-4 text-white text-center" style={{ background: "linear-gradient(135deg, #2d4a2d, #1a2a1a)" }}>
        <div className="max-w-3xl mx-auto reveal">
          <h2 className="font-black text-3xl md:text-5xl mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
            ПОЛУЧИТЕ БЕСПЛАТНЫЙ РАСЧЁТ СТОИМОСТИ
          </h2>
          <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
            Укажите желаемую площадь и регион — пришлём смету в течение 1 часа
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("order")}
              className="px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105"
              style={{ background: "#f5a623", boxShadow: "0 8px 30px rgba(245,166,35,0.4)" }}
            >
              Получить расчёт бесплатно
            </button>
            <a
              href="tel:+79273401893"
              className="px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", textDecoration: "none" }}
            >
              <Icon name="Phone" size={20} />
              +7 927-340-18-93
            </a>
          </div>
        </div>
      </div>

      {/* ── ORDER FORM ── */}
      <section id="order" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 reveal">
            <div className="text-sm font-bold mb-2 uppercase tracking-widest" style={{ color: "#f5a623" }}>Заявка</div>
            <h2 className="font-black text-3xl md:text-5xl" style={{ fontFamily: "'Oswald', sans-serif" }}>ОСТАВИТЬ ЗАЯВКУ</h2>
            <p className="mt-3" style={{ color: "#777" }}>Перезвоним в течение 15 минут. Первая консультация бесплатно.</p>
          </div>

          <div className="rounded-2xl p-8 md:p-12 reveal" style={{ background: "#fff", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", border: "1px solid #f0f0f0" }}>
            {orderSent ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(245,166,35,0.12)" }}>
                  <Icon name="CheckCircle" size={42} style={{ color: "#f5a623" }} />
                </div>
                <h3 className="font-bold text-2xl mb-2">Заявка отправлена!</h3>
                <p style={{ color: "#888" }}>Перезвоним вам в течение 15 минут</p>
                <button onClick={() => setOrderSent(false)} className="mt-6 text-sm underline" style={{ color: "#f5a623", background: "none", border: "none" }}>
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#444" }}>Ваше имя *</label>
                    <input
                      required
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                      placeholder="Иван Иванов"
                      value={orderForm.name}
                      onChange={e => setOrderForm({ ...orderForm, name: e.target.value })}
                      style={{ borderColor: "#e5e5e5", color: "#1a1a1a" }}
                      onFocus={e => (e.target.style.borderColor = "#f5a623")}
                      onBlur={e => (e.target.style.borderColor = "#e5e5e5")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#444" }}>Телефон *</label>
                    <input
                      required
                      type="tel"
                      className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all"
                      placeholder="+7 (___) ___-__-__"
                      value={orderForm.phone}
                      onChange={e => setOrderForm({ ...orderForm, phone: e.target.value })}
                      style={{ borderColor: "#e5e5e5", color: "#1a1a1a" }}
                      onFocus={e => (e.target.style.borderColor = "#f5a623")}
                      onBlur={e => (e.target.style.borderColor = "#e5e5e5")}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#444" }}>Комментарий (необязательно)</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl border text-sm outline-none resize-none transition-all"
                    placeholder="Опишите желаемый проект: площадь, регион, бюджет, особые пожелания..."
                    value={orderForm.comment}
                    onChange={e => setOrderForm({ ...orderForm, comment: e.target.value })}
                    style={{ borderColor: "#e5e5e5", color: "#1a1a1a" }}
                    onFocus={e => (e.target.style.borderColor = "#f5a623")}
                    onBlur={e => (e.target.style.borderColor = "#e5e5e5")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105"
                  style={{ background: "#f5a623", boxShadow: "0 8px 30px rgba(245,166,35,0.3)" }}
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-center mt-3" style={{ color: "#bbb" }}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-4" style={{ background: "#1a2a1a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f5a623" }}>
                  <Icon name="Home" size={16} style={{ color: "#fff" }} />
                </div>
                <span className="font-black text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>СК ДАЧА №1</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Строим каркасные дома, шале и дачи под ключ по всей России. Более 500 объектов за 5 лет.
              </p>
            </div>
            <div>
              <div className="font-bold text-white mb-3">Навигация</div>
              <div className="space-y-2">
                {[["Каталог", "catalog"], ["О компании", "about"], ["Процесс", "process"], ["Отзывы", "reviews"], ["Оставить заявку", "order"]].map(([label, id]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block text-sm transition-colors hover:text-orange-400" style={{ color: "rgba(255,255,255,0.55)", background: "none", border: "none" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold text-white mb-3">Контакты</div>
              <div className="space-y-3">
                <a href="tel:+79273401893" className="flex items-center gap-2 text-sm transition-colors hover:text-orange-400" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  <Icon name="Phone" size={16} style={{ color: "#f5a623" }} />
                  +7 927-340-18-93
                </a>
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Icon name="Clock" size={16} style={{ color: "#f5a623" }} />
                  Пн–Вс: 8:00 – 20:00
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Icon name="MapPin" size={16} style={{ color: "#f5a623" }} />
                  Работаем по всей России
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>© 2026 СК ДАЧА №1. Все права защищены.</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Политика конфиденциальности</p>
          </div>
        </div>
      </footer>

      {/* House modal */}
      {activeHouse !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} onClick={() => setActiveHouse(null)}>
          <div className="rounded-2xl overflow-hidden max-w-lg w-full" style={{ background: "#fff", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }} onClick={e => e.stopPropagation()}>
            <div className="relative" style={{ height: "280px" }}>
              <img src={HOUSES[activeHouse].img} alt={HOUSES[activeHouse].title} className="w-full h-full object-cover" />
              <button onClick={() => setActiveHouse(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
                <Icon name="X" size={18} style={{ color: "#fff" }} />
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-1">{HOUSES[activeHouse].title} {HOUSES[activeHouse].area}</h3>
              <p className="text-sm mb-4" style={{ color: "#888" }}>{HOUSES[activeHouse].desc}</p>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-black text-2xl" style={{ color: "#f5a623" }}>{HOUSES[activeHouse].price}</span>
                {HOUSES[activeHouse].oldPrice && <span className="line-through" style={{ color: "#bbb" }}>{HOUSES[activeHouse].oldPrice}</span>}
              </div>
              <button onClick={() => { setActiveHouse(null); scrollTo("order"); }} className="w-full py-3.5 rounded-xl font-bold text-white" style={{ background: "#f5a623" }}>
                Заказать этот проект
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
};

export default Index;
