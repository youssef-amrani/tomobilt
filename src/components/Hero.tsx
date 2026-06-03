export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_banner.png"
          alt="TOMOBILT Fleet"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,14,26,0) 0%, rgba(10,14,26,0.7) 40%, rgba(10,14,26,0.95) 100%)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: "var(--primary-light)",
              opacity: 0.3 + Math.random() * 0.3,
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 pt-32">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "rgba(37, 99, 235, 0.1)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              color: "var(--primary-light)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponible immédiatement
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6">
            <span className="text-white">Conduisez</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "var(--gradient-primary)",
              }}
            >
              L&apos;Exception
            </span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-xl mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Location de voitures haut de gamme à Marrakech. Chaque trajet devient
            une expérience inoubliable.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#flotte" className="btn btn-primary text-base px-8 py-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 17v2H5v-2M12 3v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Voir nos véhicules
            </a>
            <a href="#tarifs" className="btn btn-secondary text-base px-8 py-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              Nos tarifs
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-8 md:gap-16 mt-16 pt-10"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {[
              { value: "50+", label: "Véhicules" },
              { value: "98%", label: "Clients satisfaits" },
              { value: "15", label: "Ans d'expérience" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-black text-white">
                  {stat.value}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
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
