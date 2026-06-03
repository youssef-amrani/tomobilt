import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1 text-xl font-bold mb-4">
              <span style={{ color: "var(--primary-light)" }}>TOMO</span>
              <span style={{ color: "var(--accent)" }}>BILT</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>.COM</span>
            </Link>
            <p className="text-sm max-w-sm" style={{ color: "var(--text-muted)" }}>
              Location de voitures haut de gamme à Marrakech. Conduisez l&apos;exception avec TOMOBILT.COM.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Liens rapides</h4>
            <ul className="space-y-2.5">
              {[
                ["Accueil", "#accueil"],
                ["Notre Flotte", "#flotte"],
                ["Tarifs", "#tarifs"],
                ["À Propos", "#apropos"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:0675606633" className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                  06 75 60 66 33
                </a>
              </li>
              <li>
                <a href="mailto:contact@tomobilt.com" className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                  contact@tomobilt.com
                </a>
              </li>
              <li>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Marrakech, Maroc
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} TOMOBILT.COM. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs transition-colors" style={{ color: "var(--text-muted)" }}>
              Mentions légales
            </a>
            <a href="#" className="text-xs transition-colors" style={{ color: "var(--text-muted)" }}>
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
