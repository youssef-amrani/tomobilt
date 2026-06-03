"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Car = {
  id: string;
  name: string;
  brand: string;
  price_per_day: number;
  seats: number;
  transmission: string;
};

export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    seats: "5",
    doors: "4",
    transmission: "Manuelle",
    fuel: "Essence",
    consumption: "",
    price_per_day: "",
    price_per_week: "",
    deposit: "3000",
    km_included: "200",
    features: "",
  });

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const { data } = await supabase.from("cars").select("*").order("name");
    if (data) setCars(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("cars").insert({
      name: form.name,
      brand: form.brand,
      seats: parseInt(form.seats),
      doors: parseInt(form.doors),
      transmission: form.transmission,
      fuel: form.fuel,
      consumption: form.consumption,
      price_per_day: parseInt(form.price_per_day),
      price_per_week: form.price_per_week ? parseInt(form.price_per_week) : null,
      deposit: parseInt(form.deposit),
      km_included: parseInt(form.km_included),
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
    });
    if (!error) {
      setShowForm(false);
      setForm({ name: "", brand: "", seats: "5", doors: "4", transmission: "Manuelle", fuel: "Essence", consumption: "", price_per_day: "", price_per_week: "", deposit: "3000", km_included: "200", features: "" });
      loadCars();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette voiture ?")) return;
    await supabase.from("cars").delete().eq("id", id);
    loadCars();
  };

  if (loading) return <div className="animate-spin w-6 h-6 rounded-full border-2" style={{ borderTopColor: "var(--primary-light)", borderRightColor: "var(--primary-light)", borderColor: "transparent" }} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestion des voitures</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{cars.length} véhicule{cars.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary text-sm">
          {showForm ? "Annuler" : "+ Ajouter"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl p-6 mb-8 space-y-4" style={{ background: "var(--gradient-card)", border: "1px solid var(--border)" }}>
          <h2 className="text-lg font-bold text-white mb-4">Nouveau véhicule</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: "name", label: "Nom", placeholder: "Clio 5" },
              { key: "brand", label: "Marque", placeholder: "Renault" },
              { key: "seats", label: "Places", type: "number" },
              { key: "doors", label: "Portes", type: "number" },
              { key: "transmission", label: "Transmission", placeholder: "Manuelle" },
              { key: "fuel", label: "Carburant", placeholder: "Essence" },
              { key: "consumption", label: "Consommation", placeholder: "5.0L/100km" },
              { key: "price_per_day", label: "Prix/jour (DH)", type: "number" },
              { key: "price_per_week", label: "Prix/semaine (DH)", type: "number" },
              { key: "deposit", label: "Caution (DH)", type: "number" },
              { key: "km_included", label: "Km inclus", type: "number" },
              { key: "features", label: "Équipements", placeholder: "Séparés par des virgules" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>{field.label}</label>
                <input
                  type={field.type || "text"}
                  value={(form as any)[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  required={["name", "brand", "price_per_day"].includes(field.key)}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary text-sm mt-4">Ajouter le véhicule</button>
        </form>
      )}

      {/* Cars list */}
      <div className="space-y-3">
        {cars.map((car) => (
          <div key={car.id} className="flex items-center justify-between p-5 rounded-2xl" style={{ background: "var(--gradient-card)", border: "1px solid var(--border)" }}>
            <div>
              <div className="font-semibold text-white">{car.name}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {car.brand} · {car.seats} places · {car.transmission} · {car.price_per_day} DH/jour
              </div>
            </div>
            <button onClick={() => handleDelete(car.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-red-500/20" style={{ color: "var(--text-muted)" }}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
