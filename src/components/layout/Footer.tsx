import Link from "next/link";
import { Rocket, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:rotate-12 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-semibold tracking-tight text-white display-font">
                Amithon
              </span>
            </Link>
            <p className="text-on-surface-variant leading-relaxed font-medium">
              The elite portal for technical innovation at Amity University. Discover, register, and excel in the most prestigious hackathons and workshops.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-[0.35em] text-[11px] mb-8 text-primary-container">Navigation</h4>
            <ul className="space-y-4">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#events">Events</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-[0.35em] text-[11px] mb-8 text-primary-container">Support</h4>
            <ul className="space-y-4">
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-[0.35em] text-[11px] mb-8 text-primary-container">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-on-surface-variant group">
                <Mail className="w-5 h-5 text-primary-container shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">technical@amity.edu.in</span>
              </li>
              <li className="flex items-start gap-4 text-on-surface-variant group">
                <MapPin className="w-5 h-5 text-primary-container shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Amity University, Noida, Sector-125, UP</span>
              </li>
              <li className="flex items-start gap-4 text-on-surface-variant group">
                <Phone className="w-5 h-5 text-primary-container shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">+91 (120) 439-2000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-on-surface-variant text-sm font-medium uppercase tracking-widest text-[10px]">
            © {new Date().getFullYear()} AMITHON. Digital Infrastructure for Innovators.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">System Status: Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-on-surface-variant hover:text-primary-container transition-all text-sm font-semibold uppercase tracking-widest hover:translate-x-1 inline-block"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-white/50 hover:text-white hover:border-primary-container transition-all hover:-translate-y-1 shadow-xl"
    >
      {icon}
    </Link>
  );
}
