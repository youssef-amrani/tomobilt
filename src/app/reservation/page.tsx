"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Car = {
  id: string;
  name: string;
  brand: string;
  price_per_day: number;
  price_per_week: number;
  deposit: number;
  km_included: number;
  features: string[];
  consumption: string;
};

export default function ReservationPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}><div className="animate-spin w-8 h-8 rounded-full border-2 border-transparent" style={{ borderTopColor: "var(--primary-light)", borderRightColor: "var(--primary-light)" }} /></div>}>
      <ReservationPage />
    </Suspense>
  );
}

function ReservationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const carId = searchParams.get("car");

  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState(carId || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase.from("cars").select("*").then(({ data }) => {
      if (data) setCars(data);
    });
  }, []);

  useEffect(() => {
    if (carId) setSelectedCarId(carId);
  }, [carId]);

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  const days =
    startDate && endDate
      ? Math.max(
          0,
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = selectedCar
    ? days >= 7
      ? (selectedCar.price_per_week ?? selectedCar.price_per_day * 7) *
        Math.ceil(days / 7)
      : selectedCar.price_per_day * days
    : 0;

  const minDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCar || !startDate || !endDate || !clientName || !clientEmail || !clientPhone) return;
    setLoading(true);

    const { error } = await supabase.from("reservations").insert({
      car_id: selectedCar.id,
      client_name: clientName,
      client_email: clientEmail,
      client_phone: clientPhone,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
      status: "pending",
    });

    setLoading(false);
    if (!error) setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24" style={{ background: "var(--bg-primary)" }}>
        <div className="container max-w-lg text-center py-20">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(34, 197, 94, 0.1)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Réservation confirmée !</h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
            Nous vous contacterons sous 24h pour confirmer votre réservation.
          </p>
          <Link href="/" className="btn btn-primary">Retour à l&apos;accueil</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24" style={{ background: "var(--bg-primary)" }}>
      <div className="container max-w-3xl py-12">
        <Link href="/#flotte" className="inline-flex items-center gap-2 text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          Retour à la flotte
        </Link>

        <h1 className="text-3xl font-black text-white mb-2">Réserver un véhicule</h1>
        <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>Remplissez le formulaire pour réserver votre voiture</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Car selection */}
          <div className="rounded-2xl p-6" style={{ background: "var(--gradient-card)", border: "1px solid var(--border)" }}>
            <label className="block text-sm font-semibold text-white mb-4">Véhicule</label>
            <div className="grid gap-3">
              {cars.map((car) => (
                <label
                  key={car.id}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                    selectedCarId === car.id ? "ring-2" : ""
                  }`}
                  style={{
                    background: selectedCarId === car.id ? "rgba(37,99,235,0.1)" : "var(--bg-tertiary)",
                    border: `1px solid ${selectedCarId === car.id ? "var(--primary-light)" : "var(--border)"}`,
                  }}
                >
                  <input
                    type="radio"
                    name="car"
                    value={car.id}
                    checked={selectedCarId === car.id}
                    onChange={(e) => setSelectedCarId(e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <div className="font-semibold text-white">{car.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{car.brand} · {car.consumption}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{car.price_per_day} DH</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>/jour</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="rounded-2xl p-6" style={{ background: "var(--gradient-card)", border: "1px solid var(--border)" }}>
            <label className="block text-sm font-semibold text-white mb-4">Dates</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Début</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={minDate}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-primary)", colorScheme: "dark" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Fin</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || minDate}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-primary)", colorScheme: "dark" }}
                />
              </div>
            </div>

            {days > 0 && selectedCar && (
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span>{days} jour{days > 1 ? "s" : ""}</span>
                  <span className="text-white font-bold text-lg">{totalPrice.toLocaleString()} DH</span>
                </div>
              </div>
            )}
          </div>

          {/* Client info */}
          <div className="rounded-2xl p-6" style={{ background: "var(--gradient-card)", border: "1px solid var(--border)" }}>
            <label className="block text-sm font-semibold text-white mb-4">Vos informations</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Nom complet</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Votre nom"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Email</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Téléphone</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="+212 6XX XX XX XX"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !selectedCar || !startDate || !endDate}
            className="w-full py-4 rounded-xl text-base font-bold text-white transition-all disabled:opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          >
            {loading ? "Envoi en cours..." : `Confirmer la réservation — ${totalPrice.toLocaleString()} DH`}
          </button>
        </form>
      </div>
    </main>
  );
}
