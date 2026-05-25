"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "/services",
    subItems: [
      { name: "Company Formation", href: "/services/company-formation-business-setup" },
      { name: "100% Foreign Ownership", href: "/services/one-hundred-percent-foreign-ownership" },
      { name: "PRO Services", href: "/services/pro-services" },
      { name: "Software Services", href: "/services/software-services" },
      { name: "Certificate Attestation", href: "/services/certificate-attestation" },
      { name: "View More", href: "/services", isViewMore: true },
    ]
  },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-2 sm:px-6",
        isScrolled
          ? "bg-white border-b border-gray-200 py-0.5 shadow-md"
          : "bg-white/90 backdrop-blur-md py-1"
      )}
    >
      <div className="max-w-[1800px] mx-auto flex items-center justify-between px-4 sm:px-10">
        {/* Logo Section */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/treklogo.png"
              alt="Trek Group"
              className="w-18 md:w-24 h-18 md:h-24 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex items-center">
              <span className="text-xl md:text-2xl font-black tracking-tighter hidden sm:block">
                <span className="text-black">TREK</span>
                <span className="text-[#d4af37]">GROUP</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Middle: Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 text-lg font-bold transition-all py-4 px-2 relative whitespace-nowrap",
                    isActive ? "text-secondary-dark" : "text-black hover:text-secondary"
                  )}
                >
                  {link.name}
                  {link.subItems && <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />}

                  {/* Underline for active link */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-3 left-0 right-0 h-0.5 bg-secondary rounded-full"
                    />
                  )}
                </Link>

                {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 w-64 flex flex-col relative z-50">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "px-4 py-3 text-sm font-bold transition-colors",
                            subItem.isViewMore
                              ? "text-secondary bg-secondary/5 hover:bg-secondary hover:text-white mt-1 border-t border-gray-100 flex justify-between items-center rounded-b-xl"
                              : "text-gray-700 hover:bg-gray-50 hover:text-secondary"
                          )}
                        >
                          {subItem.name}
                          {subItem.isViewMore && <ChevronRight size={14} />}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Section: Get a Quote */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <Link href="/contact#contact-form-section">
            <button className="hidden sm:flex bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-full text-base font-bold transition-all transform hover:scale-105 items-center gap-2 shadow-lg shadow-secondary/20 whitespace-nowrap">
              Get a Quote <ChevronRight size={18} />
            </button>
          </Link>
          
          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-black p-2 hover:bg-black/5 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white backdrop-blur-2xl border-t border-gray-100 p-6 lg:hidden shadow-xl"
          >
            <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <div key={link.name} className="flex flex-col border-b border-white/5 pb-2">
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between text-lg font-bold py-2 transition-colors",
                        isActive ? "text-secondary-dark" : "text-black"
                      )}
                      onClick={() => !link.subItems && setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.subItems && (
                      <div className="flex flex-col pl-4 mt-2 gap-3 border-l-2 border-secondary/20">
                        {link.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "text-base font-bold",
                              subItem.isViewMore ? "text-secondary flex items-center gap-1 mt-2" : "text-black/60 hover:text-secondary"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                            {subItem.isViewMore && <ChevronRight size={16} />}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="bg-secondary text-white w-full py-4 rounded-xl font-bold mt-4">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
