"use client";

import { Clock, Users, CheckCircle, ArrowRight, Award, Heart } from "lucide-react";
import Link from "next/link";

const stats = [
  { number: "8+", label: "Years Experience" },
  { number: "500+", label: "Events Completed" },
  { number: "1000+", label: "Happy Clients" },
  { number: "24/7", label: "Support" },
];

const whyChooseUs = [
  {
    icon: "🎵",
    title: "Professional Performers",
    description: "Our team consists of highly experienced and talented performers who know how to entertain crowds.",
  },
  {
    icon: "💰",
    title: "Best Prices",
    description: "We offer competitive pricing with transparent packages and no hidden costs.",
  },
  {
    icon: "🌟",
    title: "Quality Equipment",
    description: "We use only the best quality sound systems, instruments, and equipment.",
  },
  {
    icon: "🤝",
    title: "Customer Satisfaction",
    description: "Your satisfaction is our priority. We ensure a memorable experience for all.",
  },
];

const team = [
  {
    name: "Rahul Sharma",
    role: "Founder & Director",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80",
    experience: "10+ Years",
  },
  {
    name: "Vikram Singh",
    role: "Lead Dhol Player",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    experience: "15+ Years",
  },
  {
    name: "Amit Patel",
    role: "DJ & Sound Expert",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    experience: "12+ Years",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-dark-900">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-dark-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold/40"></div>
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">About Us</span>
            <div className="w-8 h-[1px] bg-gold/40"></div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white">Welcome to Subh Band</h1>
          <p className="text-lg text-white/50 mt-6 max-w-3xl mx-auto">
            Your trusted partner for premium event entertainment across India
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80"
                  alt="About Subh Band"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gold to-gold-dark text-dark-900 p-6 rounded-2xl shadow-2xl shadow-gold/10">
                <p className="text-4xl font-bold">8+</p>
                <p className="text-dark-900/70 text-sm">Years of Excellence</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-[1px] bg-gold/40"></div>
                <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">About Us</span>
              </div>
              <h2 className="text-4xl font-bold text-white">
                Making Your Events Unforgettable
              </h2>
              <p className="text-white/50 leading-relaxed">
                Subh Band is a premier provider of event entertainment services in India. With over 8 years of experience, we have successfully entertained at hundreds of weddings, parties, and corporate events across the country.
              </p>
              <p className="text-white/50 leading-relaxed">
                From traditional Nashik Dhol and Pune Dhol Tasha to modern DJ sets and brass band performances, we offer a wide range of entertainment options to make your special occasions truly memorable.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {["Professional Team", "Best Prices", "Quality Equipment", "Pan India Service"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="text-gold flex-shrink-0" size={16} />
                    <span className="text-white/60 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-800"></div>
        <div className="absolute inset-0 shimmer"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-gradient-gold">{stat.number}</p>
                <p className="text-white/40 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold/40"></div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Why Choose Us</span>
              <div className="w-8 h-[1px] bg-gold/40"></div>
            </div>
            <h2 className="text-4xl font-bold text-white">The Subh Band Difference</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-dark-800 border border-white/5 hover:border-gold/20 transition-all duration-500">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold/40"></div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Our Team</span>
              <div className="w-8 h-[1px] bg-gold/40"></div>
            </div>
            <h2 className="text-4xl font-bold text-white">Meet Our Experts</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="group rounded-2xl overflow-hidden bg-dark-800 border border-white/5 hover:border-gold/15 transition-all duration-500">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-gold text-sm font-medium">{member.role}</p>
                  <p className="text-white/30 text-sm mt-1">{member.experience} Experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Book Your <span className="text-gradient-gold">Event?</span>
          </h2>
          <p className="text-lg text-white/40 mb-10">
            Let our expert team make your special occasion unforgettable!
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-10 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-gold/20 hover:scale-105 transition-all duration-300"
          >
            Contact Us Today <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
