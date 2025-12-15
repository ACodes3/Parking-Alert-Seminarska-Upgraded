import { useEffect, useState } from "react";
import Breadcrub from "../assets/components/Breadcrub";
import GPSModal from "../assets/components/modals/GPSModal";
import DeleteModal from "../assets/components/modals/DeleteModal";
import CustomSelect from "../assets/components/CustomSelect";
import "../assets/styles/pages-styles/settings.css";

const Settings = () => {
  const [themeDark, setThemeDark] = useState(false);
  const [notifyWarden, setNotifyWarden] = useState(true);
  const [notifyTraffic, setNotifyTraffic] = useState(true);
  const [language, setLanguage] = useState("sl-SI");
  const [gpsModalOpen, setGpsModalOpen] = useState(false);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("appSettings") || "{}");
      if (typeof saved.themeDark === "boolean") setThemeDark(saved.themeDark);
      if (typeof saved.notifyWarden === "boolean") setNotifyWarden(saved.notifyWarden);
      if (typeof saved.notifyTraffic === "boolean") setNotifyTraffic(saved.notifyTraffic);
      if (typeof saved.gpsEnabled === "boolean") setGpsEnabled(saved.gpsEnabled);
      if (typeof saved.language === "string") setLanguage(saved.language);
    } catch {}
  }, []);

  useEffect(() => {
    const payload = { themeDark, notifyWarden, notifyTraffic, language, gpsEnabled };
    localStorage.setItem("appSettings", JSON.stringify(payload));
    document.documentElement.setAttribute("data-theme", themeDark ? "dark" : "light");
  }, [themeDark, notifyWarden, notifyTraffic, language, gpsEnabled]);

  const handleReset = () => {
    setThemeDark(false);
    setNotifyWarden(true);
    setNotifyTraffic(true);
    setLanguage("sl-SI");
    setGpsEnabled(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Uporabniški račun izbrisan");
    setIsDeleteOpen(false);
  };

  return (
    <div className="wrap-fluid">
      <div className="container-fluid paper-wrap bevel tlbr">
        <Breadcrub showButtons={false} />

        <div className="settings">
          <header className="settings__header">
            <h2 className="settings__title">Nastavitve</h2>
            <p className="settings__subtitle">Upravljajte nastavitve računa, obvestil in aplikacije.</p>
          </header>

          <section className="settings__grid">
            <div className="card">
              <div className="card__header">
                <h3>Videz</h3>
                <p>Izberite svetli ali temni način.</p>
              </div>
              <div className="card__body">
                <label className="switch-row">
                  <span>Temni način</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={themeDark}
                      onChange={(e) => setThemeDark(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </label>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3>Obvestila</h3>
                <p>Prejmite opozorila o redarjih in prometu.</p>
              </div>
              <div className="card__body">
                <label className="switch-row">
                  <span>Obvestila o redarjih</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifyWarden}
                      onChange={(e) => setNotifyWarden(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </label>

                <label className="switch-row">
                  <span>Prometna obvestila</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifyTraffic}
                      onChange={(e) => setNotifyTraffic(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </label>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3>Jezik</h3>
                <p>Izberite jezik vmesnika.</p>
              </div>
              <div className="card__body">
                <div className="field">
                  <CustomSelect
                    id="language"
                    label="Jezik"
                    value={language}
                    onChange={setLanguage}
                    options={[
                      { value: "sl-SI", label: "Slovenščina" },
                      { value: "en-US", label: "English" },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card__header">
                <h3>Lokacijske storitve</h3>
                <p>Upravljajte dostop do GPS.</p>
              </div>
              <div className="card__body">
                <div className="row-actions">
                  <div className="status">
                    <span className={`dot ${gpsEnabled ? "on" : "off"}`}></span>
                    <span>{gpsEnabled ? "GPS je vklopljen" : "GPS je izklopljen"}</span>
                  </div>
                  <button className="btn btn-secondary" onClick={() => setGpsModalOpen(true)}>
                    Odpri GPS nastavitve
                  </button>
                </div>
              </div>
            </div>

            <div className="card danger">
              <div className="card__header">
                <h3>Nevarno območje</h3>
                <p>Ponastavite nastavitve na privzete vrednosti.</p>
              </div>
              <div className="card__body">
                <button className="btn btn-outlined" onClick={handleReset}>Ponastavi nastavitve</button>
              </div>
            </div>

            <div className="card danger">
              <div className="card__header">
                <h3>Izbriši račun</h3>
                <p>Trajno izbrišite vaš račun in vse podatke.</p>
              </div>
              <div className="card__body">
                <button className="btn btn-danger" onClick={() => setIsDeleteOpen(true)}>
                  Izbriši račun
                </button>
              </div>
            </div>
          </section>
        </div>

        <GPSModal
          isOpen={gpsModalOpen}
          onClose={() => setGpsModalOpen(false)}
          onToggle={(enabled) => setGpsEnabled(enabled)}
        />
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default Settings;