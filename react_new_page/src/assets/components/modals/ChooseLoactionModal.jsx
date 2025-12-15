import { useEffect, useMemo, useState } from "react";
import "../../styles/additional-styles/chooseLocationModal.css";

const PARKING_LOCATIONS = [
  "Parkirna hiša Tivoli",
  "Parkirna hiša Linhartova",
  "Parkirna hiša Sanatorij Emona",
  "Parkirno mesto Petkovskovo Nabrežje",
  "Parkirno mesto NUK",
  "Parkirno mesto Kongresni trg",
  "Parkirno mesto Trg Republike",
  "Parkirno mesto Trg Osvobodilne fronte",
  "Parkirno mesto Trg Francoske revolucije",
  "Parkirno mesto Trg Prešernovega trga",
  "Parkirno mesto Trg Črnuče",
  "Parkirno mesto Trg Ajševica",
  "Parkirno mesto Trg Barje",
  "Parkirno mesto Trg Šiška",
  "Parkirno mesto Trg Moste",
  "Parkirno mesto Trg Bežigrad",
  "Parkirno mesto Trg Vič",
  "Parkirno mesto Trg Rudnik",
  "Parkirno mesto Trg Jarše",
  "Parkirno mesto Trg Črnuče II",
  "Parkirno mesto Brdo",
  "Parkirno mesto Stožice",
  "Parkirno mesto Zalog",
  "Parkirno mesto Rakova Jelša",
  "Parkirno mesto Polje",
  "Parkirno mesto Rožna dolina",
  "Parkirno mesto Murgle",
  "Parkirno mesto Ježica",
  "Parkirno mesto BTC City",
  "Parkirno mesto Žale",
];

const ChooseLocationModal = ({ isOpen, onClose, onConfirm }) => {
  const [search, setSearch] = useState("");
  const [selectedParking, setSelectedParking] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const filteredParking = useMemo(() => {
    return PARKING_LOCATIONS.filter((p) =>
      p.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  if (!isOpen) return null;

  return (
    <div className="custom-modal" id="izberiParkirisceModal">
      <div className="modal-dialog dropdown-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Izberi Lokacijo</h5>
            <button className="close" onClick={onClose}>
              &times;
            </button>
          </div>

          {/* BODY */}
          <div className="modal-body modal-body-parking">
            Prosim izberite lokacijo iz spodnjega seznama:
            <div className="dropdown-container mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Iskanje parkirišča..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={() => setDropdownVisible(!dropdownVisible)}
              />

              {dropdownVisible && (
                <div className="dropdown-parking">
                  <ul className="dropdown-list">
                    {filteredParking.map((parking) => (
                      <li
                        key={parking}
                        className={
                          selectedParking === parking ? "selected" : ""
                        }
                        onClick={() => {
                          setSelectedParking(parking);
                          setSearch(parking);
                          setDropdownVisible(false);
                        }}
                      >
                        {parking}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onClose}>
              Prekliči
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                if (!selectedParking) return;
                onConfirm(selectedParking);
                onClose();
              }}
            >
              Izberi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseLocationModal;
