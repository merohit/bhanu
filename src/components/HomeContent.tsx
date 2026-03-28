"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Play, Users, Calendar, MapPin, Quote } from "lucide-react";
import { useAdmin } from "@/components/AdminContext";

const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1920&q=80",
    title: "Nashik Dhol",
    subtitle: "Traditional Beats for Your Special Day",
  },
  {
    url: "https://images.unsplash.com/photo-1596525737121-1c2b0e1d4e2b?w=1920&q=80",
    title: "Pune Dhol Tasha",
    subtitle: "Authentic Maharashtra Style",
  },
  {
    url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1920&q=80",
    title: "Royal Brass Band",
    subtitle: "Grand Entry for Royal Occasions",
  },
  {
    url: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=1920&q=80",
    title: "Professional DJ",
    subtitle: "Non-Stop Party Vibes",
  },
];

const indianStates = [
  { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nashik", "Nagpur", "Thane", "Aurangabad", "Solapur", "Kolhapur"] },
  { name: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh"] },
  { name: "Karnataka", cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Dharwad", "Udupi", "Bellary"] },
  { name: "Delhi NCR", cities: ["New Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad"] },
  { name: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Meerut", "Aligarh", "Bareilly"] },
  { name: "Rajasthan", cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Pilani", "Bharatpur"] },
  { name: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Satna", "Ratlam", "Rewa"] },
  { name: "West Bengal", cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Murshidabad", "Kharagpur", "Bardhaman"] },
  { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Vellore", "Erode"] },
  { name: "Telangana", cities: ["Hyderabad", "Warangal", "Secunderabad", "Karimnagar", "Ramagundam", "Khammam", "Nizamabad", "Adilabad"] },
  { name: "Punjab", cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Moga"] },
  { name: "Haryana", cities: ["Faridabad", "Gurgaon", "Panipat", "Karnal", "Rohtak", "Hisar", "Sonipat", "Yamunanagar"] },
];

const testimonials = [
  {
    name: "Priya Sharma",
    event: "Wedding Reception",
    city: "Mumbai",
    text: "Subh Band made our wedding day absolutely magical! The Nashik Dhol players were phenomenal and got everyone dancing.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    event: "Engagement Ceremony",
    city: "Pune",
    text: "Best brass band performance we've ever seen. The team was professional, punctual, and delivered beyond expectations.",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    event: "Sangeet Night",
    city: "Delhi",
    text: "The DJ set was incredible! Amazing sound quality and the light setup transformed our venue. Highly recommend!",
    rating: 5,
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, "")) || 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * numericTarget));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericTarget, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold text-gradient-gold">
      {count}{suffix}
    </div>
  );
}

export default function HomeContent() {
  const { services } = useAdmin();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationSelect = () => {
    if (selectedState && selectedCity) {
      setShowServices(true);
    }
  };

  const changeLocation = () => {
    setShowServices(false);
    setSelectedCity("");
  };

  return (
    <div className="bg-dark-900">
      {/* Hero Slider */}
      <section className="relative min-h-[95vh] flex items-center">
        <div className="absolute inset-0">
          {sliderImages.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/70 to-dark-900/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 transition-all duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/30 transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide ? "bg-gold w-8" : "bg-white/20 w-4"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gold"></div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                Premium Event Entertainment
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              {sliderImages[currentSlide].title}
              <span className="block text-gradient-gold text-3xl lg:text-4xl font-normal mt-2">
                {sliderImages[currentSlide].subtitle}
              </span>
            </h1>

            <p className="text-lg text-white/50 mb-10 max-w-lg leading-relaxed">
              Book the finest entertainment for your weddings, parties, and celebrations. Trusted by 1000+ happy clients across India.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#services"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-gold/20 hover:scale-105 transition-all duration-300"
              >
                Book Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 border border-white/15 text-white/80 px-8 py-4 rounded-full font-medium hover:border-gold/30 hover:text-gold transition-all duration-300"
              >
                <Play size={16} />
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Selection */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="glass rounded-2xl p-6 glow-gold">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-white/60 text-sm font-medium mb-2">
                  Select State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity("");
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all"
                >
                  <option value="">Choose State</option>
                  {indianStates.map((state) => (
                    <option key={state.name} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 w-full">
                <label className="block text-white/60 text-sm font-medium mb-2">
                  Select City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                  className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-white focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all disabled:opacity-30"
                >
                  <option value="">Choose City</option>
                  {selectedState &&
                    indianStates
                      .find((s) => s.name === selectedState)
                      ?.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                </select>
              </div>

              <button
                onClick={handleLocationSelect}
                disabled={!selectedState || !selectedCity}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-gold to-gold-dark text-dark-900 rounded-xl font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Find Services
              </button>
            </div>

            {showServices && (
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <p className="text-white/60 text-sm">
                  📍 Showing services in{" "}
                  <span className="font-semibold text-gold">
                    {selectedCity}, {selectedState}
                  </span>
                </p>
                <button
                  onClick={changeLocation}
                  className="text-gold/80 hover:text-gold text-sm font-medium transition-colors"
                >
                  Change Location
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold/40"></div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                Our Services
              </span>
              <div className="w-8 h-[1px] bg-gold/40"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              {showServices
                ? `Services in ${selectedCity}`
                : "Choose Your Entertainment"}
            </h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              {showServices
                ? `Book the best entertainment services in ${selectedCity}. We provide professional services across all cities in ${selectedState}.`
                : "Select your location above or browse our premium entertainment services for your special occasions"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((category, index) => (
              <Link
                key={index}
                href={`/services/${category.slug}?city=${selectedCity}&state=${selectedState}`}
                className="group relative bg-dark-800 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gold border border-gold/20">
                    {category.price}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <MapPin size={12} />{" "}
                      {showServices ? selectedCity : category.location}
                    </span>
                    <span className="text-gold text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800"></div>
        <div className="absolute inset-0 shimmer"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500", suffix: "+", label: "Events Completed", icon: <Calendar className="w-6 h-6" /> },
              { number: "1000", suffix: "+", label: "Happy Clients", icon: <Users className="w-6 h-6" /> },
              { number: "12", suffix: "+", label: "Indian States", icon: <MapPin className="w-6 h-6" /> },
              { number: "8", suffix: "+", label: "Years Experience", icon: <Star className="w-6 h-6" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center text-gold/60">
                  {stat.icon}
                </div>
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                <p className="text-white/40 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold/40"></div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                Why Choose Us
              </span>
              <div className="w-8 h-[1px] bg-gold/40"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              The Subh Band Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎵",
                title: "Professional Team",
                desc: "Experienced performers who know how to engage the crowd and create unforgettable moments",
              },
              {
                icon: "💰",
                title: "Best Prices",
                desc: "Competitive pricing with transparent no-hidden-cost packages for every budget",
              },
              {
                icon: "🌍",
                title: "Pan India Service",
                desc: "Available in all major cities across India with dedicated local teams",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-dark-800 border border-white/5 hover:border-gold/20 transition-all duration-500"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-800"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gold/40"></div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                Testimonials
              </span>
              <div className="w-8 h-[1px] bg-gold/40"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              What Our Clients Say
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentTestimonial
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 absolute inset-0 translate-y-4"
                  }`}
                >
                  <div className="text-center p-8 lg:p-12 rounded-2xl glass">
                    <Quote className="w-10 h-10 text-gold/30 mx-auto mb-6" />
                    <p className="text-lg lg:text-xl text-white/70 leading-relaxed mb-8 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} size={16} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-white/40 text-sm">
                      {testimonial.event} • {testimonial.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-gold w-8" : "bg-white/15 w-4"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Book Your{" "}
            <span className="text-gradient-gold">Entertainment?</span>
          </h2>
          <p className="text-xl text-white/40 mb-10 max-w-2xl mx-auto">
            Contact us now for instant booking and get the best deal for your
            event!
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-10 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-gold/20 hover:scale-105 transition-all duration-300"
          >
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
