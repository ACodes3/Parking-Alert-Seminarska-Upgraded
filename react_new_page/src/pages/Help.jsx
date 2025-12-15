import { useMemo, useState } from "react";
import {
  FaEnvelope,
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaBell,
  FaShieldAlt,
  FaCommentDots,
  FaGraduationCap,
  FaLongArrowAltRight,
  FaSearch,
  FaLifeRing,
} from "react-icons/fa";
import Breadcrub from "../assets/components/Breadcrub";
import "../assets/styles/pages-styles/help.css";

const Help = () => {
  const faqs = useMemo(
    () => [
      {
        id: 1,
        question: "Kako prijavim redarja?",
        answer:
          "Odprite zemljevid, tapnite na lokacijo, izberite 'Prijavi redarja' in potrdite. Sistem shrani lokacijo in čas dogodka.",
      },
      {
        id: 2,
        question: "Kako omogočim GPS?",
        answer:
          "V Nastavitve > Lokacijske storitve pritisnite 'Odpri GPS nastavitve' in omogočite dostop. Ko je zelen indikator, je GPS aktiven.",
      },
      {
        id: 3,
        question: "Kako prejmem obvestila o prometu?",
        answer:
          "V Nastavitve vklopite 'Prometna obvestila'. Obvestila prejmete, ko se v bližini zazna zapora ali zastoj.",
      },
      {
        id: 4,
        question: "Kako ponastavim geslo?",
        answer:
          "Na prijavni strani izberite 'Pozabljeno geslo', vnesite email in sledite povezavi, ki jo prejmete na svoj naslov.",
      },
      {
        id: 5,
        question: "Kako izbrišem račun?",
        answer:
          "Odprite Nastavitve in pod 'Izbriši račun' izberite gumb. Potrdite dejanje in račun bo trajno odstranjen.",
      },
    ],
    []
  );

  const quickGuides = [
    {
      icon: FaMapMarkerAlt,
      title: "Prijava lokacije",
      desc: "Izberite točko na zemljevidu in dodajte opis, da drugi vozniki vidijo opozorilo.",
      cta: "Odpri zemljevid",
    },
    {
      icon: FaBell,
      title: "Obvestila",
      desc: "Prilagodite opozorila za redarje, promet in osebne varnostne opomnike.",
      cta: "Upravljaj obvestila",
    },
    {
      icon: FaShieldAlt,
      title: "Varnost podatkov",
      desc: "Preverite kdo vidi vaše podatke in uredite dovoljenja za deljenje lokacije.",
      cta: "Odpri nastavitve",
    },
  ];

  const contactOptions = [
    {
      icon: FaEnvelope,
      label: "Email podpora",
      value: "support@parking-alert.si",
      href: "mailto:support@parking-alert.si",
    },
    {
      icon: FaCommentDots,
      label: "Klepet v živo",
      value: "Povprečen odziv: 2 min",
      href: "#",
    },
    {
      icon: FaGraduationCap,
      label: "Vodniki",
      value: "Video in korak-po-koraku navodila",
      href: "#",
    },
  ];

  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(1);

  const filteredFaqs = useMemo(
    () =>
      faqs.filter((faq) =>
        faq.question.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [faqs, search]
  );

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="wrap-fluid">
      <div className="container-fluid paper-wrap bevel tlbr">
        <Breadcrub showButtons={false} />

        <div className="help">
          <header className="help__hero">
            <div className="help__hero-copy">
              <p className="help__eyebrow">Podpora in vodniki</p>
              <h1 className="help__title">Potrebujete pomoč?</h1>
              <p className="help__lede">
                Hitri odgovori na najpogostejša vprašanja, vodniki za začetnike
                in načini, kako nas kontaktirati, ko nekaj ne deluje.
              </p>
              <div className="help__actions">
                <a className="btn btn-primary" href="mailto:support@parking-alert.si">
                  <FaEnvelope /> Kontaktiraj podporo
                </a>
                <a className="btn btn-secondary" href="#faq">
                  <FaQuestionCircle /> Poglej FAQ
                </a>
              </div>
            </div>
            <div className="help__hero-stats">
              <div className="stat-card">
                <p className="stat-card__label">Pokrivamo</p>
                <p className="stat-card__value">120+ mest</p>
                <p className="stat-card__hint">Redne posodobitve zemljevida</p>
              </div>
              <div className="stat-card">
                <p className="stat-card__label">Odziv podpore</p>
                <p className="stat-card__value">&lt; 5 min</p>
                <p className="stat-card__hint">Povprečen čas med 8:00-20:00</p>
              </div>
            </div>
          </header>

          <section className="help__grid" aria-label="Hitri vodniki">
            {quickGuides.map((guide) => (
              <article key={guide.title} className="help-card">
                <div className="help-card__icon">
                  <guide.icon className="help-card__icon-symbol" />
                </div>
                <div>
                  <h3 className="help-card__title">{guide.title}</h3>
                  <p className="help-card__desc">{guide.desc}</p>
                  <button className="link-btn" type="button">
                    {guide.cta} <FaLongArrowAltRight />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <section id="faq" className="help__faq" aria-label="Pogosta vprašanja">
            <div className="help__faq-header">
              <div>
                <p className="help__eyebrow">FAQ</p>
                <h2 className="help__section-title">Najpogostejša vprašanja</h2>
                <p className="help__section-desc">
                  Iščite po vprašanjih ali razširite odgovore za več podrobnosti.
                </p>
              </div>
              <div className="help__search">
                <FaSearch />
                <input
                  type="search"
                  placeholder="Išči po vprašanjih"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Iskalnik vprašanj"
                />
              </div>
            </div>

            <div className="faq-list">
              {filteredFaqs.length === 0 && (
                <p className="help__empty">Ni rezultatov za vnos. Poskusite drugačno ključno besedo.</p>
              )}
              {filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div key={faq.id} className={`faq-item ${isOpen ? "open" : ""}`}>
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? "−" : "+"}
                    </button>
                    {isOpen && <p className="faq-answer">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="help__contact" aria-label="Kontaktni kanali">
            <div>
              <p className="help__eyebrow">Kontakt</p>
              <h2 className="help__section-title">Dosegljivi smo, ko nas potrebujete</h2>
              <p className="help__section-desc">
                Izberite kanal, ki vam najbolj ustreza. Najhitrejši odziv je v času delovnih ur.
              </p>
              <ul className="contact-list">
                {contactOptions.map((option) => (
                  <li key={option.label} className="contact-card">
                    <div className="contact-card__icon">
                      <option.icon className="contact-card__icon-symbol" />
                    </div>
                    <div className="contact-card__body">
                      <p className="contact-card__label">{option.label}</p>
                      <p className="contact-card__value">{option.value}</p>
                    </div>
                    <a className="contact-card__link" href={option.href}>
                      <FaLongArrowAltRight />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="help__info-panel">
              <h3>Nasveti za hitrejšo rešitev</h3>
              <ul>
                <li>Posredujte posnetek zaslona ali kratek video težave.</li>
                <li>Vključite model telefona in verzijo aplikacije.</li>
                <li>Če GPS ne deluje, preverite, ali je omogočen v sistemu.</li>
              </ul>
              <div className="help__pill">
                <FaLifeRing /> Pomoč je na voljo 24/7
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;