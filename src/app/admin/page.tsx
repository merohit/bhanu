"use client";

import { useAdmin } from "@/components/AdminContext";
import Link from "next/link";
import { PlusCircle, Package, Eye, Edit, Trash2, TrendingUp, Activity } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
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
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Manage your entertainment services</p>
        </div>
        <Link
          href="/admin/add"
          className="flex items-center gap-2 bg-gradient-to-r from-gold to-gold-dark text-dark-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all"
        >
          <PlusCircle size={16} />
          Add Service
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <Package className="text-gold" size={18} />
            </div>
            <span className="text-green-400 text-xs flex items-center gap-1">
              <TrendingUp size={12} /> Active
            </span>
          </div>
          <p className="text-3xl font-bold text-white">{services.length}</p>
          <p className="text-white/30 text-sm">Total Services</p>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Activity className="text-blue-400" size={18} />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">
            {services.reduce((acc, s) => acc + s.packages.length, 0)}
          </p>
          <p className="text-white/30 text-sm">Total Packages</p>
        </div>

        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Eye className="text-green-400" size={18} />
            </div>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400 text-xs">Live</span>
            </span>
          </div>
          <p className="text-3xl font-bold text-white">Online</p>
          <p className="text-white/30 text-sm">Website Status</p>
        </div>
      </div>

      {/* Services Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">All Services</h2>
          <span className="text-white/30 text-xs">{services.length} items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                  Packages
                </th>
                <th className="px-5 py-3 text-left text-[11px] font-medium text-white/30 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[11px] font-medium text-white/30 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-dark-600 flex-shrink-0">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {service.name}
                        </p>
                        <p className="text-xs text-white/30">/{service.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/50">
                    {service.price}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-white/50">
                      {service.packages.length} packages
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-green-500/10 text-green-400 border border-green-500/15">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                      Active
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/edit/${service.id}`}
                        className="p-2 text-white/30 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </Link>
                      <Link
                        href={`/services/${service.slug}`}
                        target="_blank"
                        className="p-2 text-white/30 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
                        title="View"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id, service.name)}
                        className="p-2 text-white/30 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {services.length === 0 && (
          <div className="text-center py-16">
            <Package size={40} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/30 text-sm">
              No services found. Add your first service!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
