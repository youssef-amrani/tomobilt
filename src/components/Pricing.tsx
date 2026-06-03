export default function Pricing() {
  const plans = [
    {
      name: "Journalier",
      price: "250",
      unit: "DH/jour",
      desc: "Pour vos déplacements du quotidien",
      features: ["200 km inclus", "Assurance au tiers", "Assistance 24/7", "Véhicule propre"],
      popular: false,
    },
    {
      name: "Hebdomadaire",
      price: "1 400",
      unit: "DH/semaine",
      desc: "Idéal pour vos vacances",
      features: ["Kilométrage illimité", "Assurance tous risques", "Assistance 24/7", "Livraison gratuite", "Siège bébé inclus"],
      popular: true,
    },
    {
      name: "Mensuel",
      price: "4 500",
      unit: "DH/mois",
      desc: "Pour vos projets longue durée",
      features: ["Kilométrage illimité", "Assurance tous risques", "Assistance prioritaire", "Livraison gratuite", "Véhicule de remplacement"],
      popular: false,
    },
  ];

  return (
    <section id="tarifs" className="py-24" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Nos Tarifs</div>
          <h2 className="section-title">
            Des offres <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-primary)" }}>transparentes</span>
          </h2>
          <p className="section-subtitle">
            Pas de frais cachés, pas de mauvaise surprise
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: plan.popular ? "var(--gradient-card)" : "var(--bg-card)",
                border: plan.popular ? "1px solid var(--primary-light)" : "1px solid var(--border)",
                boxShadow: plan.popular ? "0 0 30px var(--primary-glow)" : "var(--shadow-sm)",
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Populaire
                </div>
              )}

              <div className="text-sm font-semibold mb-2" style={{ color: "var(--primary-light)" }}>
                {plan.name}
              </div>
              <div className="mb-1">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-sm ml-1" style={{ color: "var(--text-muted)" }}>
                  {plan.unit}
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                {plan.desc}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="tel:0675606633"
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? "text-white"
                    : "text-[var(--text-primary)]"
                }`}
                style={{
                  background: plan.popular ? "var(--gradient-primary)" : "var(--glass-bg, rgba(255,255,255,0.04))",
                  border: plan.popular ? "none" : "1px solid var(--border-light)",
                }}
              >
                Réserver maintenant
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
