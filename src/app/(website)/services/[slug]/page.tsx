"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { useAdmin } from "@/components/AdminContext";

export default function ServiceDetailPage() {
  const { services } = useAdmin();
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-white/40 mb-6">The service you're looking for doesn't exist.</p>
          <Link href="/services" className="text-gold hover:text-gold-light transition-colors">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-900">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-dark-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{service.icon}</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-[1px] bg-gold/40"></div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                Premium Service
              </span>
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white">{service.name}</h1>
          <p className="text-lg text-white/50 mt-4 max-w-2xl">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-5 py-2 rounded-full font-semibold text-sm">
              {service.price}
            </span>
            <span className="border border-white/10 text-white/60 px-5 py-2 rounded-full flex items-center gap-2 text-sm">
              <MapPin size={14} /> {service.location}
            </span>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">About This Service</h2>
            <p className="text-white/50 leading-relaxed text-lg">{service.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {service.features.length > 0 && (
        <section className="py-16 bg-dark-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-gold/40"></div>
                <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                  What&apos;s Included
                </span>
                <div className="w-8 h-[1px] bg-gold/40"></div>
              </div>
              <h2 className="text-3xl font-bold text-white">Features</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 glass p-4 rounded-xl">
                  <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-white/70 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages Section */}
      {service.packages.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-gold/40"></div>
                <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                  Pricing
                </span>
                <div className="w-8 h-[1px] bg-gold/40"></div>
              </div>
              <h2 className="text-3xl font-bold text-white">Choose Your Package</h2>
              <p className="text-white/40 mt-3">Select the perfect package for your event</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {service.packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                    index === 1
                      ? "glass border-gold/30 glow-gold"
                      : "glass"
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-dark"></div>
                  )}
                  {index === 1 && (
                    <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-4 py-1 rounded-b-lg text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8 pt-10">
                    <h3 className="text-lg font-semibold text-white mb-2">{pkg.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-gradient-gold">{pkg.price}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-white/50 text-sm">
                          <Check className="w-4 h-4 text-gold flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                        index === 1
                          ? "bg-gradient-to-r from-gold to-gold-dark text-dark-900 hover:shadow-lg hover:shadow-gold/20"
                          : "border border-white/10 text-white/60 hover:border-gold/30 hover:text-gold"
                      }`}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book?</h2>
          <p className="text-white/40 mb-8">
            Contact us for instant booking and custom quotes for your event!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              Contact Us <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 border border-white/10 text-white/60 px-8 py-3 rounded-full font-medium hover:border-gold/30 hover:text-gold transition-all"
            >
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
