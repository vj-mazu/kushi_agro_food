"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  { label: "Years of Heritage", value: "35", suffix: "+" },
  { label: "Happy Customers", value: "10000", suffix: "+" },
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
      transition={{ duration: 0.8, delay: 2.2 }}
      onAnimationComplete={() => {
        document.body.style.overflow = "auto";
      }}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#130f0a] text-white"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0.2 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-[24%] h-px w-full origin-left bg-gradient-to-r from-transparent via-[#D7B06B] to-transparent"
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0.2 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[24%] left-0 h-px w-full origin-right bg-gradient-to-r from-transparent via-[#D7B06B] to-transparent"
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 18, letterSpacing: "0.55em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-[11px] uppercase tracking-[0.32em] text-[#D7B06B]"
        >
          Premium Rice Since 1987
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
      ? items.map((item) => `• *${item.name}*\n  Qty: ${item.quantity} | Pack: ${item.pack}`).join("\n\n")
      : "• Please share your complete rice catalog and current stock availability.";
      
  const footer = "Please share the price, stock status, and delivery details.\n\nThank you!";

  const fullMessage = `${title}\n${brand}\n\n${greeting}\n\n${productLines}\n\n${footer}`;

  return `${WHATSAPP_BASE}?text=${encodeURIComponent(fullMessage)}`;
}

