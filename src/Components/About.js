import { useEffect, useRef } from "react";
import logo from "../Components/assets/Main Logo.png";
import ownerPhoto from "../Components/assets/owner.jpeg";
import "./About.css";

/**
 * Small hook: adds "in-view" to any element with the .ms-reveal class
 * once it scrolls into the viewport. No animation libraries required.
 */
function useScrollReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll(".ms-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

/** A handful of ambient twinkling sparks, positioned with inline style attrs
 *  (top/left/delay are per-instance data, not visual styling, so this stays
 *  out of the CSS file by design — see About.css for the animation itself). */
function SparkField({ count = 14 }) {
  const sparks = Array.from({ length: count });
  return (
    <div className="ms-spark-field" aria-hidden="true">
      {sparks.map((_, i) => {
        const top = `${(i * 37) % 100}%`;
        const left = `${(i * 53) % 100}%`;
        const delay = `${(i % 7) * 0.4}s`;
        return (
          <span key={i} style={{ top, left, animationDelay: delay }} />
        );
      })}
    </div>
  );
}

const WHY_CHOOSE_US = [
  {
    title: "Premium Quality",
    text: "Every product is carefully selected from trusted manufacturers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 14.5 8.5 21 9.3 16 13.7 17.5 20.5 12 17 6.5 20.5 8 13.7 3 9.3 9.5 8.5 12 2Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Safety First",
    text: "Quality checked fireworks for safer celebrations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Affordable Prices",
    text: "Best products at genuine prices.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v20M17 6.5c0-1.7-2.2-2.5-5-2.5s-5 1-5 3 2.2 2.6 5 3 5 1.2 5 3-2.2 3-5 3-5-.8-5-2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Customer Satisfaction",
    text: "Thousands of happy customers choose us every festive season.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s-7.5-4.9-10-9.3C.4 8.6 2 5 5.6 5 8 5 10 6.5 12 9c2-2.5 4-4 6.4-4C22 5 23.6 8.6 22 11.7 19.5 16.1 12 21 12 21Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Wide Variety",
    text: "From sparklers to premium gift boxes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="9" width="18" height="12" rx="1.5" />
        <path d="M3 9 12 3l9 6M8 9v12M16 9v12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Trusted Service",
    text: "Quick response, honest pricing and friendly support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16v11H8l-4 4V4Z" strokeLinejoin="round" />
        <path d="M8 9h8M8 12h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function About() {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <main className="ms-about" ref={rootRef}>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="ms-hero" aria-labelledby="ms-hero-heading">
        <SparkField count={18} />
        <div className="ms-container ms-hero-grid">
          <div className="ms-hero-copy ms-reveal">
            <p className="ms-eyebrow">MS Crackers &middot; Sivakasi</p>
            <h1 id="ms-hero-heading" className="ms-heading">
              About <span className="accent">MP Crackers</span>
            </h1>
            <p className="ms-hero-sub">
              Lighting every celebration with quality, safety &amp; trust.
            </p>
            <div className="ms-hero-rule" />
          </div>
          <div className="ms-hero-logo-wrap ms-reveal ms-reveal-delay-1">
            <div className="ms-burst" aria-hidden="true" />
            <img
              className="ms-hero-logo"
              src={logo}
              alt="MS Crackers company logo, a fireworks rocket over the letters MS"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Owner                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="ms-owner ms-section" aria-labelledby="ms-owner-heading">
        <div className="ms-container ms-owner-grid">
          <div className="ms-owner-card ms-reveal">
            <img
              className="ms-owner-photo"
              src={ownerPhoto}
              alt="Portrait of M. Ananth, Founder and Owner of MS Crackers"
            />
            <div className="ms-owner-card-glow" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="ms-owner-copy ms-reveal ms-reveal-delay-1">
            <p className="ms-eyebrow">Meet the Founder</p>
            <h2 id="ms-owner-heading" className="ms-owner-name">
              M. Ananth, B.E.
            </h2>
            <p className="ms-owner-role">Founder &amp; Owner</p>
            <span className="ms-owner-exp">5+ Years Experience in the Fireworks Industry</span>
            <p className="ms-owner-text">
              With over five years of dedicated experience in the Sivakasi
              fireworks industry, M. Ananth has built MP Crackers on a strong
              foundation of honesty, quality, and customer satisfaction. His
              mission is to provide premium fireworks that make every
              celebration memorable while maintaining high standards of
              safety and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Why Choose Us                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="ms-why ms-section" aria-labelledby="ms-why-heading">
        <div className="ms-container">
          <div className="ms-why-head ms-reveal">
            <p className="ms-eyebrow">Why Choose Us</p>
            <h2 id="ms-why-heading" className="ms-heading">
              What Sets Us <span className="accent">Apart</span>
            </h2>
          </div>

          <div className="ms-card-grid">
            {WHY_CHOOSE_US.map((card, i) => (
              <article
                key={card.title}
                className={`ms-card ms-reveal ms-reveal-delay-${(i % 3) + 1}`}
              >
                <div className="ms-card-icon" aria-hidden="true">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Promise / Vision / Mission                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="ms-values ms-section" aria-labelledby="ms-promise-heading">
        <div className="ms-container">
          <div className="ms-promise ms-reveal">
            <h2 id="ms-promise-heading">Our Promise</h2>
            <p>
              At MP Crackers, every order is handled with care, honesty and
              responsibility. We believe festivals deserve joy, not
              compromise. That&rsquo;s why we provide only quality fireworks
              that create unforgettable memories.
            </p>
          </div>

          <div className="ms-vm-grid">
            <div className="ms-vm-card ms-reveal">
              <div className="ms-vm-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To become one of the most trusted fireworks retailers by
                delivering premium quality products with exceptional
                customer service.
              </p>
            </div>

            <div className="ms-vm-card ms-reveal ms-reveal-delay-1">
              <div className="ms-vm-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2 14.8 9h7.2l-5.9 4.3 2.3 7.2L12 16.2l-6.4 4.3 2.3-7.2L2 9h7.2L12 2Z" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To spread happiness through safe, affordable and
                high-quality fireworks while building long-lasting
                relationships with every customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Bottom banner                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="ms-banner" aria-labelledby="ms-banner-heading">
        <SparkField count={12} />
        <div className="ms-container">
          <h2 id="ms-banner-heading" className="ms-heading ms-banner-heading ms-reveal">
            Celebrate Every Moment with <span className="accent">MP Crackers</span>
          </h2>
          <p className="ms-banner-sub ms-reveal ms-reveal-delay-1">
            Browse our collection and let&rsquo;s make your next festival one to remember.
          </p>
          <a
            href="#contact"
            className="ms-cta-btn ms-reveal ms-reveal-delay-2"
            aria-label="Contact MS Crackers"
          >
            Contact Us
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
