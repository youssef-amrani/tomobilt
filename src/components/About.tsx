export default function About() {
  const stats = [
    { value: "50+", label: "Véhicules" },
    { value: "98%", label: "Clients satisfaits" },
    { value: "15", label: "Ans d'expérience" },
    { value: "4.9", label: "Note moyenne" },
  ];

  return (
    <section id="apropos" className="py-24" style={{ background: "var(--bg-primary)" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-badge inline-flex">À Propos</div>
            <h2 className="section-title text-left">
              Votre partenaire de <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-primary)" }}>confiance</span>
            </h2>
            <p className="text-base mb-6" style={{ color: "var(--text-secondary)" }}>
              Depuis plus de 15 ans, TOMOBILT.COM offre des services de location de voitures haut de gamme à Marrakech. 
              Notre passion pour l&apos;automobile et notre engagement envers l&apos;excellence nous ont permis de devenir 
              un référence dans le secteur.
            </p>
            <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
              Chaque véhicule de notre flotte est soigneusement sélectionné et entretenu pour vous offrir 
              une expérience de conduite exceptionnelle. Notre équipe dévouée est là pour vous accompagner 
              à chaque étape de votre location.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Service rapide" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Assurance incluse" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "Livraison gratuite" },
                { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", label: "Assistance 24/7" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(37, 99, 235, 0.1)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="2">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--gradient-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-4xl md:text-5xl font-black mb-2 text-transparent bg-clip-text"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
