"use client";

import {
  Store,
  Shield,
  Lock,
  Eye,
  UserCheck,
  FileText,
  Mail,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAFAF5] min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#1A1A1A]/98 backdrop-blur-md z-50 border-b border-[#D4A574]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#D4A574] to-[#A67C52] rounded-lg flex items-center justify-center transform transition-all duration-500 group-hover:rotate-6">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-cormorant tracking-wide">
                  Souvenirs Australiana
                </h1>
                <p className="text-[10px] text-[#D4A574] tracking-widest uppercase font-light">
                  Melbourne CBD
                </p>
              </div>
            </a>
            <a
              href="/"
              className="text-sm text-white/80 hover:text-[#D4A574] transition-colors duration-300 font-light tracking-wide"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-b from-white to-[#FAFAF5]">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#D4A574]/10 text-[#D4A574] mb-8">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1A1A1A] font-cormorant mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-[#666] font-light">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-AU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#D4A574]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#1A1A1A] font-cormorant mb-4">
                    Introduction
                  </h2>
                  <p className="text-[#666] font-light leading-relaxed">
                    Souvenirs Australiana ("we," "our," or "us") is committed to
                    protecting your privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you visit our store located at Shop 2a/37 Swanston St,
                    Melbourne VIC 3000, or contact us.
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#D4A574]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#1A1A1A] font-cormorant mb-4">
                    Information We Collect
                  </h2>
                  <p className="text-[#666] font-light leading-relaxed mb-6">
                    We may collect personal information that you voluntarily
                    provide to us when you:
                  </p>
                  <ul className="space-y-3 text-[#666] font-light">
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4A574] mt-1.5">•</span>
                      <span>Make a purchase in our store</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4A574] mt-1.5">•</span>
                      <span>Contact us via phone or email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4A574] mt-1.5">•</span>
                      <span>Request information about our products</span>
                    </li>
                  </ul>
                  <p className="text-[#666] font-light leading-relaxed mt-6">
                    The personal information we collect may include your name,
                    email address, phone number, payment information, and
                    purchase history.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-[#D4A574]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#1A1A1A] font-cormorant mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-[#666] font-light leading-relaxed mb-6">
                    We use the information we collect to:
                  </p>
                  <ul className="space-y-3 text-[#666] font-light">
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4A574] mt-1.5">•</span>
                      <span>
                        Process your transactions and manage your orders
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4A574] mt-1.5">•</span>
                      <span>
                        Respond to your inquiries and provide customer service
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4A574] mt-1.5">•</span>
                      <span>Improve our products and services</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4A574] mt-1.5">•</span>
                      <span>Comply with legal obligations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#D4A574]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#1A1A1A] font-cormorant mb-4">
                    Security of Your Information
                  </h2>
                  <p className="text-[#666] font-light leading-relaxed">
                    We use administrative, technical, and physical security
                    measures to help protect your personal information. While we
                    have taken reasonable steps to secure the personal
                    information you provide to us, please be aware that no
                    security measures are perfect or impenetrable, and no method
                    of data transmission can be guaranteed against any
                    interception or other type of misuse.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-16 bg-[#FAFAF5] p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-[#1A1A1A] font-cormorant mb-4">
                Payment Information
              </h3>
              <p className="text-[#666] font-light leading-relaxed">
                We accept credit cards, debit cards, and NFC mobile payments.
                Payment card information is processed securely and in compliance
                with Payment Card Industry Data Security Standards (PCI DSS). We
                do not store your complete payment card information on our
                premises.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-[#1A1A1A] font-cormorant mb-6">
                Your Privacy Rights
              </h2>
              <p className="text-[#666] font-light leading-relaxed mb-6">
                Under Australian privacy law, you have the right to:
              </p>
              <ul className="space-y-3 text-[#666] font-light">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] mt-1.5">•</span>
                  <span>Access the personal information we hold about you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] mt-1.5">•</span>
                  <span>Request correction of your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] mt-1.5">•</span>
                  <span>Request deletion of your personal information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] mt-1.5">•</span>
                  <span>
                    Lodge a complaint about our handling of your personal
                    information
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="bg-[#1A1A1A] text-white p-10 rounded-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#D4A574]/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#D4A574]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-cormorant mb-4">
                    Contact Us About Privacy
                  </h2>
                  <p className="text-white/80 font-light leading-relaxed mb-6">
                    If you have questions or concerns about this Privacy Policy
                    or our privacy practices, please contact us:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[#D4A574] font-semibold mb-2">Phone</p>
                      <a
                        href="tel:+61396500992"
                        className="text-white/90 hover:text-[#D4A574] transition-colors duration-300"
                      >
                        +61 3 9650 0992
                      </a>
                    </div>
                    <div>
                      <p className="text-[#D4A574] font-semibold mb-2">
                        Address
                      </p>
                      <p className="text-white/90 font-light">
                        Souvenirs Australiana
                        <br />
                        Shop 2a/37 Swanston St
                        <br />
                        Melbourne VIC 3000
                        <br />
                        Australia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="mt-16 pt-8 border-t border-[#E5E5E5]">
              <h3 className="text-2xl font-bold text-[#1A1A1A] font-cormorant mb-4">
                Changes to This Privacy Policy
              </h3>
              <p className="text-[#666] font-light leading-relaxed">
                We may update this Privacy Policy from time to time. The updated
                version will be indicated by an updated "Last updated" date at
                the top of this Privacy Policy. We encourage you to review this
                Privacy Policy periodically to stay informed about how we are
                protecting your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-11 h-11 bg-gradient-to-br from-[#D4A574] to-[#A67C52] rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold font-cormorant">
                Souvenirs Australiana
              </h3>
              <p className="text-xs text-[#D4A574]">Melbourne CBD</p>
            </div>
          </div>
          <p className="text-white/40 text-sm font-light">
            © {new Date().getFullYear()} Souvenirs Australiana. All rights
            reserved.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        .font-cormorant {
          font-family: 'Cormorant', serif;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background-color: #D4A574;
          color: white;
        }
      `}</style>
    </div>
  );
}
