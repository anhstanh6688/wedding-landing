import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Music2,
  Navigation,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import heroImage from "../assets/wedding-hero.jpg";
import galleryA from "../assets/wedding-gallery-a.jpg";
import galleryB from "../assets/wedding-gallery-b.jpg";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FloatingHearts } from "../components/FloatingHearts";
import { weddingMusic } from "../utils/weddingMusic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thảo & Cường — Thiệp mời ngày chung đôi" },
      { name: "description", content: "Trân trọng mời bạn đến chung vui trong ngày trọng đại của Thảo và Cường tại Bắc Ninh." },
      { property: "og:title", content: "Thảo & Cường — Thiệp mời ngày chung đôi" },
      { property: "og:description", content: "18-19.11.2026 · Bắc Ninh — Hẹn gặp bạn trong ngày hạnh phúc của chúng mình." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeddingInvitation,
});

/* ─── Centralized Information ─── */
const weddingDate = new Date("2026-11-18T17:00:00+07:00");
const coupleNames = "Thảo & Cường";
const weddingLocation = "Bắc Ninh, Việt Nam";
const weddingMapUrl = "https://maps.app.goo.gl/k6D24VcJQhmcqKWG7";

const photoCrops = [
  { src: galleryA, position: "left-top", alt: "Thảo và Cường cười bên nhau dưới tán cây" },
  { src: galleryA, position: "right-top", alt: "Khoảnh khắc gần gũi của Thảo và Cường" },
  { src: galleryA, position: "left-bottom", alt: "Thảo và Cường dạo bước trong vườn" },
  { src: galleryA, position: "right-bottom", alt: "Chân dung cưới của Thảo và Cường" },
  { src: galleryB, position: "left-top", alt: "Đôi nhẫn cưới trên tay cô dâu chú rể" },
  { src: galleryB, position: "right-top", alt: "Cô dâu cùng bó hoa hồng" },
  { src: galleryB, position: "left-bottom", alt: "Chú rể chuẩn bị cho ngày cưới" },
  { src: galleryB, position: "right-bottom", alt: "Điệu nhảy của Thảo và Cường lúc hoàng hôn" },
];

