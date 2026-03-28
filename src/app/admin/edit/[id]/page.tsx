"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAdmin } from "@/components/AdminContext";
import { ArrowLeft, Image as ImageIcon, X, Upload, Plus } from "lucide-react";
import Link from "next/link";

export default function EditService() {
  const { services, updateService } = useAdmin();
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    image: "",
    icon: "🎵",
    price: "",
    priceRange: "",
    location: "",
  });

  const [features, setFeatures] = useState<string[]>([""]);
  const [packages, setPackages] = useState([
    { name: "Basic Package", price: "", items: [""] },
    { name: "Standard Package", price: "", items: [""] },
    { name: "Premium Package", price: "", items: [""] },
  ]);
  const [imagePreview, setImagePreview] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const service = services.find((s) => s.id === params.id);
    if (service) {
      setFormData({
        name: service.name,
        slug: service.slug,
        description: service.description,
        longDescription: service.longDescription,
        image: service.image,
        icon: service.icon,
        price: service.price,
        priceRange: service.priceRange,
        location: service.location,
      });
      setFeatures(service.features.length > 0 ? service.features : [""]);
      setPackages(
        service.packages.length > 0
          ? service.packages
          : [
              { name: "Basic Package", price: "", items: [""] },
              { name: "Standard Package", price: "", items: [""] },
              { name: "Premium Package", price: "", items: [""] },
            ]
      );
      setImagePreview(service.image);
    }
  }, [services, params.id]);

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setToast("Please upload an image file");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast("Image must be under 5MB");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      const data = await res.json();
      
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch {
      setToast("Failed to upload image to server");
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

  const handlePackageChange = (pkgIndex: number, field: string, value: string) => {
    const newPackages = [...packages];
    (newPackages[pkgIndex] as any)[field] = value;
    setPackages(newPackages);
  };

  const handlePackageItemChange = (pkgIndex: number, itemIndex: number, value: string) => {
    const newPackages = [...packages];
    newPackages[pkgIndex].items[itemIndex] = value;
    setPackages(newPackages);
  };

  const addPackageItem = (pkgIndex: number) => {
    const newPackages = [...packages];
    newPackages[pkgIndex].items.push("");
    setPackages(newPackages);
  };

  const removePackageItem = (pkgIndex: number, itemIndex: number) => {
    const newPackages = [...packages];
    newPackages[pkgIndex].items = newPackages[pkgIndex].items.filter((_, i) => i !== itemIndex);
    setPackages(newPackages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedService = {
      id: params.id as string,
      ...formData,
      features: features.filter((f) => f.trim() !== ""),
      packages: packages
        .map((pkg) => ({ ...pkg, items: pkg.items.filter((item) => item.trim() !== "") }))
        .filter((pkg) => pkg.name && pkg.price),
    };
    updateService(params.id as string, updatedService);
    router.push("/admin");
  };

  if (!formData.name) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          <span className="text-white/40 text-sm">Loading service...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm animate-fade-in-up">
          {toast}
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">Edit Service</h1>
          <p className="text-white/40 text-sm">Update {formData.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Info */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-6 h-6 bg-gold/10 rounded-md flex items-center justify-center text-gold text-xs">1</span>
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-white/50 text-sm mb-1.5">Service Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-1.5">Slug (URL) *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-1.5">Icon (Emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-1.5">Starting Price *</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-1.5">Price Range</label>
              <input
                type="text"
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-white/50 text-sm mb-1.5">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/50 text-sm mb-1.5">Short Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all resize-none"
                rows={2}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-white/50 text-sm mb-1.5">Long Description *</label>
              <textarea
                required
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all resize-none"
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-6 h-6 bg-gold/10 rounded-md flex items-center justify-center text-gold text-xs">2</span>
            Service Image
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              {/* Drag and Drop */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  dragActive ? "border-gold/50 bg-gold/5" : "border-white/10 hover:border-white/20"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
                <Upload className="w-8 h-8 text-white/20 mx-auto mb-2" />
                <p className="text-white/40 text-sm">
                  Drag & drop or <span className="text-gold">browse</span>
                </p>
                <p className="text-white/20 text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-1.5">Or paste image URL</label>
                <input
                  type="text"
                  value={formData.image.startsWith("data:") ? "" : formData.image}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm placeholder-white/20 focus:border-gold/50 outline-none transition-all"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-sm mb-1.5">Preview</label>
              <div className="aspect-video rounded-xl overflow-hidden bg-dark-700 border border-white/5">
                {imagePreview ? (
                  <div className="relative w-full h-full group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImagePreview(""); setFormData((prev) => ({ ...prev, image: "" })); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-dark-900/80 rounded-full flex items-center justify-center text-white/60 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/15">
                    <ImageIcon size={40} />
                    <p className="text-xs mt-2">No image</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 bg-gold/10 rounded-md flex items-center justify-center text-gold text-xs">3</span>
              Features
            </h2>
            <button type="button" onClick={addFeature} className="flex items-center gap-1.5 text-gold text-sm hover:text-gold-light transition-colors">
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-dark-700 border border-white/10 text-white text-sm placeholder-white/20 focus:border-gold/50 outline-none transition-all"
                  placeholder={`Feature ${index + 1}`}
                />
                {features.length > 1 && (
                  <button type="button" onClick={() => removeFeature(index)} className="p-2.5 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-6 h-6 bg-gold/10 rounded-md flex items-center justify-center text-gold text-xs">4</span>
            Pricing Packages
          </h2>
          <div className="space-y-4">
            {packages.map((pkg, pkgIndex) => (
              <div key={pkgIndex} className="rounded-lg border border-white/5 bg-dark-700/50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-white/40 text-xs mb-1">Package Name</label>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => handlePackageChange(pkgIndex, "name", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-xs mb-1">Price</label>
                    <input
                      type="text"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(pkgIndex, "price", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/40 text-xs mb-1">Items</label>
                  <div className="space-y-1.5">
                    {pkg.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handlePackageItemChange(pkgIndex, itemIndex, e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-dark-700 border border-white/10 text-white text-sm focus:border-gold/50 outline-none transition-all"
                          placeholder={`Item ${itemIndex + 1}`}
                        />
                        {pkg.items.length > 1 && (
                          <button type="button" onClick={() => removePackageItem(pkgIndex, itemIndex)} className="p-2 text-white/20 hover:text-red-400 rounded-lg transition-all">
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => addPackageItem(pkgIndex)} className="text-xs text-gold/60 hover:text-gold transition-colors">
                      + Add Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pb-8">
          <Link href="/admin" className="px-6 py-2.5 border border-white/10 text-white/50 rounded-xl text-sm hover:bg-white/5 transition-all">
            Cancel
          </Link>
          <button type="submit" className="px-8 py-2.5 bg-gradient-to-r from-gold to-gold-dark text-dark-900 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all">
            Update Service
          </button>
        </div>
      </form>
    </div>
  );
}
