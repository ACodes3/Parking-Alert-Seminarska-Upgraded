import { useEffect, useMemo, useState } from "react";
import "../../styles/additional-styles/chooseLocationModal.css";

const ChooseLocationModal = ({ isOpen, onClose, onConfirm }) => {
  const [search, setSearch] = useState("");
  const [selectedParking, setSelectedParking] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [parkingLocations, setParkingLocations] = useState([]);

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
                onConfirm(selectedParking); // 👈 full object
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
