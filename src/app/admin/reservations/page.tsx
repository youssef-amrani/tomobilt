"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Reservation = {
  id: string;
  car_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
  cars: { name: string; brand: string } | null;
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*, cars(name, brand)")
      .order("created_at", { ascending: false });
    if (data) setReservations(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reservations").update({ status }).eq("id", id);
    loadReservations();
  };

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  const statusColors: Record<string, string> = {
    pending: "#f59e0b",
    confirmed: "#22c55e",
    cancelled: "#ef4444",
    completed: "#3b82f6",
  };

  if (loading) return <div className="animate-spin w-6 h-6 rounded-full border-2" style={{ borderTopColor: "var(--primary-light)", borderRightColor: "var(--primary-light)", borderColor: "transparent" }} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Réservations</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{reservations.length} réservation{reservations.length > 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === s ? "text-white" : ""
              }`}
              style={{
                background: filter === s ? "rgba(37,99,235,0.15)" : "transparent",
                color: filter === s ? "var(--primary-light)" : "var(--text-muted)",
                border: filter === s ? "1px solid var(--primary-light)" : "1px solid transparent",
              }}
            >
              {s === "all" ? "Toutes" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>Aucune réservation</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((res) => (
            <div key={res.id} className="p-5 rounded-2xl" style={{ background: "var(--gradient-card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-white">{res.client_name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {res.client_email} · {res.client_phone}
                  </div>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${statusColors[res.status]}20`,
                    color: statusColors[res.status],
                    border: `1px solid ${statusColors[res.status]}40`,
                  }}
                >
                  {res.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Véhicule</div>
                  <div className="font-medium text-white">{res.cars?.name || "N/A"}</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Début</div>
                  <div className="font-medium text-white">{new Date(res.start_date).toLocaleDateString("fr-FR")}</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Fin</div>
                  <div className="font-medium text-white">{new Date(res.end_date).toLocaleDateString("fr-FR")}</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Total</div>
                  <div className="font-bold text-white">{res.total_price.toLocaleString()} DH</div>
                </div>
              </div>

              {res.status === "pending" && (
                <div className="flex gap-2 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <button onClick={() => updateStatus(res.id, "confirmed")} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: "#22c55e" }}>
                    Confirmer
                  </button>
                  <button onClick={() => updateStatus(res.id, "cancelled")} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: "#ef4444" }}>
                    Annuler
                  </button>
                </div>
              )}
              {res.status === "confirmed" && (
                <div className="pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  <button onClick={() => updateStatus(res.id, "completed")} className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: "#3b82f6" }}>
                    Marquer terminée
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