/* ─── Countdown ─── */
function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const values = useMemo(() => {
    const distance = Math.max(0, weddingDate.getTime() - now);
    return [
      [Math.floor(distance / 86400000), "Ngày"],
      [Math.floor((distance / 3600000) % 24), "Giờ"],
      [Math.floor((distance / 60000) % 60), "Phút"],
      [Math.floor((distance / 1000) % 60), "Giây"],
    ] as const;
  }, [now]);

  const countdownRef = useScrollReveal(0.3);

  return (
    <div ref={countdownRef} className="grid grid-cols-4 gap-2 sm:gap-8">
      {values.map(([value, label], i) => (
        <div key={label} className={`scroll-reveal reveal-up delay-${i + 1} text-center`}>
          <span className="countdown-value block font-serif text-3xl text-foreground sm:text-5xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── CropPhoto ─── */
function CropPhoto({ index, className = "" }: { index: number; className?: string }) {
  const photo = photoCrops[index];
  if (!photo) return null;
  const position = {
    "left-top": "left-0 top-0",
    "right-top": "right-0 top-0",
    "left-bottom": "bottom-0 left-0",
    "right-bottom": "bottom-0 right-0",
  }[photo.position];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        width={1600}
        height={1600}
        className={`absolute h-[200%] w-[200%] max-w-none object-cover ${position}`}
      />
    </div>
  );
}

/* ─── Ornament divider ─── */
function OrnamentDivider() {
  return (
    <div className="ornament-line mx-auto max-w-xs py-2">
      <Heart size={14} fill="currentColor" strokeWidth={0} className="heart-beat" />
    </div>
  );
}

interface WishItem {
  id: string;
  name: string;
  attending: boolean;
  message: string;
  time: string;
  likes: number;
}

const defaultWishes: WishItem[] = [
  {
    id: "w1",
    name: "Gia đình Bác Hải",
    attending: true,
    message: "Chúc hai cháu trăm năm hạnh phúc, tình cảm sắt son, cùng nhau xây dựng tổ ấm ngập tràn tiếng cười!",
    time: "Hôm nay",
    likes: 12,
  },
  {
    id: "w2",
    name: "Nhóm Bạn Đại Học",
    attending: true,
    message: "Chúc mừng Thảo & Cường! Chúc đôi bạn trẻ luôn yêu thương, gắn bó và hạnh phúc viên mãn trọn đời.",
    time: "Hôm qua",
    likes: 8,
  },
  {
    id: "w3",
    name: "Em Linh & Tuấn",
    attending: true,
    message: "Chúc anh chị một hành trình hôn nhân ngập tràn hạnh phúc và may mắn! Hẹn gặp anh chị ở Bắc Ninh!",
    time: "2 ngày trước",
    likes: 5,
  },
];

/* ─── URL Guest Name Parser Hook ─── */
function useGuestName(): string | null {
  const [guestName, setGuestName] = useState<string | null>(null);

  useEffect(() => {
    const parseName = () => {
      try {
        // 1. Check query parameters (?to=... or ?guest=... or ?u=...)
        const params = new URLSearchParams(window.location.search);
        const queryVal =
          params.get("to") ||
          params.get("u") ||
          params.get("guest") ||
          params.get("name") ||
          params.get("khach");
        if (queryVal && queryVal.trim()) {
          setGuestName(queryVal.trim());
          return;
        }

        // 2. Check hash (#Việt Anh or #to=Việt Anh)
        const rawHash = window.location.hash;
        if (rawHash && rawHash.length > 1) {
          const decoded = decodeURIComponent(rawHash.slice(1)).trim();

          // Prefixes like #to=... or #guest=...
          if (decoded.toLowerCase().startsWith("to=")) {
            setGuestName(decoded.slice(3).replace(/\+/g, " ").trim());
            return;
          }
          if (decoded.toLowerCase().startsWith("guest=")) {
            setGuestName(decoded.slice(6).replace(/\+/g, " ").trim());
            return;
          }

          // Exclude internal anchor navigation IDs
          const sectionIds = ["rsvp", "story", "timeline", "schedule", "gallery", "top", "countdown"];
          if (!sectionIds.includes(decoded.toLowerCase())) {
            setGuestName(decoded.replace(/\+/g, " ").trim());
            return;
          }
        }

        setGuestName(null);
      } catch {
        setGuestName(null);
      }
    };

    parseName();
    window.addEventListener("hashchange", parseName);
    window.addEventListener("popstate", parseName);
    return () => {
      window.removeEventListener("hashchange", parseName);
      window.removeEventListener("popstate", parseName);
    };
  }, []);

  return guestName;
}

/* ─── Main Component ─── */
function WeddingInvitation() {
  const guestName = useGuestName();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [wishes, setWishes] = useState<WishItem[]>(defaultWishes);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("thao_cuong_wedding_wishes");
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLikeWish = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setWishes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = ((formData.get("name") as string) || "").trim() || "Khách quý";
    const attending = (formData.get("attending") as string) === "yes";
    const message = ((formData.get("message") as string) || "").trim();

    if (message) {
      const newWish: WishItem = {
        id: `wish-${Date.now()}`,
        name,
        attending,
        message,
        time: "Vừa xong",
        likes: 1,
      };
      const updated = [newWish, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem("thao_cuong_wedding_wishes", JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
    setSent(true);
  };

  // Autoplay music upon entry and on first user interaction
  useEffect(() => {
    let started = false;

    const playAudio = async () => {
      if (started) return;
      if (weddingMusic) {
        const ok = await weddingMusic.start();
        if (ok) {
          started = true;
          setMusicOn(true);
          cleanupEvents();
        }
      }
    };

    const cleanupEvents = () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("touchstart", playAudio);
      window.removeEventListener("scroll", playAudio);
      window.removeEventListener("keydown", playAudio);
    };

    // Attempt direct autoplay
    playAudio();

    // Trigger as soon as user touches screen, scrolls, or clicks anywhere
    window.addEventListener("click", playAudio, { passive: true });
    window.addEventListener("touchstart", playAudio, { passive: true });
    window.addEventListener("scroll", playAudio, { passive: true });
    window.addEventListener("keydown", playAudio, { passive: true });

    return () => {
      cleanupEvents();
    };
  }, []);

  const toggleMusic = async () => {
    if (weddingMusic) {
      const active = await weddingMusic.toggle();
      setMusicOn(active);
    } else {
      setMusicOn((v) => !v);
    }
  };

  // Scroll reveal refs for each section
  const heroRef = useScrollReveal(0.1);
  const storyRef = useScrollReveal(0.1);
  const timelineRef = useScrollReveal(0.1);
  const scheduleRef = useScrollReveal(0.1);
  const galleryRef = useScrollReveal(0.05);
  const rsvpRef = useScrollReveal(0.1);
  const footerRef = useScrollReveal(0.2);

  // Parallax for hero image
  const heroImgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const handleScroll = () => {
      if (heroImgRef.current) {
        const y = window.scrollY;
        heroImgRef.current.style.transform = `translateY(${y * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_10%_5%,var(--rose),transparent_26%),radial-gradient(circle_at_92%_22%,var(--sage),transparent_25%),radial-gradient(circle_at_30%_72%,var(--glass-strong),transparent_26%)]" />

      {/* Floating hearts */}
      <FloatingHearts />

      {/* Music toggle */}
      <button
        type="button"
        aria-label={musicOn ? "Tắt nhạc" : "Bật nhạc"}
        title={musicOn ? "Tắt nhạc" : "Bật nhạc"}
        onClick={toggleMusic}
        className="music-btn fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full border border-border bg-glass-strong text-foreground shadow-lg backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
      >
        <Music2 size={18} className={`m-auto ${musicOn ? "text-primary" : "text-muted-foreground"}`} />
      </button>

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative z-10 mx-auto min-h-[94vh] max-w-7xl px-5 pb-14 pt-6 sm:px-8 lg:px-12">
        <header className="fade-up flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Về đầu trang">
            <span className="grid size-11 place-items-center rounded-full border border-border bg-glass font-serif text-xl italic text-primary backdrop-blur-xl pulse-glow">
              T
            </span>
            <span>
              <span className="block font-serif text-xl leading-none">{coupleNames}</span>
              <span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                Wedding invitation
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-xs text-muted-foreground md:flex">
            <a href="#story" className="transition-colors hover:text-foreground">Câu chuyện</a>
            <a href="#timeline" className="transition-colors hover:text-foreground">Hành trình</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Lịch trình</a>
            <a href="#gallery" className="transition-colors hover:text-foreground">Khoảnh khắc</a>
            <a href="#rsvp" className="transition-colors hover:text-foreground">RSVP</a>
          </nav>
          <a href="#rsvp" className="rounded-full border border-border bg-glass px-4 py-2 text-xs font-medium text-primary backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 sm:text-sm">
            Xác nhận tham dự
          </a>
        </header>

        <div ref={heroRef} id="top" className="grid min-h-[78vh] items-center gap-8 py-8 sm:gap-10 sm:py-10 lg:grid-cols-[1.05fr_.95fr] lg:py-12">
          {/* Text side */}
          <div className="scroll-reveal reveal-left order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <span className="text-[10px] uppercase tracking-[0.38em] text-primary sm:text-xs">
                Trân trọng kính mời
              </span>
              {guestName && (
                <span className="inline-flex items-center rounded-full border border-primary/35 bg-glass-strong px-4 py-1 font-serif text-xl italic font-medium text-primary shadow-sm backdrop-blur-md sm:text-2xl lg:text-3xl">
                  {guestName}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-serif text-5xl leading-[.88] sm:mt-5 sm:text-7xl lg:text-8xl">
              Ngày chúng ta<br />
              <em className="font-normal text-primary">cùng nhau</em>
            </h1>
            <p className="mt-5 max-w-lg text-sm font-light leading-7 text-muted-foreground sm:mt-6 sm:text-base">
              Trong niềm vui hạnh phúc, chúng mình trân trọng mời bạn đến chung vui và lưu giữ
              những kỷ niệm đẹp trong ngày trọng đại.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
              <a
                href="#rsvp"
                className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 sm:px-6"
              >
                Xác nhận tham dự
              </a>
              <a
                href="#schedule"
                className="rounded-full border border-border bg-glass px-5 py-3 text-sm font-medium backdrop-blur-xl transition-colors hover:bg-glass-strong sm:px-6"
              >
                Xem lịch trình
              </a>
            </div>
            <div className="hero-info-strip mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:mt-9 sm:gap-6">
              <div>
                <b className="block font-serif text-2xl font-medium text-foreground">18-19</b>
                Tháng 11, 2026
              </div>
              <span className="h-8 w-px bg-foreground/15" />
              <div>
                <b className="block font-serif text-2xl font-medium text-foreground">17:00</b>
                Thứ tư — Thứ năm
              </div>
              <span className="h-8 w-px bg-foreground/15" />
              <div>
                <b className="block font-serif text-2xl font-medium text-foreground">Bắc Ninh</b>
                Việt Nam
              </div>
            </div>
          </div>

          {/* Photo side */}
          <div ref={heroImgRef} className="scroll-reveal reveal-right order-1 mx-auto w-full max-w-sm sm:max-w-md lg:order-2">
            <div className="photo-frame relative rounded-[1.75rem] p-2 sm:p-2.5">
              <img
                src={heroImage}
                alt="Ảnh cưới của Thảo và Cường"
                width={1200}
                height={1600}
                fetchPriority="high"
                className="aspect-[4/5] w-full rounded-[1.3rem] object-cover"
              />
              <div className="absolute -bottom-4 -left-2 rounded-2xl border border-border bg-glass-strong px-4 py-2.5 backdrop-blur-xl sm:-bottom-5 sm:-left-7 sm:px-5 sm:py-3">
                <p className="text-[9px] uppercase tracking-[.25em] text-muted-foreground">
                  Chúng mình
                </p>
                <p className="font-serif text-xl sm:text-2xl">{coupleNames}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-center text-center">
          <a
            href="#story"
            aria-label="Xem tiếp"
            className="flex flex-col items-center justify-center gap-2 text-center text-[9px] uppercase tracking-[.25em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Cuộn để mở thiệp</span>
            <ChevronDown size={16} className="drift" />
          </a>
        </div>
      </section>

      {/* ═══════ COUNTDOWN ═══════ */}
      <section className="relative z-10 border-y border-border bg-glass py-12 backdrop-blur-xl sm:py-20">
        <div className="mx-auto max-w-4xl px-5">
          <p className="mb-5 text-center text-[10px] uppercase tracking-[.32em] text-primary sm:mb-7">
            Đếm ngược đến ngày chung đôi
          </p>
          <Countdown />
          <div className="mt-6 sm:mt-8">
            <OrnamentDivider />
          </div>
        </div>
      </section>

      {/* ═══════ STORY SECTION ═══════ */}
      <section
        ref={storyRef}
        id="story"
        className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:gap-10 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28"
      >
        <div className="scroll-reveal reveal-left relative mx-auto w-full max-w-sm pb-10 pr-8 sm:max-w-md">
          <CropPhoto index={0} className="aspect-[4/5] rounded-lg" />
          <CropPhoto
            index={1}
            className="absolute bottom-0 right-0 aspect-[4/5] w-2/5 rounded-lg border-4 border-background shadow-2xl"
          />
        </div>
        <div className="scroll-reveal reveal-right">
          <p className="text-[10px] uppercase tracking-[.35em] text-primary">
            Câu chuyện của chúng mình
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-none sm:text-5xl lg:text-6xl">
            Từ một lời chào<br />
            đến <em className="font-normal text-primary">một đời bên nhau</em>
          </h2>
          <p className="mt-6 max-w-lg text-sm font-light leading-7 text-muted-foreground sm:mt-7 sm:text-base">
            Chúng mình gặp nhau vào một ngày rất bình thường, rồi dần biến những ngày bình thường
            ấy thành ký ức đáng nhớ nhất. Sau những mùa cùng sẻ chia, chúng mình đã sẵn sàng viết
            tiếp một chương mới.
          </p>
          <div className="mt-7 border-l border-primary/35 pl-5 sm:mt-8 sm:pl-6">
            <p className="font-serif text-xl italic sm:text-2xl">
              "Tình yêu không làm thế giới quay tròn. Tình yêu làm cho chuyến đi ấy trở nên đáng giá."
            </p>
            <p className="mt-3 text-xs uppercase tracking-[.2em] text-muted-foreground">
              {coupleNames}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ TIMELINE / LOVE STORY ═══════ */}
      <section ref={timelineRef} id="timeline" className="relative z-10 mx-auto max-w-4xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="scroll-reveal reveal-up mx-auto mb-10 max-w-lg text-center sm:mb-14">
          <OrnamentDivider />
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Hành trình yêu thương</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Những dấu mốc đáng nhớ trên chặng đường tình yêu
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent md:block" />
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:hidden" />

          {[
            { year: "2022", title: "Lần đầu gặp gỡ", desc: "Một cuộc gặp gỡ tình cờ tại quán cà phê quen thuộc đã mở ra câu chuyện của chúng mình." },
            { year: "2023", title: "Bên nhau mỗi ngày", desc: "Cùng nhau chia sẻ những niềm vui nhỏ, những chuyến đi ngắn, dần trở thành một phần không thể thiếu." },
            { year: "2025", title: "Lời cầu hôn", desc: "Dưới bầu trời sao, một câu hỏi giản dị nhưng chứa đựng cả tấm chân tình: 'Em đồng ý chứ?'" },
            { year: "2026", title: "Ngày trọng đại", desc: "Chúng mình chính thức bước vào hành trình mới — cùng nhau xây dựng tổ ấm yêu thương." },
          ].map((item, i) => (
            <div
              key={item.year}
              className={`scroll-reveal reveal-up delay-${Math.min(i + 1, 3)} relative mb-10 flex items-start gap-6 sm:mb-14 md:items-center ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-5 top-1 z-10 grid size-3 -translate-x-1/2 place-items-center rounded-full bg-primary md:left-1/2 md:top-1/2 md:size-4 md:-translate-y-1/2">
                <span className="size-1.5 rounded-full bg-primary-foreground md:size-2" />
              </div>

              <div className="hidden md:block md:w-1/2" />

              <div className={`ml-10 flex-1 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}>
                <div className="glass-panel rounded-2xl p-5 transition-transform hover:-translate-y-1 sm:p-6">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 font-serif text-sm text-primary">
                    {item.year}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl">{item.title}</h3>
                  <p className="mt-2 text-sm font-light leading-6 text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SCHEDULE ═══════ */}
      <section
        ref={scheduleRef}
        id="schedule"
        className="relative z-10 border-y border-border bg-glass py-16 backdrop-blur-xl sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="scroll-reveal reveal-up text-center">
            <p className="text-[10px] uppercase tracking-[.35em] text-primary">Ngày trọng đại</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl">Hẹn bạn tại đây</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              Thứ tư — Thứ năm, ngày 18-19 tháng 11 năm 2026 · {weddingLocation}
            </p>
          </div>

          <div className="schedule-cards mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
            {[
              ["17:00", "Đón khách", "Gặp gỡ, chụp ảnh và cùng nhau lưu lại những khoảnh khắc đầu tiên."],
              ["18:30", "Lễ thành hôn", "Chứng kiến nghi thức trao nhẫn và lời hứa của chúng mình."],
              ["19:00", "Tiệc mừng", "Thưởng thức bữa tối, âm nhạc và những câu chuyện thân tình."],
            ].map(([time, title, text], index) => (
              <article
                key={title}
                className={`scroll-reveal reveal-up delay-${index + 1} glass-panel rounded-2xl p-6 transition-transform hover:-translate-y-1 sm:p-7 ${
                  index === 1 ? "md:-translate-y-3" : ""
                }`}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 font-serif text-2xl italic text-primary">
                  {index + 1}
                </span>
                <p className="mt-5 flex items-center gap-2 text-xs text-primary sm:mt-6">
                  <Clock3 size={14} />
                  {time}
                </p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl">{title}</h3>
                <p className="mt-3 text-sm font-light leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-border pt-7 sm:mt-10 sm:flex-row sm:gap-6 sm:pt-8">
            <div className="text-center sm:text-left">
              <p className="font-serif text-xl sm:text-2xl">{weddingLocation}</p>
              <p className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
                <MapPin size={15} />
                {weddingLocation}
              </p>
            </div>
            <a
              href={weddingMapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95"
            >
              <Navigation size={16} />
              Mở chỉ đường
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY ═══════ */}
      <section
        ref={galleryRef}
        id="gallery"
        className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28"
      >
        <div className="scroll-reveal reveal-up mb-8 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end sm:gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-[.35em] text-primary">Album ảnh</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl">
              Những khoảnh khắc<br />
              <em className="font-normal text-primary">mình có nhau</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Ảnh hiện tại là bộ ảnh mẫu đồng nhất. Toàn bộ có thể thay nhanh bằng ảnh cưới thật
            của hai bạn sau này.
          </p>
        </div>

        <div className="gallery-grid grid auto-rows-[140px] grid-cols-2 gap-2 sm:auto-rows-[250px] sm:gap-3 md:grid-cols-4">
          {photoCrops.map((photo, index) => (
            <button
              key={photo.alt}
              type="button"
              aria-label={`Mở ảnh: ${photo.alt}`}
              onClick={() => setLightbox(index)}
              className={`scroll-reveal reveal-scale delay-${Math.min((index % 4) + 1, 4)} group relative overflow-hidden rounded-lg ${
                index === 0 || index === 7 ? "row-span-2" : ""
              } ${index === 3 || index === 4 ? "md:col-span-2" : ""}`}
            >
              <CropPhoto
                index={index}
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/50 to-transparent px-3 pb-3 pt-10 text-left text-[10px] uppercase tracking-[.2em] text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:px-4">
                Xem ảnh
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══════ RSVP ═══════ */}
      <section
        ref={rsvpRef}
        id="rsvp"
        className="relative z-10 border-y border-border bg-glass py-16 backdrop-blur-xl sm:py-24"
      >
        <div className="rsvp-grid mx-auto grid max-w-5xl gap-8 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="scroll-reveal reveal-left">
            <Heart className="text-primary heart-beat" size={26} strokeWidth={1.5} />
            <p className="mt-4 text-[10px] uppercase tracking-[.35em] text-primary sm:mt-5">
              Lời hồi đáp
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-none sm:mt-4 sm:text-5xl lg:text-6xl">
              Bạn sẽ đến<br />chung vui chứ?
            </h2>
            <p className="mt-4 max-w-md text-sm font-light leading-7 text-muted-foreground sm:mt-5">
              Sự hiện diện của bạn là món quà ý nghĩa nhất. Vui lòng xác nhận trước ngày 01.11.2026
              để chúng mình đón tiếp thật chu đáo.
            </p>
          </div>

          <div className="scroll-reveal reveal-right glass-panel rounded-2xl p-5 sm:p-8">
            {sent ? (
              <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground pulse-glow">
                  <Check />
                </span>
                <h3 className="mt-5 font-serif text-2xl sm:text-3xl">Đã nhận lời hồi đáp</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cảm ơn bạn. Lời chúc của bạn đã được hiển thị trong sổ lưu bút bên dưới!
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Chỉnh sửa phản hồi
                </button>
              </div>
            ) : (
              <form onSubmit={submitRsvp} className="space-y-4 sm:space-y-5">
                <label className="block">
                  <span className="text-xs font-medium">Họ và tên</span>
                  <input
                    required
                    name="name"
                    defaultValue={guestName || ""}
                    key={guestName || "default-guest"}
                    placeholder="Tên của bạn"
                    className="mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                  />
                </label>
                <fieldset>
                  <legend className="text-xs font-medium">Bạn có thể tham dự?</legend>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <label className="cursor-pointer rounded-lg border border-border bg-input p-3 text-sm transition-colors hover:bg-glass-strong">
                      <input
                        required
                        type="radio"
                        name="attending"
                        value="yes"
                        className="mr-2 accent-primary"
                      />
                      Mình sẽ đến
                    </label>
                    <label className="cursor-pointer rounded-lg border border-border bg-input p-3 text-sm transition-colors hover:bg-glass-strong">
                      <input
                        required
                        type="radio"
                        name="attending"
                        value="no"
                        className="mr-2 accent-primary"
                      />
                      Xin phép vắng
                    </label>
                  </div>
                </fieldset>
                <label className="block">
                  <span className="text-xs font-medium">Số khách tham dự</span>
                  <select
                    name="guests"
                    className="mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option>1 khách</option>
                    <option>2 khách</option>
                    <option>3 khách</option>
                    <option>4 khách</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-medium">Lời nhắn dành cho chúng mình</span>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Gửi một lời chúc nhỏ..."
                    className="mt-2 w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  Gửi lời xác nhận
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ─── Lời chúc từ khách quý ─── */}
        <div className="mx-auto mt-14 max-w-5xl border-t border-border/60 pt-10 sm:mt-18 sm:pt-14">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary">Sổ lưu bút</p>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl">Lời chúc từ người thương</h3>
            <p className="mx-auto mt-2 max-w-md text-xs font-light text-muted-foreground sm:text-sm">
              Những lời chúc ngọt ngào và lời hồi đáp gửi gắm đến Thảo & Cường
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishes.map((wish) => (
              <article
                key={wish.id}
                className="glass-panel flex flex-col justify-between rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-8 place-items-center rounded-full bg-primary/10 font-serif text-sm font-medium text-primary">
                        {wish.name.charAt(0).toUpperCase()}
                      </span>
                      <div>
                        <h4 className="font-serif text-base leading-tight text-foreground sm:text-lg">
                          {wish.name}
                        </h4>
                        <span className="text-[10px] text-muted-foreground">{wish.time}</span>
                      </div>
                    </div>
                    {wish.attending && (
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                        Sẽ đến
                      </span>
                    )}
                  </div>

                  <p className="mt-4 font-serif text-sm italic leading-relaxed text-foreground/85 sm:text-base">
                    "{wish.message}"
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-end border-t border-border/40 pt-3">
                  <button
                    type="button"
                    onClick={() => handleLikeWish(wish.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                    aria-label="Thả tim lời chúc"
                  >
                    <Heart
                      size={13}
                      fill={likedMap[wish.id] ? "currentColor" : "none"}
                      className={likedMap[wish.id] ? "text-primary" : ""}
                    />
                    <span>{wish.likes}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer ref={footerRef} className="relative z-10 px-5 py-16 text-center sm:py-20">
        <div className="scroll-reveal reveal-up">
          <CalendarDays className="mx-auto text-primary" size={24} strokeWidth={1.5} />
          <p className="footer-text mt-5 font-serif text-3xl italic sm:mt-6 sm:text-4xl">
            Hẹn gặp bạn trong ngày chúng mình cùng nhau.
          </p>
          <OrnamentDivider />
          <p className="mt-4 text-[10px] uppercase tracking-[.3em] text-muted-foreground sm:mt-5">
            {coupleNames} · 18-19.11.2026 · Bắc Ninh
          </p>
        </div>
      </footer>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh cưới"
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Đóng ảnh"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-background/15 text-primary-foreground transition-colors hover:bg-background/30 sm:right-5 sm:top-5"
            onClick={() => setLightbox(null)}
          >
            <X />
          </button>
          <CropPhoto
            index={lightbox}
            className="aspect-square w-full max-w-[90vw] rounded-lg sm:max-w-3xl"
          />
        </div>
      )}
    </main>
  );
}