"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { useAdmin } from "@/components/AdminContext";

export default function ContactPage() {
  const { services } = useAdmin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    eventDate: "",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-dark-900">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
            alt="Contact Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-dark-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold/40"></div>
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Contact Us</span>
            <div className="w-8 h-[1px] bg-gold/40"></div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white">Book Your Event</h1>
          <p className="text-lg text-white/50 mt-6 max-w-3xl mx-auto">
            Ready to make your event unforgettable? Contact us for instant booking!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white mb-2">Book Now</h2>
              <p className="text-white/40 text-sm mb-8">
                Fill out the form and we'll get back to you within 2 hours!
              </p>

              {submitted && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm mb-6 animate-fade-in-up">
                  ✓ Thank you for your inquiry! We will contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-white text-sm placeholder-white/20 focus:border-gold/50 outline-none transition-all"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-white text-sm placeholder-white/20 focus:border-gold/50 outline-none transition-all"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Phone *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-white text-sm placeholder-white/20 focus:border-gold/50 outline-none transition-all"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Event Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Service</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="">Select a Service</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/50 text-sm mb-1.5">Event Location</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-white text-sm placeholder-white/20 focus:border-gold/50 outline-none transition-all"
                      placeholder="City/Area"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/50 text-sm mb-1.5">Additional Details *</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-white text-sm placeholder-white/20 focus:border-gold/50 outline-none transition-all resize-none"
                    placeholder="Tell us about your event requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-gold-dark text-dark-900 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={16} />
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Get In Touch</h2>
                <p className="text-white/40">
                  Have questions? We'd love to hear from you. Contact us through any of the channels below.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin size={20} />,
                    title: "Our Office",
                    content: "123 Event Avenue, Near City Center\nMumbai - 400001",
                  },
                  {
                    icon: <Phone size={20} />,
                    title: "Phone",
                    content: "+91 98765 43210",
                    sub: "Available 24/7",
                  },
                  {
                    icon: <Mail size={20} />,
                    title: "Email",
                    content: "book@subhband.com",
                    sub: "We reply within 2 hours",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 glass p-5 rounded-xl">
                    <div className="w-11 h-11 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center text-dark-900 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{item.title}</h3>
                      <p className="text-white/40 text-sm whitespace-pre-line">{item.content}</p>
                      {item.sub && (
                        <p className="text-white/25 text-xs flex items-center gap-1 mt-1">
                          <Clock size={10} /> {item.sub}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Book CTA */}
              <div className="glass rounded-xl p-6 glow-gold">
                <h3 className="text-lg font-semibold text-white mb-4">Why Book With Us?</h3>
                <ul className="space-y-3">
                  {[
                    "Instant Response (Within 2 Hours)",
                    "Best Price Guarantee",
                    "Professional Team",
                    "Pan India Service",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/50 text-sm">
                      <span className="text-gold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
