"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string;
  price: string;
  priceRange: string;
  location: string;
  features: string[];
  packages: { name: string; price: string; items: string[] }[];
}

interface AdminContextType {
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Service) => void;
  deleteService: (id: string) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const defaultServices: Service[] = [
  {
    id: "1",
    name: "Nashik Dhol",
    slug: "nashik-dhol",
    description: "Traditional Nashik Dhol players with authentic beats and energetic performances",
    longDescription: "Our Nashik Dhol team brings the authentic traditional beats to your wedding and celebration events.",
    image: "https://images.unsplash.com/photo-1596525737121-1c2b0e1d4e2b?w=800&q=80",
    icon: "🥁",
    price: "₹15,000 onwards",
    priceRange: "₹15,000 - ₹50,000",
    location: "Nashik & All India",
    features: ["Authentic Nashik Dhol beats", "2-4 Professional Dhol Players", "Traditional Attire", "Wedding Procession"],
    packages: [
      { name: "Basic Package", price: "₹15,000", items: ["2 Dhol Players", "2 Hours Service"] },
      { name: "Standard Package", price: "₹25,000", items: ["4 Dhol Players", "4 Hours Service"] },
      { name: "Premium Package", price: "₹40,000", items: ["6 Dhol Players", "Full Day Service"] },
    ],
  },
  {
    id: "2",
    name: "Pune Dhol",
    slug: "pune-dhol",
    description: "Famous Pune Dhol Tasha for weddings, processions and celebration events",
    longDescription: "Experience the famous Pune Dhol Tasha tradition at your events!",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80",
    icon: "🎺",
    price: "₹12,000 onwards",
    priceRange: "₹12,000 - ₹45,000",
    location: "Pune & All India",
    features: ["Authentic Pune Dhol Tasha", "Traditional Tasha Players", "Wedding Procession"],
    packages: [
      { name: "Basic Package", price: "₹12,000", items: ["2 Dhol Players", "2 Tasha Players"] },
      { name: "Standard Package", price: "₹22,000", items: ["4 Dhol Players", "4 Tasha Players"] },
      { name: "Premium Package", price: "₹35,000", items: ["6 Dhol Players", "6 Tasha Players"] },
    ],
  },
  {
    id: "3",
    name: "Brass Band",
    slug: "brass-band",
    description: "Royal brass band for wedding processions, government events and ceremonies",
    longDescription: "Add a royal touch to your wedding with our professional Brass Band!",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80",
    icon: "🎺",
    price: "₹18,000 onwards",
    priceRange: "₹18,000 - ₹60,000",
    location: "All India",
    features: ["Full Brass Band (8-12 Players)", "Trumpets & Saxophones", "Wedding Procession"],
    packages: [
      { name: "Basic Package", price: "₹18,000", items: ["8 Band Players", "2 Hours Service"] },
      { name: "Standard Package", price: "₹30,000", items: ["10 Band Players", "4 Hours Service"] },
      { name: "Premium Package", price: "₹50,000", items: ["12 Band Players", "Full Day Service"] },
    ],
  },
  {
    id: "4",
    name: "DJ Set",
    slug: "dj-set",
    description: "Professional DJs for sangeet, reception, birthday parties and corporate events",
    longDescription: "Get the party started with our professional DJ services!",
    image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=800&q=80",
    icon: "🎧",
    price: "₹10,000 onwards",
    priceRange: "₹10,000 - ₹35,000",
    location: "All India",
    features: ["Professional DJ", "High-End Sound System", "LED Lights & Laser Show"],
    packages: [
      { name: "Basic Package", price: "₹10,000", items: ["DJ for 3 Hours", "Basic Sound System"] },
      { name: "Standard Package", price: "₹18,000", items: ["DJ for 5 Hours", "Pro Sound System"] },
      { name: "Premium Package", price: "₹30,000", items: ["DJ Full Night", "Laser Show"] },
    ],
  },
  {
    id: "5",
    name: "Flowers Decoration",
    slug: "flowers",
    description: "Beautiful flower decorations for wedding stage, car, mandap and venue",
    longDescription: "Transform your venue into a floral paradise with our professional flower decoration services!",
    image: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&q=80",
    icon: "💐",
    price: "₹20,000 onwards",
    priceRange: "₹20,000 - ₹1,50,000",
    location: "All India",
    features: ["Wedding Stage Decoration", "Mandap Decoration", "Car Decoration"],
    packages: [
      { name: "Basic Package", price: "₹20,000", items: ["Stage Decoration", "2 Side Pillars"] },
      { name: "Standard Package", price: "₹45,000", items: ["Stage + Backdrop", "Mandap Decoration"] },
      { name: "Premium Package", price: "₹80,000", items: ["Full Venue Decoration", "Gate + Aisle"] },
    ],
  },
  {
    id: "6",
    name: "Sound System",
    slug: "sound-system",
    description: "High-quality sound system, speakers, microphones for all event types",
    longDescription: "Ensure crystal clear sound at your event with our professional sound system rental services!",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    icon: "🔊",
    price: "₹8,000 onwards",
    priceRange: "₹8,000 - ₹25,000",
    location: "All India",
    features: ["High-Quality Speakers", "Wireless Microphones", "Mixing Console"],
    packages: [
      { name: "Basic Package", price: "₹8,000", items: ["2 Speakers", "1 Wireless Mic"] },
      { name: "Standard Package", price: "₹15,000", items: ["4 Speakers", "2 Wireless Mics"] },
      { name: "Premium Package", price: "₹22,000", items: ["Full PA System", "Sound Engineer"] },
    ],
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch data from server API
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        } else {
          setServices(defaultServices);
        }
        setIsLoaded(true);
      })
      .catch(err => {
        console.error("Failed to fetch services", err);
        setServices(defaultServices);
        setIsLoaded(true);
      });
    
    // Auth status stays in localStorage
    const auth = localStorage.getItem("subhband_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Sync to server whenever services changes (if we have loaded initial data)
  useEffect(() => {
    if (isLoaded) {
      fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services })
      }).catch(err => console.error("Failed to save services", err));
    }
  }, [services, isLoaded]);

  const addService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const updateService = (id: string, updatedService: Service) => {
    setServices(prev => prev.map(s => s.id === id ? updatedService : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const login = (password: string) => {
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("subhband_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("subhband_admin_auth");
  };

  return (
    <AdminContext.Provider value={{ services, addService, updateService, deleteService, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
