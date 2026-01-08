import { useEffect, useMemo, useState } from "react";
import "../../styles/additional-styles/chooseLocationModal.css";
import Toast from "../Toast";

const ChooseLocationModal = ({ isOpen, onClose, onConfirm }) => {
  const [search, setSearch] = useState("");
  const [selectedParking, setSelectedParking] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [parkingLocations, setParkingLocations] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  // 🔹 Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // 🔹 Fetch parking locations from backend
  useEffect(() => {
    if (!isOpen) return;

    const fetchParkingLocations = async () => {
      try {
        const response = await fetch(
          "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/parkirna-mesta/"
        );
        const data = await response.json();
        setParkingLocations(data);
      } catch (error) {
        console.error("Failed to fetch parking locations:", error);
      }
    };

    fetchParkingLocations();
  }, [isOpen]);

  // 🔹 Demo: mark some locations as having a warden
  const wardenLocationIds = useMemo(() => {
    if (!parkingLocations?.length) return new Set();

    // Prefer well-known names if present; otherwise, fallback to first 3
    const nameMatches = ["slovenska", "tivoli", "trg", "republike"].map((n) => n.toLowerCase());
    const matched = parkingLocations.filter((p) => {
      const name = (p.ime || "").toLowerCase();
      return nameMatches.some((m) => name.includes(m));
    });

    const chosen = (matched.length ? matched : parkingLocations.slice(0, 3)).map((p) => p.id);
    return new Set(chosen);
  }, [parkingLocations]);

  // 🔹 Filter parking by search
  const filteredParking = useMemo(() => {
    return parkingLocations.filter((p) =>
      p.ime.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, parkingLocations]);

  if (!isOpen) return null;

  return (
    <div className="custom-modal" id="izberiParkirisceModal">
      <div className="modal-dialog dropdown-dialog">
        <div className="modal-content">
          {/* Toast */}
          <Toast
            message={toastMessage}
            open={toastOpen}
            type={toastType}
            position="top-right"
            onClose={() => setToastOpen(false)}
          />
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Izberi lokacijo</h5>
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
                onClick={() => setDropdownVisible(true)}
              />

              {dropdownVisible && (
                <div className="dropdown-parking">
                  <ul className="dropdown-list">
                    {filteredParking.length === 0 && (
                      <li className="dropdown-empty">
                        Ni zadetkov
                      </li>
                    )}

                    {filteredParking.map((parking) => (
                      <li
                        key={parking.id}
                        className={
                          selectedParking?.id === parking.id
                            ? "selected"
                            : ""
                        }
                        onClick={() => {
                          setSelectedParking(parking);
                          setSearch(parking.ime);
                          setDropdownVisible(false);
                        }}
                      >
                        {parking.ime}
                        {wardenLocationIds.has(parking.id) && (
                          <span className="chip chip-warning" style={{ marginLeft: 8 }}>
                            Redar
                          </span>
                        )}
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
              disabled={!selectedParking}
              onClick={() => {
                if (!selectedParking) return;
                const hasWarden = wardenLocationIds.has(selectedParking.id);
                if (hasWarden) {
                  // Show toast first, then confirm and close after a short delay
                  setToastMessage("Na izbrani lokaciji je redar.");
                  setToastType("warning");
                  setToastOpen(true);
                  setTimeout(() => {
                    onConfirm(selectedParking);
                    onClose();
                  }, 1200);
                } else {
                  onConfirm(selectedParking);
                  onClose();
                }
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
