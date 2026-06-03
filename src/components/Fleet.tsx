"use client";

import { useState } from "react";

const cars = [
  {
    id: "dacia",
    name: "Dacia Logan",
    brand: "Dacia",
    seats: 5,
    doors: 4,
    transmission: "Manuelle",
    fuel: "Essence",
    consumption: "5.2L/100km",
    price: 250,
    priceWeek: 1400,
    deposit: 3000,
    km: 200,
    features: ["Climatisation", "Bluetooth", "GPS", "Caméra de recul"],
    colors: [
      { name: "Noir", hex: "#1a1a1a", img: "/images/dacia_logan_noir.png" },
      { name: "Blanc", hex: "#f0f0f0", img: "/images/dacia_logan_blanc.png" },
    ],
  },
  {
    id: "peugeot",
    name: "Peugeot 208",
    brand: "Peugeot",
    seats: 5,
    doors: 4,
    transmission: "Manuelle",
    fuel: "Essence",
    consumption: "4.8L/100km",
    price: 350,
    priceWeek: 2100,
    deposit: 4000,
    km: 200,
    features: ["Climatisation", "Bluetooth", "GPS", "Caméra de recul", "Toit ouvrant"],
    colors: [
      { name: "Noir", hex: "#1a1a1a", img: "/images/peugeot_208_noir.png" },
      { name: "Blanc", hex: "#f0f0f0", img: "/images/peugeot_208_blanc.png" },
      { name: "Vert", hex: "#a8c97f", img: "/images/peugeot_208_vert.png" },
    ],
  },
  {
    id: "opel",
    name: "Opel Corsa",
    brand: "Opel",
    seats: 5,
    doors: 4,
    transmission: "Manuelle",
    fuel: "Diesel",
    consumption: "3.9L/100km",
    price: 300,
    priceWeek: 1800,
    deposit: 3500,
    km: 200,
    features: ["Climatisation", "Bluetooth", "GPS", "Caméra de recul", "Régulateur"],
    colors: [
      { name: "Noir", hex: "#1a1a1a", img: "/images/opel_corsa_noir.png" },
      { name: "Blanc", hex: "#f0f0f0", img: "/images/opel_corsa_blanc.png", border: "2px solid #ddd" },
      { name: "Rouge", hex: "#dc2626", img: "/images/opel_corsa_rouge.jpg" },
    ],
  },
];

export default function Fleet() {
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({
    dacia: 0,
    peugeot: 0,
    opel: 0,
  });

  return (
    <section id="flotte" className="py-24" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Notre Flotte</div>
          <h2 className="section-title">
            Choisissez votre <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-primary)" }}>véhicule</span>
          </h2>
          <p className="section-subtitle">
            Des voitures sélectionnées pour votre confort et votre plaisir de conduite
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => {
            const colorIndex = selectedColors[car.id] || 0;
            const currentColor = car.colors[colorIndex];

            return (
              <div
                key={car.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--gradient-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-md, 0 8px 32px rgba(0,0,0,0.3))",
                }}
              >
                {/* Image */}
                <div className="relative h-52 bg-[var(--bg-tertiary)] flex items-center justify-center p-6">
                  <img
                    src={currentColor.img}
                    alt={`${car.name} ${currentColor.name}`}
                    className="w-full h-full object-contain transition-opacity duration-300"
                  />
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {car.price} DH/jour
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{car.name}</h3>
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {car.brand}
                    </span>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", label: car.seats + " places" },
                      { icon: "M7 21h10M12 3v12m0 0l-4-4m4 4l4-4", label: car.transmission },
                      { icon: "M4 7V4m0 0h3M4 4l4 4", label: car.fuel },
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d={spec.icon} />
                        </svg>
                        {spec.label}
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.map((f) => (
                      <span
                        key={f}
                        className="px-2.5 py-1 rounded-md text-xs"
                        style={{ background: "var(--glass-bg, rgba(255,255,255,0.04))", color: "var(--text-muted)" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Colors */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Couleurs:</span>
                    <div className="flex gap-1.5">
                      {car.colors.map((color, ci) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColors((prev) => ({ ...prev, [car.id]: ci }))}
                          className="w-7 h-7 rounded-full transition-all hover:scale-110"
                          style={{
                            background: color.hex,
                            border: ci === colorIndex ? "2px solid var(--primary-light)" : color.border || "2px solid transparent",
                            boxShadow: ci === colorIndex ? "0 0 12px var(--primary-glow)" : "none",
                          }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                    <div>
                      <div className="text-2xl font-bold text-white">{car.price} <span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>DH/jour</span></div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{car.km} km inclus</div>
                    </div>
                    <a
                      href={`/reservation?car=${car.id}`}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 15px var(--primary-glow)" }}
                    >
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
