"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";


/* ═══════════════════════════════════════════
   ANIMATED COUNTER for stats
   ═══════════════════════════════════════════ */
function AnimatedCounter({ value, suffix, isVisible: externalIsVisible }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const isVisible = externalIsVisible !== undefined ? externalIsVisible : inView;
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(numericValue / 60));
    const interval = duration / (numericValue / step);
    
    const timer = setInterval(() => {
      start += step;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  const displayValue = value.includes('k') ? `${(count / 1000).toFixed(count >= numericValue ? 0 : 0)}k` : count.toLocaleString();

  return (
    <span ref={ref}>{isVisible ? (value === "10000" ? `${Math.floor(count / 1000)}k` : count) : "0"}{suffix}</span>
  );
}
import {
  buildCatalogProducts,
  CATALOG_STORAGE_KEY,
  defaultCatalog,
} from "./catalog-data";

const PHONE_DISPLAY = "+91 94481 36418";
const PHONE_RAW = "919448136418";
const WHATSAPP_BASE = `https://wa.me/${PHONE_RAW}`;
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Kushi+Agro+Foods+Raichur+Industrial+Area";


const stats = [
  { label: "Years Experience", value: "40", suffix: "+" },
  { label: "Customers Delivered", value: "10", suffix: "k+" },
  { label: "Premium Varieties", value: "25", suffix: "+" },
  { label: "Purity Guarantee", value: "100", suffix: "%" },
];

const philosophy = {
  quote: "Quality is not an act, it is a habit. At Kushi Agro, we don't just sell rice; we deliver trust in every grain.",
  author: "Founder, Kushi Agro Foods",
};

const testimonials = [
  { name: "Lakshmi R.", role: "Home Maker", text: "The best quality rice we've had in years. The aroma and texture of Royal Bullet is unbeatable! Truly premium quality." },
  { name: "Anand S.", role: "Restaurant Owner", text: "Kushi Agro has been our trusted supplier for our restaurant for over a decade. Consistent quality every single time." },
  { name: "Venkatesh K.", role: "Wholesale Buyer", text: "Exceptional service and timely delivery. Their Sortex cleaning makes a huge difference in the final product." },
];

function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      onAnimationComplete={() => {
        document.body.style.overflow = "auto";
      }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#130f0a] text-white"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0.2 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-[15%] h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D7B06B] to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0.2 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[15%] left-0 h-px w-full origin-right bg-gradient-to-r from-transparent via-[#D7B06B] to-transparent"
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/95 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] max-w-[280px]"
        >
          <img
            src="/main-group.jpeg"
            alt="Vande Matharam Group logo"
            className="w-full h-auto object-contain"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 18, letterSpacing: "0.55em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-[11px] uppercase tracking-[0.32em] text-[#D7B06B]"
        >
          Premium Rice Since 1984
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-normal leading-none md:text-8xl"
          style={{ fontFamily: "Instrument Serif, serif" }}
        >
          Kushi Agro Foods
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base"
        >
          Trusted rice manufacturing, premium sourcing, and direct supply support for homes, retail counters, and wholesale buyers.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-40 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
      </div>
    </motion.div>
  );
}

function PrivacyModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-6 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl bg-white rounded-[2.5rem] p-10 overflow-y-auto max-h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-3xl font-serif text-[#1D160E] mb-6">Privacy Policy</h2>
            <div className="space-y-4 text-sm text-[#5F5548] leading-relaxed">
              <p>At Kushi Agro Foods, we value your privacy. We only collect information necessary to process your orders and improve our services.</p>
              <h3 className="font-bold text-[#1D160E]">Information Collection</h3>
              <p>We collect your name, phone number, and address when you place an order via WhatsApp or phone.</p>
              <h3 className="font-bold text-[#1D160E]">Data Usage</h3>
              <p>Your data is used solely for order fulfillment and communication regarding your inquiries.</p>
              <p>We do not sell or share your personal information with third parties for marketing purposes.</p>
            </div>
            <button
              onClick={onClose}
              className="mt-8 w-full rounded-full bg-[#1D160E] py-4 text-white font-medium"
            >
              I Understand
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function createWhatsAppUrl(items) {
  const title = "*OFFICIAL ORDER INQUIRY*";
  const brand = "*Kushi Agro Foods*";
  const greeting = "Hello, I would like to inquire about the following products:";
  
  const productLines =
    items.length > 0
      ? items.map((item) => {
          return `• *${item.name}*\n  Qty: ${item.quantity} | Pack: ${item.pack}`;
        }).join("\n\n")
      : "• Please share your complete rice catalog and current stock availability.";
      
  const footer = "Please share the price, stock status, and delivery details.\n\nThank you!";

  const fullMessage = `${title}\n${brand}\n\n${greeting}\n\n${productLines}\n\n${footer}`;

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(fullMessage)}`;
}

function BrandCarousel3D({ brand, visibleProducts, setSelectedProduct, setActiveImageIndex, addToCart, createWhatsAppUrl, PHONE_RAW }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  const totalProducts = visibleProducts.length;

  // Auto-play
  useEffect(() => {
    if (totalProducts <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProducts);
    }, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [totalProducts]);

  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProducts);
    }, 5000);
  };

  const goTo = (index) => {
    setActiveIndex(index);
    resetAutoPlay();
  };

  const goNext = () => goTo((activeIndex + 1) % totalProducts);
  const goPrev = () => goTo((activeIndex - 1 + totalProducts) % totalProducts);

  // Calculate 3D position for each card
  const getCardStyle = (index) => {
    let diff = index - activeIndex;
    if (diff > totalProducts / 2) diff -= totalProducts;
    if (diff < -totalProducts / 2) diff += totalProducts;

    const isActive = diff === 0;
    const absDistance = Math.abs(diff);
    
    const translateX = diff * 350;
    const translateZ = isActive ? 120 : -(absDistance * 180);
    const rotateY = diff * -20; // Reduced rotation for better readability
    const scale = isActive ? 1.05 : Math.max(0.7, 1 - absDistance * 0.15);
    const opacity = absDistance > 1.5 ? 0 : Math.max(0.4, 1 - absDistance * 0.4);
    const zIndex = 10 - absDistance;

    return { translateX, translateZ, rotateY, scale, opacity, zIndex, isActive };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full"
    >
      {/* Brand Header */}
      <div className="flex items-baseline gap-6 mb-12 px-4">
        <h4 className="text-4xl md:text-5xl text-[#1D160E] whitespace-nowrap" style={{ fontFamily: "Instrument Serif, serif" }}>
          {brand}
        </h4>
        <div className="h-px flex-1 bg-[#E3D2B5] opacity-20" />
      </div>

      {/* 3D Slider */}
      <div className="slider-3d-container relative h-[480px] md:h-[600px] w-full flex items-center justify-center overflow-visible">
        <div className="slider-3d-track relative flex items-center justify-center w-full h-full" style={{ perspective: "1500px" }}>
          {visibleProducts.map((product, index) => {
            const style = getCardStyle(index);
            
            return (
              <motion.article
                key={product.id}
                className={`slider-3d-card absolute ${style.isActive ? 'active' : ''}`}
                style={{
                  width: "min(360px, 90vw)",
                  transformStyle: "preserve-3d",
                  zIndex: Math.round(style.zIndex * 10),
                  pointerEvents: style.isActive ? "auto" : "none",
                }}
                animate={{
                  x: style.translateX,
                  z: style.translateZ,
                  rotateY: style.rotateY,
                  scale: style.scale,
                  opacity: style.opacity,
                  transition: { 
                    type: "spring",
                    stiffness: 45, // Softer spring for luxury feel
                    damping: 18,
                    mass: 0.8
                  }
                }}
                onClick={() => style.isActive && setSelectedProduct(product)}
              >
                <div className="relative h-[400px] md:h-[480px] w-full rounded-[2.5rem] md:rounded-[3.5rem] bg-white p-6 md:p-10 shadow-[0_40px_100px_rgba(29,22,14,0.1)] overflow-hidden border border-[#E3D2B5]/50 transition-all duration-700 hover:shadow-[0_50px_120px_rgba(29,22,14,0.15)] flex flex-col justify-between">
                  {/* Subtle glass sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="relative h-44 md:h-60 w-full flex items-center justify-center mb-4 md:mb-6 mt-2">
                    <motion.img
                      src={product.coverImage}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain drop-shadow-2xl"
                      animate={style.isActive ? { 
                        y: [0, -12, 0],
                      } : { y: 0 }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  </div>

                  <div className="text-center relative z-10">
                    <p className="text-[9px] uppercase tracking-[0.5em] text-[#D7B06B] font-bold mb-2 md:mb-3">
                      {product.brand}
                    </p>
                    <h4 className="text-2xl md:text-3xl font-normal text-[#1D160E] leading-tight mb-2" style={{ fontFamily: "Instrument Serif, serif" }}>
                      {product.name}
                    </h4>
                    {product.variant && (
                      <p className="text-xs md:text-sm italic text-[#8C6A3A]/70 mb-4 md:mb-6">{product.variant}</p>
                    )}
                    <p className="text-[10px] md:text-xs font-bold text-[#8C6A3A] mb-2 bg-[#FBF8F2] py-2 px-4 rounded-full inline-block">
                      {product.pack} Pack
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Slider Progress & Navigation */}
      <div className="mx-auto max-w-xs mt-10 space-y-8">
        <div className="slider-progress w-full">
          <div 
            className="slider-progress-fill" 
            style={{ width: `${((activeIndex + 1) / totalProducts) * 100}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between gap-6 px-4">
          <button onClick={goPrev} className="slider-nav-btn text-[#1D160E] hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex items-center gap-3">
            {visibleProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIndex === i ? "w-8 bg-[#1D160E]" : "w-1.5 bg-[#D9C8A7]"
                }`}
              />
            ))}
          </div>

          <button onClick={goNext} className="slider-nav-btn text-[#1D160E] hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [productScrollIndex, setProductScrollIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(() => buildCatalogProducts(defaultCatalog));
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const availableBrands = [
    "All Brands",
    "Vandematharam",
    "VM Bullet",
    "VM",
    "Happy Special",
    "Zanda",
    "Golden Chilli",
    "Small Boss"
  ];
  
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.brand]) acc[product.brand] = [];
    acc[product.brand].push(product);
    return acc;
  }, {});
  const videoRef = useRef(null);
  const productCarouselRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const detailCarouselRef = useRef(null);

  useEffect(() => {
    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2000); // Optimized preloader timing
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Force fresh data from defaultCatalog
    setProducts(buildCatalogProducts(defaultCatalog));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId;
    const fadeDuration = 0.5;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (!duration || isNaN(duration)) {
        setVideoOpacity(1);
        return;
      }

      if (currentTime < fadeDuration) {
        setVideoOpacity(currentTime / fadeDuration);
      } else if (currentTime > duration - fadeDuration) {
        setVideoOpacity(Math.max(0, (duration - currentTime) / fadeDuration));
      } else {
        setVideoOpacity(1);
      }
    };

    const animate = () => {
      handleTimeUpdate();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleEnded = async () => {
      setVideoOpacity(0);
      await new Promise((resolve) => setTimeout(resolve, 100));
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", handleEnded);
    animate();

    return () => {
      video.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToProduct = (index) => {
    const container = productCarouselRef.current;
    const target = container?.children?.[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setProductScrollIndex(index);
  };

  const scrollToProductImage = (index) => {
    const container = detailCarouselRef.current;
    const target = container?.children?.[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActiveImageIndex(index);
  };

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          pack: product.pack,
          quantity: 1,
          image: product.coverImage,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const whatsappCartUrl = createWhatsAppUrl(cartItems);
  const productWhatsAppUrl = selectedProduct
    ? createWhatsAppUrl([
        {
          name: selectedProduct.name,
          quantity: 1,
          pack: selectedProduct.pack,
          image: selectedProduct.coverImage,
        },
      ])
    : WHATSAPP_BASE;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F6F1E8] text-[#1D160E]">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <div
        className="fixed inset-0 z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          poster="/premium-rice.png"
          className="h-full w-full object-cover"
          style={{ opacity: videoOpacity }}
          onError={() => setVideoOpacity(1)}
        >
          <source
            src="https://raw.createusercontent.com/63ab3e94-c35b-4564-a8fd-8aea6badd0f8/"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 mx-auto flex items-center justify-between px-6 transition-all duration-500 lg:px-8 ${
        isScrolled 
          ? "bg-white/90 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl border-b border-[#E3D2B5]/30" 
          : "bg-transparent py-6"
      }`}>
        <div className="flex items-center gap-4">
          <div className={`overflow-hidden rounded-[1.35rem] border transition-all duration-500 p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-sm ${
            isScrolled ? "border-[#E3D2B5]/50 bg-white" : "border-white/15 bg-white/95"
          }`}>
            <img
              src="/nav-logo.jpeg"
              alt="Kushi Agro Foods logo"
              className={`${isScrolled ? "h-10" : "h-12"} w-auto md:h-16 transition-all duration-500`}
            />
          </div>
          <div className="hidden sm:block">
            <h1
              className={`text-4xl font-bold tracking-tight transition-all duration-500 md:text-6xl ${
                isScrolled ? "text-[#1D160E]" : "text-white"
              }`}
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Kushi Agro Foods
            </h1>
            <p className={`mt-1 text-[10px] uppercase tracking-[0.34em] transition-all duration-500 md:text-xs ${
              isScrolled ? "text-[#8C6A3A]" : "text-white/70"
            }`}>
              Premium Rice Since 1984
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${
              isScrolled ? "text-[#1D160E]" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`text-xs uppercase tracking-widest font-bold transition-colors ${
            isScrolled ? "text-[#1D160E] hover:text-[#8C6A3A]" : "text-white hover:text-[#D7B06B]"
          }`}>
            Home
          </a>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className={`text-xs uppercase tracking-widest font-bold transition-colors ${
            isScrolled ? "text-[#1D160E]/70 hover:text-[#1D160E]" : "text-white/80 hover:text-white"
          }`}>
            Products
          </a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={`text-xs uppercase tracking-widest font-bold transition-colors ${
            isScrolled ? "text-[#1D160E]/70 hover:text-[#1D160E]" : "text-white/80 hover:text-white"
          }`}>
            About
          </a>
          <a
            href={WHATSAPP_BASE}
            target="_blank"
            rel="noreferrer"
            className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-500 ${
              isScrolled 
                ? "border-[#1D160E] text-[#1D160E] hover:bg-[#1D160E] hover:text-white" 
                : "border-[#C9B089] text-white hover:bg-[#EADCC3] hover:text-[#1D160E]"
            }`}
          >
            WhatsApp
          </a>
          <a
            href={`tel:${PHONE_RAW}`}
            className={`rounded-full px-5 py-2.5 text-sm text-white transition-all duration-500 ${
              isScrolled ? "bg-[#8C6A3A] hover:bg-[#1D160E]" : "bg-[#1D160E] hover:bg-[#3A2E21]"
            }`}
          >
            Call Now
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-[#FFFDF9] pt-32 px-10 md:hidden"
          >
            <div className="flex flex-col gap-10">
              <a 
                href="#home" 
                onClick={(e) => {
                  handleNavClick(e, 'home');
                  setIsMobileMenuOpen(false);
                }} 
                className="text-4xl font-serif text-[#1D160E]"
              >
                Home
              </a>
              <a 
                href="#products" 
                onClick={(e) => {
                  handleNavClick(e, 'products');
                  setIsMobileMenuOpen(false);
                }} 
                className="text-4xl font-serif text-[#1D160E]"
              >
                Products
              </a>
              <a 
                href="#about" 
                onClick={(e) => {
                  handleNavClick(e, 'about');
                  setIsMobileMenuOpen(false);
                }} 
                className="text-4xl font-serif text-[#1D160E]"
              >
                About Us
              </a>
              <div className="h-px w-full bg-[#E3D2B5]" />
              <div className="flex flex-col gap-4">
                <a
                  href={WHATSAPP_BASE}
                  className="w-full rounded-full bg-[#1D160E] py-5 text-center text-white font-bold"
                >
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="w-full rounded-full border border-[#1D160E] py-5 text-center text-[#1D160E] font-bold"
                >
                  Call To Order
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="home"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-32 lg:pt-40"
      >
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl space-y-10 relative"
          >
            {/* Floating grain particles decoration */}
            <div className="absolute -top-20 -left-20 w-40 h-40 pointer-events-none hidden lg:block">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-3 rounded-full bg-[#D7B06B]/30"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: `${10 + i * 18}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 15, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="space-y-4">
              {/* Staggered text reveal */}
              <motion.p 
                initial={{ opacity: 0, y: 20, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-semibold uppercase tracking-[0.38em] text-[#D7B06B] md:text-sm"
              >
                Premium Rice Manufacturing
              </motion.p>
              
              <motion.h2
                initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 1.2, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl leading-none text-white md:text-7xl lg:text-8xl drop-shadow-lg"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Quality rice brands for homes, stores, and wholesale buyers.
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
                transition={{ duration: 1, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-2xl text-base leading-8 text-white/90 md:text-lg drop-shadow-md"
              >
                Trusted rice manufacturing, premium sourcing, and direct supply support for homes, retail counters, and wholesale buyers.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 sm:flex-row sm:justify-center"
            >
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, 'products')}
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-[#1D160E] px-14 py-6 text-sm font-bold text-white transition-all hover:bg-[#3A2E21] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] shimmer-overlay"
              >
                <span className="relative z-10">Browse Our Products</span>
                <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href={whatsappCartUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-center overflow-hidden rounded-full border-2 border-[#C9B089] bg-white/40 px-14 py-6 text-sm font-bold text-[#1D160E] backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-[0_20px_50px_rgba(201,176,137,0.15)]"
              >
                <span className="relative z-10">Order On WhatsApp</span>
                <div className="absolute inset-0 -translate-x-full bg-[#C9B089]/10 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
            </motion.div>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 1 }}
              className="flex flex-col items-center gap-3 pt-8"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5"
              >
                <div className="w-1 h-2 rounded-full bg-white/50" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="philosophy" className="relative z-10 bg-white px-6 py-32 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="absolute -left-20 top-1/2 -translate-y-1/2 hidden lg:block"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg) translateY(50%)' }}
              >
                <span className="text-[12rem] font-serif font-black text-[#F4E6C8]/20 select-none tracking-tighter whitespace-nowrap">
                  VANDE MATHARAM
                </span>
              </motion.div>
              
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-10 -top-10 text-[20rem] font-serif text-[#F4E6C8]/30 leading-none select-none"
              >
                &ldquo;
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-5xl md:text-7xl lg:text-8xl text-[#1D160E] leading-tight"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                {philosophy.quote}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 flex items-center gap-6"
              >
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="h-px w-20 bg-[#8C6A3A] origin-left" 
                />
                <p className="text-sm uppercase tracking-[0.4em] text-[#8C6A3A] font-bold">
                  {philosophy.author}
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotateY: -15, clipPath: "inset(20% 20% 20% 20%)" }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0, clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                rotateY: 10,
                rotateX: -5,
                scale: 1.02,
                transition: { duration: 0.5 }
              }}
              className="relative aspect-square md:aspect-auto overflow-hidden rounded-[2.5rem] p-[4px] bg-gradient-to-tr from-[#F28C28] via-[#FFD700] to-[#283890] shadow-[0_20px_60px_rgba(40,56,144,0.25)] flex items-center justify-center cursor-pointer"
              style={{ perspective: "1200px" }}
            >
              <div className="w-full h-full bg-white rounded-[2.3rem] flex items-center justify-center overflow-hidden">
                <img 
                  src="/main-group.jpeg" 
                  alt="Kushi Agro Main Group" 
                  loading="lazy"
                  className="w-full h-[600px] object-contain p-8"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#1D160E] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-16 gap-x-8 text-center lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: -2,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#D7B06B]">
                  {stat.label}
                </p>
                <p className="mt-4 text-6xl font-normal text-white md:text-7xl" style={{ fontFamily: "Instrument Serif, serif" }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="relative z-10 bg-[#FFFDF9] px-6 py-28 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#8C6A3A] font-bold">
                Our Collection
              </p>
              <h3
                className="mt-6 text-5xl text-[#1D160E] md:text-7xl lg:text-8xl leading-[1.1]"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Curated Selection of <br/> Premium Rice Brands
              </h3>
            </div>


            <div className="flex flex-wrap gap-3 mt-8 lg:mt-0">
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    selectedBrand === brand
                      ? "bg-[#1D160E] text-white shadow-[0_10px_25px_rgba(29,22,14,0.2)]"
                      : "bg-white text-[#1D160E] border border-[#E3D2B5] hover:bg-[#FBF8F2]"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="space-y-24">
            {(() => {
              const brandOrder = [
                "Vandematharam",
                "VM Bullet",
                "VM",
                "Happy Special",
                "Zanda",
                "Golden Chilli",
                "Small Boss"
              ];

              return brandOrder
                .filter(name => selectedBrand === "All Brands" || selectedBrand === name)
                .map((brandName) => {
                  const brandProducts = groupedProducts[brandName];
                  if (!brandProducts || brandProducts.length === 0) return null;

                  const sortedProducts = [...brandProducts].sort((a, b) => {
                    if (a.isLast) return 1;
                    if (b.isLast) return -1;
                    return 0;
                  });

                  const visibleProducts = sortedProducts.filter(
                    (p) => !cartItems.some((item) => item.id === p.id)
                  );

                  if (visibleProducts.length === 0) return null;

                  return (
                    <BrandCarousel3D
                      key={brandName}
                      brand={brandName}
                      visibleProducts={visibleProducts}
                      setSelectedProduct={setSelectedProduct}
                      setActiveImageIndex={setActiveImageIndex}
                      addToCart={addToCart}
                      createWhatsAppUrl={createWhatsAppUrl}
                      PHONE_RAW={PHONE_RAW}
                    />
                  );
                });
            })()}
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 bg-[#FBF8F2] px-6 py-20 lg:py-40 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-[#8C6A3A] font-bold">
                The Heritage Story
              </p>
              <h3
                className="mt-8 text-6xl text-[#1D160E] md:text-8xl leading-[1.05]"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Legacy Built on <br/> Trust Since 1984
              </h3>
              
              <div className="mt-12 space-y-8">
                <div className="space-y-6 text-lg leading-[1.8] text-[#5F5548]">
                  <p>
                    For over five decades, Kushi Agro Foods has been the cornerstone 
                    of premium rice supply in Raichur. Our journey began with a simple vision: 
                    to bring the finest grains from the fertile fields directly to your table.
                  </p>
                  <p>
                    Today, we serve over 10,000 happy families and institutional buyers across 
                    the country. Our state-of-the-art Sortex processing facility ensures that 
                    every grain meets the highest standards of purity and hygiene.
                  </p>
                </div>

                {/* Founder's Quote */}
                <div className="relative pl-12 border-l-2 border-[#D7B06B]/30 py-4 italic">
                  <p className="text-2xl text-[#1D160E] font-serif leading-relaxed">
                    "Quality is not an act, it is a habit. At Kushi Agro, we don't just sell rice; we deliver trust in every grain."
                  </p>
                  <p className="mt-4 text-sm uppercase tracking-widest text-[#8C6A3A] font-bold">
                    — Founder, Kushi Agro Foods
                  </p>
                </div>

                <div className="flex flex-wrap gap-12 pt-8">
                  <div className="flex flex-col">
                    <span className="text-5xl font-serif text-[#1D160E]">
                      <AnimatedCounter value="40" suffix="+" />
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#8C6A3A] mt-2">Years Experience</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-5xl font-serif text-[#1D160E]">
                      <AnimatedCounter value="50" suffix="k+" />
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#8C6A3A] mt-2">Customers Delivered</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-5xl font-serif text-[#1D160E]">
                      <AnimatedCounter value="100" suffix="%" />
                    </span>
                    <span className="text-xs uppercase tracking-widest text-[#8C6A3A] mt-2">Purity Guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.85, clipPath: "inset(30% 30% 30% 30%)" }}
                whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square md:aspect-[4/5] rounded-[4rem] p-[4px] bg-gradient-to-tr from-[#F28C28] via-[#FFD700] to-[#283890] shadow-[0_20px_60px_rgba(242,140,40,0.2)] group"
              >
                <div className="relative w-full h-full rounded-[3.8rem] overflow-hidden bg-[#1A1A1A]">
                  <img 
                    src="/paddy-to-rice.png" 
                    alt="From Paddy Fields to Premium Rice" 
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[3000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8 md:p-12 transition-colors duration-700 group-hover:bg-black/20">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    >
                      <p className="text-white text-3xl md:text-5xl font-serif italic mb-6 drop-shadow-2xl font-bold">
                        "From Fields to Table"
                      </p>
                      <div className="h-1 w-32 bg-[#FFD700] mx-auto shadow-lg rounded-full" />
                      <p className="mt-4 text-white text-sm font-bold uppercase tracking-[0.4em] drop-shadow-md">
                        Direct Factory Supply
                      </p>
                    </motion.div>
                  </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-white px-6 py-16 lg:py-28 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-[#8C6A3A] font-bold">
                Excellence & Recognition
              </p>
              <h3
                className="mt-6 text-5xl text-[#1D160E] md:text-7xl leading-tight"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Awarded for Outstanding <br/> Contribution at Karnataka Invest 2025
              </h3>
              <p className="mt-8 text-xl text-[#8C6A3A] font-medium italic">
                Part of the Vande Matharam Group — Since 1975
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 10, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                rotateY: 5,
                rotateX: -5,
                scale: 1.02,
                transition: { duration: 0.5 }
              }}
              className="mt-16 overflow-hidden rounded-[3rem] shadow-[0_30px_100px_rgba(215,176,107,0.15)] bg-white max-w-2xl w-full aspect-[3/4] relative mx-auto cursor-pointer"
              style={{ perspective: "1500px" }}
            >
              <img 
                src="/karnataka-award-2025.png" 
                alt="Karnataka Invest 2025 Award" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D160E]/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative z-10 bg-white px-6 py-20 lg:py-40 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-24"
          >
            <p className="text-sm uppercase tracking-[0.5em] text-[#8C6A3A] font-bold">
              Customer Voices
            </p>
            <h3 className="mt-8 text-6xl md:text-8xl text-[#1D160E]" style={{ fontFamily: "Instrument Serif, serif" }}>
              Trusted Excellence
            </h3>
          </motion.div>
          <div className="grid gap-12 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 60, rotateX: 15, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -8,
                  y: -10,
                  transition: { duration: 0.4 }
                }}
                className="rounded-[4rem] border border-[#E3D2B5] bg-[#FBF8F2] p-12 shadow-[0_20px_60px_rgba(140,106,58,0.04)] hover:shadow-[0_40px_80px_rgba(140,106,58,0.12)] transition-all duration-500 cursor-default"
                style={{ perspective: "1500px" }}
              >
                <div className="flex text-[#D7B06B] mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-2xl leading-relaxed text-[#1D160E] font-serif italic">"{t.text}"</p>
                <div className="mt-10 border-t border-[#E3D2B5] pt-8">
                  <p className="text-xl font-bold text-[#1D160E]">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-[#8C6A3A] mt-2">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 p-4 md:px-4 md:py-6 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#FFFDF9] shadow-2xl flex flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#E5D7BD] px-6 py-4 md:px-10 md:py-6">
                <div>
                  <h4 className="text-3xl md:text-4xl text-[#1D160E]" style={{ fontFamily: "Instrument Serif, serif" }}>
                    {selectedProduct.name}
                  </h4>
                  <p className="mt-1 md:mt-2 text-xs md:text-sm font-medium text-[#8C6A3A]">
                    Pack Size: {selectedProduct.pack}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-full border border-[#D9C8A7] px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm text-[#1D160E] transition hover:bg-[#F3E7CF]"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-10">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                  <div className="w-full lg:w-1/2">
                    <div className="relative">
                      <div 
                        ref={detailCarouselRef}
                        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar"
                        onScroll={(e) => {
                          const scrollLeft = e.currentTarget.scrollLeft;
                          const width = e.currentTarget.clientWidth;
                          const index = Math.round(scrollLeft / width);
                          setActiveImageIndex(index);
                        }}
                      >
                        {selectedProduct.images.map((image, index) => (
                          <div
                            key={index}
                            className="min-w-full snap-center rounded-[2rem] md:rounded-3xl overflow-hidden bg-white border border-[#E5D7BD] p-4 md:p-8 aspect-square flex items-center justify-center"
                          >
                            <img
                              src={image}
                              alt={`${selectedProduct.name} view ${index + 1}`}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-10 left-0 right-0 hidden items-center justify-center gap-2 lg:flex">
                        {selectedProduct.images.map((_, idx) => (
                          <div 
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              activeImageIndex === idx ? "w-6 bg-[#1D160E]" : "w-1.5 bg-[#D9C8A7]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col items-center gap-3 lg:hidden">
                      <p className="text-center text-[11px] text-[#8C6A3A] uppercase tracking-[0.28em] font-bold">
                        Swipe to explore more details
                      </p>
                      <div className="flex max-w-full items-center gap-2 overflow-x-auto px-2 pb-1 no-scrollbar">
                        {selectedProduct.images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => scrollToProductImage(idx)}
                            aria-label={`Go to image ${idx + 1}`}
                            className={`shrink-0 rounded-full transition-all duration-300 ${
                              activeImageIndex === idx
                                ? "h-2.5 w-10 bg-[#1D160E]"
                                : "h-2.5 w-2.5 bg-[#D9C8A7]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#D7B06B] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#8C6A3A]">Premium Factory Supply</span>
                        <div className="ml-auto flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 fill-[#D7B06B]" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <h5 className="text-2xl md:text-3xl font-bold text-[#1D160E] leading-tight">Premium Quality Selection</h5>
                      <div className="mt-4 flex items-baseline gap-3">
                        <span className="text-4xl font-serif text-[#1D160E]">Price on Inquiry</span>
                        <span className="text-[10px] text-[#8C6A3A] uppercase tracking-[0.2em] font-bold">(Wholesale & Retail)</span>
                      </div>
                      <p className="text-[#5F5548] leading-relaxed text-base md:text-lg border-l-2 border-[#E3D2B5] pl-4 md:pl-6 italic">
                        {selectedProduct.description ? (
                          selectedProduct.description.split(/(\*\*.*?\*\*)/g).map((part, i) => 
                            part.startsWith('**') && part.endsWith('**') ? (
                              <span key={i} className="text-[#8C6A3A] font-bold">{part.slice(2, -2)}</span>
                            ) : part
                          )
                        ) : (
                          <>
                            Our {selectedProduct.name} is selected from the finest harvests, ensuring 
                            consistent quality and superior taste. Perfectly aged and processed to 
                            bring out the authentic aroma.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="sticky bottom-0 bg-[#FFFDF9] pt-4 pb-2 md:pt-6 md:pb-2 border-t border-[#E5D7BD]/50 flex flex-col gap-3 md:gap-4 mt-auto">
                      <button
                        type="button"
                        onClick={() => addToCart(selectedProduct)}
                        className="w-full rounded-full bg-[#1D160E] px-6 py-4 md:px-8 md:py-5 text-[13px] md:text-sm font-bold text-white transition hover:bg-[#3A2E21] hover:shadow-xl"
                      >
                        Add To Enquiry Cart
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <a
                          href={productWhatsAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => addToCart(selectedProduct)}
                          className="flex items-center justify-center rounded-full border border-[#D9C8A7] bg-white px-3 py-3 md:px-6 md:py-4 text-center text-[12px] md:text-sm font-bold text-[#1D160E] transition hover:bg-[#F3E7CF] hover:border-[#8C6A3A]"
                        >
                          WhatsApp Order
                        </a>
                        <a
                          href={`tel:${PHONE_RAW}`}
                          onClick={() => addToCart(selectedProduct)}
                          className="flex items-center justify-center rounded-full border border-[#D9C8A7] bg-white px-3 py-3 md:px-6 md:py-4 text-center text-[12px] md:text-sm font-bold text-[#1D160E] transition hover:bg-[#F3E7CF] hover:border-[#8C6A3A]"
                        >
                          Call Order
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-[#1D160E] px-5 py-4 text-sm text-white shadow-[0_18px_40px_rgba(29,22,14,0.35)] transition hover:bg-[#3A2E21]"
      >
        Cart {cartCount > 0 ? `(${cartCount})` : ""}
      </button>

      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsCartOpen(false)}
        >
          <aside
            className="ml-auto flex h-full w-full max-w-md flex-col bg-[#FFFDF9] shadow-[0_0_80px_rgba(0,0,0,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E5D7BD] px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[#8C6A3A]">
                  Enquiry Cart
                </p>
                <h4
                  className="mt-2 text-3xl text-[#1D160E]"
                  style={{ fontFamily: "Instrument Serif, serif" }}
                >
                  Order List
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full border border-[#D9C8A7] px-4 py-2 text-sm text-[#1D160E] transition hover:bg-[#F3E7CF]"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cartItems.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#D9C8A7] bg-[#FBF6ED] p-6 text-sm leading-7 text-[#5F5548]">
                  Your cart is empty. Add products and send the list on WhatsApp when you are ready.
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-[#E5D7BD] bg-white p-4"
                    >
                      <div className="flex gap-4">
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#F8F1E4] p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-xl text-[#1D160E]"
                            style={{ fontFamily: "Instrument Serif, serif" }}
                          >
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-[#5F5548]">{item.pack}</p>
                          <div className="mt-4 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="rounded-full border border-[#D9C8A7] px-3 py-1 text-sm text-[#1D160E]"
                            >
                              -
                            </button>
                            <span className="min-w-8 text-center text-sm font-medium text-[#1D160E]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="rounded-full border border-[#D9C8A7] px-3 py-1 text-sm text-[#1D160E]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#E5D7BD] px-6 py-6">
              <div className="grid gap-3">
                <a
                  href={whatsappCartUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#1D160E] px-5 py-3 text-center text-sm text-white transition hover:bg-[#3A2E21]"
                >
                  Send Cart On WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="rounded-full border border-[#D9C8A7] px-5 py-3 text-center text-sm text-[#1D160E] transition hover:bg-[#F3E7CF]"
                >
                  Call To Order
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
      <section id="contact" className="relative z-10 bg-[#FFFDF9] px-6 py-20 lg:py-40 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[4rem] bg-[#1D160E] p-12 lg:p-24 text-center text-white"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xs font-bold uppercase tracking-[0.5em] text-[#D7B06B]"
              >
                Start Your Partnership
              </motion.p>
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-8xl leading-tight"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Ready to Experience <br/> Pure Rice Perfection?
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto"
              >
                Whether you're a distributor, retailer, or home chef, we have the perfect harvest waiting for you. Get in touch for wholesale pricing and direct delivery.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
              >
                <a
                  href={`tel:${PHONE_RAW}`}
                  className="group relative flex items-center justify-center overflow-hidden rounded-full bg-[#D7B06B] px-14 py-6 text-sm font-bold text-[#1D160E] transition-all hover:bg-white hover:shadow-[0_20px_50px_rgba(215,176,107,0.3)]"
                >
                  <span className="relative z-10">Call Direct Now</span>
                  <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
                </a>
                <a
                  href={whatsappCartUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-center overflow-hidden rounded-full border-2 border-white/20 px-14 py-6 text-sm font-bold text-white transition-all hover:bg-white/10"
                >
                  <span className="relative z-10">WhatsApp Enquiry</span>
                </a>
              </motion.div>
            </div>
            
            {/* Decorative 3D elements (abstract) */}
            <motion.div 
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#D7B06B]/20 to-transparent rounded-full blur-3xl pointer-events-none" 
            />
            <motion.div 
              animate={{ 
                y: [0, 40, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#8C6A3A]/20 to-transparent rounded-full blur-3xl pointer-events-none" 
            />
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 bg-[#0E0E0E] pt-24 pb-12 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-16 lg:grid-cols-2"
          >
            <div>
              <h4 className="text-4xl font-normal" style={{ fontFamily: "Instrument Serif, serif" }}>
                Kushi Agro Foods
              </h4>
              <p className="mt-6 max-w-md text-base leading-8 text-white/50">
                Premium quality rice supply from the heart of Raichur. 
                Dedicated to purity, heritage, and customer satisfaction since 1984.
              </p>
              <div className="mt-10 flex gap-6">
                {/* Social links placeholder */}
                <a href="#" className="text-white/40 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">WhatsApp</a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-widest text-[#D7B06B]">Quick Links</p>
                <ul className="space-y-4 text-sm text-white/50">
                  <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-white transition-colors">Products</a></li>
                  <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-widest text-[#D7B06B]">Legal</p>
                <ul className="space-y-4 text-sm text-white/50">
                  <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button></li>
                </ul>
              </div>

              <div className="space-y-6">
                <p className="text-xs uppercase tracking-widest text-[#D7B06B]">Factory</p>
                <div className="flex gap-4">
                  <svg className="w-5 h-5 text-[#D7B06B] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-white/50 leading-relaxed">
                    Industrial Area, Raichur-Hyderabad Rd,<br/>
                    Raichur, Karnataka 584102
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-24 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-white/30 uppercase tracking-[0.2em]">
              &copy; 2026 Kushi Agro Foods. All rights reserved.
            </p>
            <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                Designed & Developed by <span className="text-white/50 font-bold">Manjunath</span>
              </p>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                Ph: <a href="tel:+919448986953" className="hover:text-[#D7B06B] transition-colors">9448986953</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
