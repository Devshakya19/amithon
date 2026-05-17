"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Events", href: "#events" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "py-2" : "py-6"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 py-2 rounded-[1.5rem] flex items-center justify-between transition-all duration-500",
          isScrolled ? "glass-card shadow-2xl border-white/10" : "bg-transparent border-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white display-font">
            Amithon
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.35em] text-on-surface-variant hover:text-primary-container transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white hover:text-primary-container transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-xl bg-primary-container text-white text-[11px] font-semibold uppercase tracking-[0.35em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
          >
            Join Portal
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 glass-card p-8 rounded-[2.5rem] flex flex-col gap-6 md:hidden border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-semibold text-white uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-white/5" />
            <Link
              href="/login"
              className="text-lg font-semibold text-white uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="w-full py-4 rounded-2xl bg-primary-container text-white font-semibold text-center uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Portal
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
