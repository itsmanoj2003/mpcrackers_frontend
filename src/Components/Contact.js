import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";

/* ------------------------------------------------------------------ */
/* Icon set — hand-drawn inline SVGs, no external icon library needed  */
/* ------------------------------------------------------------------ */

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2c-4.4 0-8 3.5-8 8 0 5.6 7 12 8 12s8-6.4 8-12c0-4.5-3.6-8-8-8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 5.2c0-.8.6-1.4 1.4-1.4h2.3c.6 0 1.2.4 1.3 1l1 3.4c.2.6 0 1.2-.5 1.6L8 11.2c1.2 2.8 3.5 5.1 6.3 6.3l1.4-1.5c.4-.4 1-.6 1.6-.5l3.4 1c.6.2 1 .7 1 1.3v2.3c0 .8-.6 1.4-1.4 1.4h-1C10.6 21.5 2.5 13.4 2.5 3.7v-1"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClockSun = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="13" r="7.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 9v4l2.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 2.6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconMoonStar = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M19.5 14.8A7.6 7.6 0 0 1 9.2 4.5a8 8 0 1 0 10.3 10.3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M18.5 3.5v3M17 5h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2C17 5.1 16 5 14.9 5c-2.3 0-3.9 1.4-3.9 4v2h-2.4v2.8h2.4V21"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const IconRocketSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2s4 3 4 8-4 12-4 12-4-7-4-12 4-8 4-8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="1.6" fill="currentColor" />
  </svg>
);

const IconMapOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 4 3 6.5v13L9 17l6 3 6-2.5v-13L15 7 9 4Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 4v13M15 7v13" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3.2a8.8 8.8 0 0 0-7.5 13.4L3.2 20.8l4.3-1.3A8.8 8.8 0 1 0 12 3.2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8.6 8.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4l.6 1.5c.1.2 0 .4-.1.5l-.5.5c-.1.2-.1.3 0 .5.4.7 1.4 1.7 2.1 2.1.2.1.3.1.5 0l.5-.5c.1-.1.3-.2.5-.1l1.5.6c.3.1.4.3.4.5v.5c0 .2 0 .4-.5.6-.5.2-1.1.4-1.8.1-1-.3-2-1-2.9-1.9-.9-.9-1.5-1.9-1.9-2.9-.3-.7-.1-1.3.1-1.8Z"
      fill="currentColor"
    />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M2.5 6.5h10.5v9H2.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M13 9.5h3.6l3.4 3v3H13v-6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="16.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16.5" cy="16.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Fuse Divider — signature element: a lit-fuse rule between sections  */
/* ------------------------------------------------------------------ */

const FuseDivider = () => (
  <div className="fuse-divider" role="presentation" aria-hidden="true">
    <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="fuse-svg">
      <path
        className="fuse-path"
        d="M0 12 C 40 2, 70 22, 110 12 S 180 2, 220 12 S 290 22, 330 12 S 380 4, 400 12"
        fill="none"
      />
    </svg>
    <span className="fuse-spark">
      <span className="fuse-spark-core" />
    </span>
  </div>
);

/* ------------------------------------------------------------------ */
/* Firework burst — CSS-driven decorative background piece            */
/* ------------------------------------------------------------------ */

