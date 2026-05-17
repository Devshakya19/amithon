"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "technical@amity.edu.in",
    link: "mailto:technical@amity.edu.in",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+91 (120) 244-5252",
    link: "tel:+911202445252",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Amity University, Sector 125, Noida, UP",
    link: "https://maps.google.com/?q=Amity+University+Noida",
  },
];

const socials = [
  { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-surface-container-lowest" />
      <div className="absolute inset-0 aurora-streaks opacity-60" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary-container/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-primary-container mb-4 glass-pill px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            Reach out
          </span>
          <h2 className="display-font text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
            Build the next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
              collaboration
            </span>
          </h2>
          <p className="text-on-surface-variant text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Ask about an event, propose a partnership, or request a custom portal walkthrough.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-6 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-5 sm:p-6 flex items-start gap-4 group hover:border-white/20 transition-all duration-300 block"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0 group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant mb-1">{item.label}</div>
                  <div className="text-sm sm:text-base font-semibold text-on-surface truncate">{item.value}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </a>
            ))}

            <div className="glass-card rounded-2xl p-5 sm:p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant mb-4">Follow us</div>
              <div className="flex gap-3">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary-container hover:border-primary-container transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <div className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">Message the team</div>
                <div className="display-font text-2xl sm:text-3xl text-on-surface mt-3">Let us design your next event story.</div>
              </div>
              <form className="space-y-5 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant">Full name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-on-surface-variant">Email</label>
                    <input
                      type="email"
                      placeholder="john@s.amity.edu"
                      className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Subject</label>
                  <input
                    type="text"
                    placeholder="Inquiry regarding HackAmity"
                    className="input-recessed w-full h-12 px-4 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-on-surface-variant">Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="input-recessed w-full px-4 py-3 rounded-xl text-on-surface focus:outline-none transition-all duration-300 placeholder:text-outline-variant resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-primary-container text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Send message
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
