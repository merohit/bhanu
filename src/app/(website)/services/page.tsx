"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAdmin } from "@/components/AdminContext";

export default function ServicesPage() {
  const { services } = useAdmin();

  return (
    <div className="bg-dark-900">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
            alt="Services Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-dark-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold/40"></div>
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              Our Services
            </span>
            <div className="w-8 h-[1px] bg-gold/40"></div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white">
            Event Entertainment
          </h1>
          <p className="text-lg text-white/50 mt-6 max-w-3xl mx-auto">
            Choose from our premium entertainment services for weddings, parties and celebrations
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/services/${service.slug}`}
                className="group relative bg-dark-800 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold border border-gold/15">
                      {service.price}
                    </span>
                    <span className="text-gold text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30">No services available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
