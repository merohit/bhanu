"use client";

import { useAdmin } from "@/components/AdminContext";
import Link from "next/link";
import { PlusCircle, Package, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export default function AdminServices() {
  const { services, deleteService } = useAdmin();
  const [toast, setToast] = useState<string | null>(null);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteService(id);
      setToast(`"${name}" deleted successfully`);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm animate-fade-in-up">
          ✓ {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">All Services</h1>
          <p className="text-white/40 text-sm">View and manage all services</p>
        </div>
        <Link
          href="/admin/add"
          className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all"
        >
          <PlusCircle size={16} />
          Add Service
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="glass rounded-xl overflow-hidden group">
            <div className="h-40 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{service.icon}</span>
                  <h3 className="font-semibold text-white text-sm">{service.name}</h3>
                </div>
                <span className="text-gold text-xs font-medium">{service.price}</span>
              </div>
              <p className="text-white/30 text-xs mb-4 line-clamp-2">{service.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-white/20 text-xs">{service.packages.length} packages</span>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/edit/${service.id}`}
                    className="p-1.5 text-white/30 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit size={14} />
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    target="_blank"
                    className="p-1.5 text-white/30 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
                    title="View"
                  >
                    <Eye size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(service.id, service.name)}
                    className="p-1.5 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-16">
          <Package size={40} className="mx-auto text-white/10 mb-4" />
          <p className="text-white/30 text-sm">No services found. Add your first service!</p>
          <Link
            href="/admin/add"
            className="inline-flex items-center gap-2 text-gold text-sm hover:text-gold-light mt-4 transition-colors"
          >
            <PlusCircle size={16} /> Add Service
          </Link>
        </div>
      )}
    </div>
  );
}
