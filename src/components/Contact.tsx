"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-24" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Contact</div>
          <h2 className="section-title">
            Prêt à <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-primary)" }}>rouler</span> ?
          </h2>
          <p className="section-subtitle">
            Contactez-nous pour réserver votre véhicule ou pour toute question
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info */}
          <div className="space-y-8">
            {[
              {
                icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
                label: "Téléphone",
                value: "06 75 60 66 33",
                href: "tel:0675606633",
              },
              {
                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                label: "Email",
                value: "contact@tomobilt.com",
                href: "mailto:contact@tomobilt.com",
              },
              {
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                label: "Adresse",
                value: "Marrakech, Maroc",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(37, 99, 235, 0.1)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="2">
                    <path d={item.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-lg font-semibold text-white hover:text-[var(--primary-light)] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-lg font-semibold text-white">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex gap-3 pt-4">
              {["Facebook", "Instagram", "WhatsApp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1"
                  style={{ background: "var(--glass-bg, rgba(255,255,255,0.04))", border: "1px solid var(--border-light)" }}
                >
                  <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl p-8 space-y-5"
            style={{ background: "var(--gradient-card)", border: "1px solid var(--border)" }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Nom complet</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Téléphone</label>
              <input
                type="tel"
                placeholder="+212 6 XX XX XX XX"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Message</label>
              <textarea
                rows={4}
                placeholder="Votre message..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 resize-none"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 15px var(--primary-glow)" }}
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
