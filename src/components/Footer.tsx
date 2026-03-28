import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Youtube, Clock } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Nashik Dhol", href: "/services/nashik-dhol" },
    { name: "Pune Dhol", href: "/services/pune-dhol" },
    { name: "Brass Band", href: "/services/brass-band" },
    { name: "DJ Set", href: "/services/dj-set" },
    { name: "Flowers Decoration", href: "/services/flowers" },
    { name: "Sound System", href: "/services/sound-system" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="text-lg text-dark-900 font-bold">S</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Subh Band</span>
                <p className="text-[10px] text-gold/60 tracking-[0.2em] uppercase -mt-0.5">
                  Premium Entertainment
                </p>
              </div>
            </div>
            <p className="text-white/40 mb-6 leading-relaxed text-sm">
              We provide the best musical entertainment for your special
              occasions. From traditional Dhol to modern DJ sets, we make your
              events unforgettable.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, href: "#" },
                { icon: <Youtube size={16} />, href: "#" },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  ),
                  href: "#",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gold tracking-wider uppercase">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-gold text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gold tracking-wider uppercase">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold/60 mt-0.5 flex-shrink-0" size={16} />
                <span className="text-white/40 text-sm">
                  123 Event Avenue, Near City Center
                  <br />
                  Mumbai - 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold/60 flex-shrink-0" size={16} />
                <span className="text-white/40 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-gold/60 flex-shrink-0" size={16} />
                <span className="text-white/40 text-sm">Available 24/7</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold/60 flex-shrink-0" size={16} />
                <span className="text-white/40 text-sm">book@subhband.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © 2024 Subh Band. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/25 hover:text-white/50 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/25 hover:text-white/50 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
