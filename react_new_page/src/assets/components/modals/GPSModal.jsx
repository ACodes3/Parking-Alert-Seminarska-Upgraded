import { useEffect, useState } from "react";
import "../../styles/additional-styles/gpsModal.css";

const GPSModal = ({ isOpen, onClose, onToggle }) => {
  const [gpsEnabled, setGpsEnabled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggle = () => {
    const newValue = !gpsEnabled;
    setGpsEnabled(newValue);

    // callback for parent (map integration later)
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <div className="custom-modal" id="gpsModal">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Upravljanje GPS</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <p>Vklopite ali izklopite GPS s spodnjim stikalom.</p>

            <div className="gpsClass">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={gpsEnabled}
                  onChange={handleToggle}
                />
                <span className="slider round"></span>
              </label>

              <span id="gpsStatus">
                {gpsEnabled ? "GPS je vklopljen" : "GPS je izklopljen"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPSModal;
