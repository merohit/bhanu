"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1596525737121-1c2b0e1d4e2b?w=800&q=80", title: "Nashik Dhol Performance", category: "Dhol" },
  { id: 2, src: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80", title: "Wedding Procession", category: "Procession" },
  { id: 3, src: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80", title: "Brass Band", category: "Band" },
  { id: 4, src: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=800&q=80", title: "DJ Night", category: "DJ" },
  { id: 5, src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&q=80", title: "Flower Decoration", category: "Decoration" },
  { id: 6, src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", title: "Sound System Setup", category: "Sound" },
  { id: 7, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", title: "Wedding Celebration", category: "Event" },
  { id: 8, src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", title: "Party Time", category: "Event" },
  { id: 9, src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80", title: "Sangeet Night", category: "Event" },
];

const categories = ["All", "Dhol", "Band", "DJ", "Decoration", "Sound", "Event", "Procession"];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  const selectedIndex = selectedImage ? filteredImages.findIndex((img) => img.id === selectedImage.id) : -1;

  const navigateImage = (direction: number) => {
    if (selectedIndex < 0) return;
    const newIndex = selectedIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setSelectedImage(filteredImages[newIndex]);
    }
  };

  return (
    <div className="bg-dark-900">
      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
            alt="Gallery Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/80 to-dark-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold/40"></div>
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Gallery</span>
            <div className="w-8 h-[1px] bg-gold/40"></div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white">Our Events</h1>
          <p className="text-lg text-white/50 mt-6 max-w-3xl mx-auto">
            Explore our collection of memorable events and performances
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-gold to-gold-dark text-dark-900 shadow-lg shadow-gold/10"
                    : "text-white/40 border border-white/10 hover:border-gold/20 hover:text-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-gold/20 transition-all duration-500"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-gold text-xs font-medium tracking-wider uppercase">{image.category}</p>
                    <p className="text-white text-lg font-semibold mt-1">{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30">No images in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-dark-900/98 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/40 hover:text-gold transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>

          {/* Prev / Next */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {selectedIndex < filteredImages.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
            >
              <ChevronRight size={18} />
            </button>
          )}

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto rounded-xl"
            />
            <div className="mt-6 text-center">
              <p className="text-gold text-xs font-medium tracking-wider uppercase">{selectedImage.category}</p>
              <p className="text-white text-xl font-semibold mt-1">{selectedImage.title}</p>
              <p className="text-white/30 text-sm mt-1">{selectedIndex + 1} / {filteredImages.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