const FireworkBurst = ({ style, variant = "gold" }) => (
  <div className={`burst burst--${variant}`} style={style} aria-hidden="true">
    {Array.from({ length: 14 }).map((_, i) => (
      <span key={i} className="burst-ray" style={{ "--ray-index": i }} />
    ))}
    <span className="burst-core" />
  </div>
);

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const BUSINESS_EMAIL = "mpcrackers2k26@gmail.com";
  const WHATSAPP_NUMBER = "916374007066"; // +91 63740 07066, in international format for wa.me

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sentVia, setSentVia] = useState(null); // "email" | "whatsapp" | null
  const [lastMessage, setLastMessage] = useState(null);
  const formRef = useRef(null);

  // Deterministic pseudo-random scatter for the hero's twinkling stars —
  // computed once so positions stay stable across re-renders.
  const twinkles = useRef(
    Array.from({ length: 24 }).map((_, i) => ({
      top: (i * 37) % 92,
      left: (i * 53) % 96,
      delay: (i * 0.22).toFixed(2),
    }))
  ).current;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const buildMessageBody = () =>
    `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;

  const showReceipt = (via) => {
    setLastMessage({ ...form });
    setSentVia(via);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 6000);
  };

  // "Send Message" — opens the visitor's email app with the message pre-filled.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current.reportValidity()) return;

    const subject = `New Enquiry from Website — ${form.name}`;
    const mailtoLink = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(buildMessageBody())}`;
    window.location.href = mailtoLink;
    showReceipt("email");
  };

  // "Send via WhatsApp" — opens WhatsApp (app or web) with the same message,
  // pre-filled and ready to send to the store's number.
  const handleWhatsAppSend = (e) => {
    handleRipple(e);
    if (!formRef.current.reportValidity()) return;

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildMessageBody()
    )}`;
    window.open(waLink, "_blank", "noopener,noreferrer");
    showReceipt("whatsapp");
  };

  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 2;
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  };


  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || revealEls.length === 0) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const STORE_ADDRESS =
    "Meenampatti Bus Stop, Near SSSS Function Hall, Sivakasi, Virudhunagar District - 626123";
  const mapQuery = encodeURIComponent(STORE_ADDRESS);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`;

  return (
    <div className="mpc-page">
      {/* ---------------------------------------------------------- */}
      {/* Hero                                                       */}
      {/* ---------------------------------------------------------- */}
      <header className="hero" aria-label="Contact hero">
        <div className="hero__fx" aria-hidden="true">
          <FireworkBurst style={{ top: "12%", left: "8%" }} variant="gold" />
          <FireworkBurst style={{ top: "62%", left: "85%" }} variant="ember" />
          <FireworkBurst style={{ top: "20%", left: "78%" }} variant="cream" />
          <div className="hero__spark-field">
            {twinkles.map((t, i) => (
              <span
                key={i}
                className="twinkle"
                style={{
                  top: `${t.top}%`,
                  left: `${t.left}%`,
                  animationDelay: `${t.delay}s`,
                }}
              />
            ))}
          </div>
        </div>

        <p className="hero__eyebrow fade-in">
          <IconRocketSmall />
          <span>Sivakasi&nbsp;·&nbsp;Est. for celebrations</span>
        </p>
        <h1 className="hero__title fade-in-up">CONTACT US</h1>
        <p className="hero__subtitle fade-in-up delay-1">
          We're always ready to help make your celebrations brighter.
        </p>
      </header>

      <main>
        {/* -------------------------------------------------------- */}
        {/* Contact Info + Business Hours                             */}
        {/* -------------------------------------------------------- */}
        <section className="section info-section" aria-labelledby="info-heading">
          <h2 id="info-heading" className="visually-hidden">
            Store information
          </h2>

          <div className="info-grid">
            <div className="card card--contact reveal">
              <h3 className="card__title">Reach Us Directly</h3>

              <ul className="contact-list">
                <li className="contact-item">
                  <span className="contact-item__icon">
                    <IconPin />
                  </span>
                  <div className="contact-item__body">
                    <span className="contact-item__label">Address</span>
                    <address className="contact-item__value">
                      MP Crackers
                      <br />
                      Sivakasi
                      <br />
                      Virudhunagar District – 626123
                    </address>
                  </div>
                </li>

                <li className="contact-item">
                  <span className="contact-item__icon">
                    <IconPhone />
                  </span>
                  <div className="contact-item__body">
                    <span className="contact-item__label">Phone</span>
                    <a className="contact-item__value contact-item__link" href="tel:+916374007066">
                      63740 07066
                    </a>
                  </div>
                </li>

                <li className="contact-item">
                  <span className="contact-item__icon">
                    <IconMail />
                  </span>
                  <div className="contact-item__body">
                    <span className="contact-item__label">Email</span>
                    <a
                      className="contact-item__value contact-item__link"
                      href="mailto:mpcrackers2026@gmail.com"
                    >
                      mpcrackers2k26@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card card--hours reveal delay-1">
              <h3 className="card__title">Business Hours</h3>

              <ul className="hours-list">
                <li className="hours-item">
                  <span className="hours-item__icon">
                    <IconClockSun />
                  </span>
                  <div className="hours-item__body">
                    <span className="hours-item__label">Monday – Saturday</span>
                    <span className="hours-item__value">9:00 AM – 8:00 PM</span>
                  </div>
                </li>
                <li className="hours-item">
                  <span className="hours-item__icon">
                    <IconMoonStar />
                  </span>
                  <div className="hours-item__body">
                    <span className="hours-item__label">Sunday</span>
                    <span className="hours-item__value">9:00 AM – 6:00 PM</span>
                  </div>
                </li>
                <li className="hours-item hours-item--delivery">
                  <span className="hours-item__icon">
                    <IconTruck />
                  </span>
                  <div className="hours-item__body">
                    <span className="hours-item__label">Delivery</span>
                    <span className="hours-item__value">Available 24/7</span>
                  </div>
                </li>
              </ul>

              <p className="hours-note">Open every day of the festive season.</p>
            </div>
          </div>
        </section>

        <FuseDivider />

        {/* -------------------------------------------------------- */}
        {/* Map                                                       */}
        {/* -------------------------------------------------------- */}
        <section className="section map-section" aria-labelledby="map-heading">
          <h2 id="map-heading" className="section-heading">
            Find Our Store
          </h2>

          <div className="map-frame reveal">
            <div className="map-placeholder">
              <iframe
                className="map-iframe"
                title="MP Crackers store location on Google Maps"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <span className="map-tag">Sivakasi, Virudhunagar District – 626123</span>
              <span className="map-tag map-tag--delivery">
                <IconTruck />
                24/7 Delivery
              </span>
            </div>

            <a
              className="btn btn--primary map-cta"
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRipple}
            >
              <IconMapOpen />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </section>

        <FuseDivider />

        {/* -------------------------------------------------------- */}
        {/* Social                                                    */}
        {/* -------------------------------------------------------- */}
        <section className="section social-section" aria-labelledby="social-heading">
          <h2 id="social-heading" className="section-heading">
            Follow the Celebration
          </h2>

          <div className="social-row">
            <a
              className="social-btn social-btn--insta reveal"
              href="https://maps.google.com"
              onClick={(e) => {
                e.preventDefault();
              }}
              aria-label="Instagram — MP Crackers"
            >
              <span className="social-btn__icon">
                <IconInstagram />
              </span>
              <span className="social-btn__text">
                <strong>Instagram</strong>
                <small>MP Crackers</small>
              </span>
            </a>

            <a
              className="social-btn social-btn--fb reveal delay-1"
              href="https://maps.google.com"
              onClick={(e) => {
                e.preventDefault();
              }}
              aria-label="Facebook — MP Crackers"
            >
              <span className="social-btn__icon">
                <IconFacebook />
              </span>
              <span className="social-btn__text">
                <strong>Facebook</strong>
                <small>MP Crackers</small>
              </span>
            </a>
          </div>
        </section>

        <FuseDivider />

        {/* -------------------------------------------------------- */}
        {/* Contact Form                                              */}
        {/* -------------------------------------------------------- */}
        <section className="section form-section" aria-labelledby="form-heading">
          <div className="form-wrap">
            <div className="form-intro reveal">
              <h2 id="form-heading" className="section-heading section-heading--left">
                Send Us a Spark
              </h2>
              <p className="form-intro__text">
                Tell us about your celebration and we'll light up the details together.
              </p>
              <div className="form-intro__deco" aria-hidden="true">
                <FireworkBurst style={{ top: "10%", left: "20%" }} variant="ember" />
              </div>
            </div>

            <form className="quick-form reveal delay-1" ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="field">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder=" "
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Full Name</label>
              </div>

              <div className="field">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder=" "
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone Number</label>
              </div>

              <div className="field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=" "
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="field field--textarea">
                <textarea
                  id="message"
                  name="message"
                  placeholder=" "
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                />
                <label htmlFor="message">Message</label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn--primary btn--submit" onClick={handleRipple}>
                  <span>Send Message</span>
                  <IconMail />
                </button>

                <button
                  type="button"
                  className="btn btn--whatsapp btn--submit"
                  onClick={handleWhatsAppSend}
                >
                  <span>Send via WhatsApp</span>
                  <IconWhatsApp />
                </button>
              </div>

              <div className={`form-receipt ${submitted ? "is-visible" : ""}`} role="status" aria-live="polite">
                {lastMessage && (
                  <>
                    <p className="form-receipt__title">
                      {sentVia === "whatsapp"
                        ? "WhatsApp opened with your message — tap send there to reach us."
                        : "Your email app opened with this message — hit send there to reach us."}
                    </p>
                    <dl className="form-receipt__details">
                      <div>
                        <dt>Name</dt>
                        <dd>{lastMessage.name}</dd>
                      </div>
                      <div>
                        <dt>Phone</dt>
                        <dd>{lastMessage.phone}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>{lastMessage.email || "—"}</dd>
                      </div>
                      <div>
                        <dt>Message</dt>
                        <dd>{lastMessage.message}</dd>
                      </div>
                    </dl>
                  </>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Bottom Banner                                             */}
        {/* -------------------------------------------------------- */}
        <section className="banner reveal" aria-labelledby="banner-heading">
          <div className="banner__fx" aria-hidden="true">
            <FireworkBurst style={{ top: "20%", left: "12%" }} variant="cream" />
            <FireworkBurst style={{ top: "60%", left: "88%" }} variant="gold" />
          </div>
          <h2 id="banner-heading" className="banner__title">
            Let's Make Every Festival Special!
          </h2>
          <p className="banner__text">
            Thank you for choosing MP Crackers. We look forward to serving you with quality
            fireworks and trusted service.
          </p>
        </section>
      </main>
    </div>
  );
}