export default function Home() {
  const [videoOpacity, setVideoOpacity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState(() => buildCatalogProducts(defaultCatalog));
  const videoRef = useRef(null);

  useEffect(() => {
    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 1200); // Speed up preloader significantly (from 3.5s to 1.2s)
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (savedCatalog) {
        const parsed = JSON.parse(savedCatalog);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(buildCatalogProducts(parsed));
        }
      }
    } catch {}
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

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h1
            className="text-4xl font-bold tracking-tight text-white transition-colors md:text-6xl"
            style={{ fontFamily: "Instrument Serif, serif" }}
          >
            Kushi Agro Foods
          </h1>

        </div>

        <div className="hidden items-center gap-10 md:flex">
          <a href="#home" className="text-xs uppercase tracking-widest font-bold text-white hover:text-[#D7B06B]">
            Home
          </a>
          <a href="#products" className="text-xs uppercase tracking-widest font-bold text-white/80 hover:text-white">
            Products
          </a>
          <a href="#about" className="text-xs uppercase tracking-widest font-bold text-white/80 hover:text-white">
            About
          </a>
          {/* Admin link hidden from public as requested */}
          <a
            href={WHATSAPP_BASE}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#C9B089] px-5 py-2.5 text-sm text-[#1D160E] transition hover:bg-[#EADCC3]"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${PHONE_RAW}`}
            className="rounded-full bg-[#1D160E] px-5 py-2.5 text-sm text-white transition hover:bg-[#3A2E21]"
          >
            Call Now
          </a>
        </div>
      </nav>

      <section
        id="home"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8 lg:pb-32 lg:pt-16"
      >
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="max-w-4xl space-y-10"
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#D7B06B] md:text-sm">
                Premium Rice Manufacturing
              </p>
              <h2
                className="text-5xl leading-none text-white md:text-7xl lg:text-8xl drop-shadow-lg"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Quality rice brands for homes, stores, and wholesale buyers.
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-8 text-white/90 md:text-lg drop-shadow-md">
                Kushi Agro Foods supplies trusted rice collections with clean grading, dependable packing, and fast direct order support.
              </p>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
              <a
                href="#products"
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-[#1D160E] px-14 py-6 text-sm font-bold text-white transition-all hover:bg-[#3A2E21] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
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
            </div>
          </motion.div>
        </div>
      </section>

      <section id="philosophy" className="relative z-10 bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="absolute -left-10 -top-10 text-[20rem] font-serif text-[#F4E6C8]/30 leading-none select-none">
                &ldquo;
              </span>
              <h2 
                className="relative z-10 text-5xl md:text-7xl lg:text-8xl text-[#1D160E] leading-tight"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                {philosophy.quote}
              </h2>
              <div className="mt-12 flex items-center gap-6">
                <div className="h-px w-20 bg-[#8C6A3A]" />
                <p className="text-sm uppercase tracking-[0.4em] text-[#8C6A3A] font-bold">
                  {philosophy.author}
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ 
                rotateY: 10,
                rotateX: -5,
                scale: 1.02,
                transition: { duration: 0.5 }
              }}
              className="rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer"
              style={{ perspective: "1200px" }}
            >
              <img 
                src="/premium-rice.png" 
                alt="Premium White Rice" 
                className="w-full h-[600px] object-cover"
              />
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
                  {stat.value}{stat.suffix}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="relative z-10 bg-[#FFFDF9] px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-16"
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
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible">

            {products.map((product, idx) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: -2,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="min-w-[90%] sm:min-w-[45%] md:min-w-0 snap-center overflow-hidden rounded-[2.5rem] border border-[#E3D2B5] bg-[#FFFDF9] shadow-[0_18px_50px_rgba(78,58,31,0.06)] transition-all hover:shadow-2xl group cursor-pointer"
                style={{ perspective: "1000px" }}
              >

                <div className={`bg-gradient-to-br ${product.accent} p-[1px]`}>
                  <div className="aspect-[4/5] bg-white p-6 overflow-hidden relative">
                    <img
                      src={product.coverImage}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-20">
                        <motion.div 
                          initial={{ x: -10, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          className={`rounded-lg ${
                            product.badge === 'Top Seller' ? 'bg-[#D7B06B]' : 'bg-[#E23744]'
                          } px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-xl flex items-center gap-2`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          {product.badge}
                        </motion.div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                       <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(product);
                          setActiveImageIndex(0);
                        }}
                        className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-105"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8C6A3A] opacity-50" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6A3A]/70">
                        {product.views} views
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#8C6A3A] bg-[#F4E6C8]/40 px-3 py-1 rounded-full">
                      {product.pack}
                    </span>
                  </div>
  
                  <div>
                    <p className={`inline-flex rounded-full bg-gradient-to-r ${product.accent} bg-clip-text text-[10px] font-bold uppercase tracking-[0.28em] text-transparent`}>
                      Premium Variety
                    </p>
                    <h4
                      className="mt-2 text-3xl text-[#1D160E] leading-tight"
                      style={{ fontFamily: "Instrument Serif, serif" }}
                    >
                      {product.name}
                      {product.variant && (
                        <span className="block text-xl opacity-80 mt-1 font-normal italic">
                          {product.variant}
                        </span>
                      )}
                    </h4>
                    <p className="mt-4 text-sm text-[#5F5548] leading-relaxed font-light">
                      {product.tagline}
                    </p>
                  </div>
  
                  <div className="pt-6 border-t border-[#E3D2B5]/30">
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="w-full rounded-full bg-[#1D160E] px-5 py-4 text-sm font-semibold text-white transition-all hover:bg-[#3A2E21] hover:shadow-[0_10px_20px_rgba(29,22,14,0.2)] active:scale-95"
                    >
                      Order via WhatsApp
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>


        </div>
      </section>

      <section id="about" className="relative z-10 bg-[#FBF8F2] px-6 py-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-[1fr_1fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-[#8C6A3A] font-bold">
                The Heritage Story
              </p>
              <h3
                className="mt-8 text-6xl text-[#1D160E] md:text-8xl leading-[1.05]"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Legacy Built on <br/> Trust Since 1987
              </h3>
              <div className="mt-12 space-y-6 text-lg leading-[1.8] text-[#5F5548]">
                <p>
                  For over three and a half decades, Kushi Agro Foods has been the cornerstone 
                  of premium rice supply in Raichur. Our journey began with a simple vision: 
                  to bring the finest grains from the fertile fields directly to your table.
                </p>
                <p>
                  Today, we serve over 10,000 happy families and institutional buyers across 
                  the country. Our state-of-the-art Sortex processing facility ensures that 
                  every grain meet the highest standards of purity and hygiene.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-8">
                <div className="flex flex-col">
                  <span className="text-4xl font-serif text-[#1D160E]">35+</span>
                  <span className="text-xs uppercase tracking-widest text-[#8C6A3A] mt-1">Years Experience</span>
                </div>
                <div className="h-12 w-px bg-[#E3D2B5]" />
                <div className="flex flex-col">
                  <span className="text-4xl font-serif text-[#1D160E]">10k+</span>
                  <span className="text-xs uppercase tracking-widest text-[#8C6A3A] mt-1">Customers Delivered</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl"
            >
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27dbed9a9a97e828452c1b96092af6e74723000&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-white text-3xl md:text-4xl font-serif italic mb-4">
                    "Precision in Every Grain"
                  </p>
                  <div className="h-px w-24 bg-[#D7B06B] mx-auto" />
                  <p className="mt-4 text-white/80 text-sm uppercase tracking-[0.3em]">
                    Advanced Sortex Technology
                  </p>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
      <section className="relative z-10 bg-white px-6 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 overflow-hidden rounded-[3rem] shadow-[0_30px_100px_rgba(215,176,107,0.15)] bg-white max-w-2xl w-full aspect-[3/4] relative mx-auto"
            >
              <img 
                src="/karnataka-award-2025.png" 
                alt="Karnataka Invest 2025 Award" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative z-10 bg-white px-6 py-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <p className="text-sm uppercase tracking-[0.5em] text-[#8C6A3A] font-bold">
              Customer Voices
            </p>
            <h3 className="mt-8 text-6xl md:text-8xl text-[#1D160E]" style={{ fontFamily: "Instrument Serif, serif" }}>
              Trusted Excellence
            </h3>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -8,
                  y: -10,
                  transition: { duration: 0.4 }
                }}
                className="rounded-[4rem] border border-[#E3D2B5] bg-[#FBF8F2] p-12 shadow-xl hover:shadow-[0_40px_80px_rgba(140,106,58,0.12)] transition-all cursor-default"
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

      <section id="contact" className="relative z-10 bg-[#120F0B] px-6 py-40 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-[1fr_1.1fr] items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-sm uppercase tracking-[0.5em] text-[#D7B06B] font-bold">
                Inquiries & Orders
              </p>
              <h3
                className="mt-8 text-6xl md:text-8xl leading-[1.05]"
                style={{ fontFamily: "Instrument Serif, serif" }}
              >
                Connect with <br/> our Sales Team
              </h3>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#E7D8C4]/60">
                Confirm stock availability, request bulk pricing, and coordinate delivery 
                directly with our Raichur-based team. We offer fast support for retail 
                and institutional supply.
              </p>
            </motion.div>

            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#D7B06B] font-bold">
                    WhatsApp Orders
                  </p>
                  <p className="mt-6 text-xl text-white/90 leading-relaxed font-serif">
                    Send your cart instantly for a quick quote.
                  </p>
                  <a
                    href={whatsappCartUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-[#1D160E] transition hover:bg-[#F6E6C9]"
                  >
                    Open WhatsApp
                  </a>
                </div>

                <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 backdrop-blur-md">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#D7B06B] font-bold">
                    Call Orders
                  </p>
                  <p className="mt-6 text-xl text-white/90 leading-relaxed font-serif">{PHONE_DISPLAY}</p>
                  <a
                    href={`tel:${PHONE_RAW}`}
                    className="mt-8 inline-flex rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <motion.a 
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 backdrop-blur-md transition hover:bg-white/[0.06] group block"
                style={{ perspective: "1000px" }}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D7B06B] font-bold">
                  Visit Address
                </p>
                <p className="mt-6 text-xl leading-relaxed text-white/90 font-serif group-hover:text-[#D7B06B] transition-colors">
                  Industrial Area, Raichur-Hyderabad Rd, Rajendra Gunj, Raichur, Karnataka 584102
                </p>
                <p className="mt-6 text-[10px] text-white/30 uppercase tracking-[0.4em]">
                  View on Google Maps →
                </p>
              </motion.a>
            </div>
          </div>
        </div>
      </section>


      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 px-4 py-6 backdrop-blur-md flex items-center justify-center"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] bg-[#FFFDF9] shadow-2xl flex flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#E5D7BD] px-10 py-6">
                <div>
                  <h4 className="text-4xl text-[#1D160E]" style={{ fontFamily: "Instrument Serif, serif" }}>
                    {selectedProduct.name}
                  </h4>
                  <p className="mt-2 text-sm font-medium text-[#8C6A3A]">
                    Pack Size: {selectedProduct.pack}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-full border border-[#D9C8A7] px-6 py-2.5 text-sm text-[#1D160E] transition hover:bg-[#F3E7CF]"
                >
                  Close
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-10 py-10">
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="w-full lg:w-1/2">
                    <div className="relative">
                      <div 
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
                            className="min-w-full snap-center rounded-3xl overflow-hidden bg-white border border-[#E5D7BD] p-8 aspect-square flex items-center justify-center"
                          >
                            <img
                              src={image}
                              alt={`${selectedProduct.name} view ${index + 1}`}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none lg:hidden"
                      >
                        <div className="bg-black/20 backdrop-blur-md rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                    <p className="text-center text-xs text-[#8C6A3A] uppercase tracking-widest mt-2 font-bold animate-pulse lg:hidden">
                      Swipe to explore more details
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
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
                  
                  <div className="w-full lg:w-1/2 space-y-8">
                    <div className="space-y-4">
                      <h5 className="text-xl font-medium text-[#1D160E]">Product Description</h5>
                      <p className="text-[#5F5548] leading-relaxed">
                        Our {selectedProduct.name} is selected from the finest harvests, ensuring 
                        consistent quality and superior taste. Perfectly aged and processed to 
                        bring out the authentic aroma.
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <button
                        type="button"
                        onClick={() => addToCart(selectedProduct)}
                        className="w-full rounded-full bg-[#1D160E] px-8 py-5 text-sm font-bold text-white transition hover:bg-[#3A2E21]"
                      >
                        Add To Enquiry Cart
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <a
                          href={productWhatsAppUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-[#D9C8A7] px-6 py-4 text-center text-sm font-medium text-[#1D160E] transition hover:bg-[#F3E7CF]"
                        >
                          WhatsApp Order
                        </a>
                        <a
                          href={`tel:${PHONE_RAW}`}
                          className="rounded-full border border-[#D9C8A7] px-6 py-4 text-center text-sm font-medium text-[#1D160E] transition hover:bg-[#F3E7CF]"
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
      <footer className="relative z-10 bg-[#0E0E0E] pt-24 pb-12 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h4 className="text-4xl font-normal" style={{ fontFamily: "Instrument Serif, serif" }}>
                Kushi Agro Foods
              </h4>
              <p className="mt-6 max-w-md text-base leading-8 text-white/50">
                Premium quality rice supply from the heart of Raichur. 
                Dedicated to purity, heritage, and customer satisfaction since 1987.
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
                  <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-widest text-[#D7B06B]">Legal</p>
                <ul className="space-y-4 text-sm text-white/50">
                  <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button></li>
                </ul>
              </div>

              <div className="space-y-6">
                <p className="text-xs uppercase tracking-widest text-[#D7B06B]">Office</p>
                <p className="text-sm text-white/50 leading-relaxed">
                  Industrial Area, Raichur-Hyderabad Rd,<br/>
                  Raichur, Karnataka 584102
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-24 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-white/30 uppercase tracking-[0.2em]">
              &copy; 2026 Kushi Agro Foods. All rights reserved.
            </p>
            <p className="text-xs text-white/30 uppercase tracking-[0.2em]">
              Designed for Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
