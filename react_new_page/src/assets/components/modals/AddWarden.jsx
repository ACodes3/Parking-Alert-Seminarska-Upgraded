import { useEffect, useState } from "react";
import "../../styles/additional-styles/addWarden.css";

const AddWarden = ({ isOpen, onClose, onSubmit }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [parkingSpots, setParkingSpots] = useState([]);
  const [streets, setStreets] = useState([]);

  const [selectedParking, setSelectedParking] = useState("");
  const [selectedStreet, setSelectedStreet] = useState("");
  const [note, setNote] = useState("");

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Fetch data when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [parkingRes, streetRes] = await Promise.all([
          fetch(
            "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/parkirna-mesta/"
          ),
          fetch(
            "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/slovenske-ulice/"
          ),
        ]);

        const parkingData = await parkingRes.json();
        const streetData = await streetRes.json();

        setParkingSpots(parkingData);
        setStreets(streetData);
      } catch (error) {
        console.error("Failed to load demo data:", error);
      }
    };

    fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div id="prijaviRedarModal" className="custom-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* HEADER */}
            <div className="modal-header">
              <h5 className="modal-title">Prijavi redarja</h5>
              <button type="button" className="close" onClick={onClose}>
                &times;
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body">
              <form>
                {/* PARKING */}
                <label htmlFor="lokacija">Lokacija:</label>
                <select
                  id="lokacija"
                  className="redar-lokacija"
                  value={selectedParking}
                  onChange={(e) => setSelectedParking(e.target.value)}
                  required
                >
                  <option value="">Izberi lokacijo</option>
                  {parkingSpots.map((spot) => (
                    <option key={spot.id} value={spot.id}>
                      {spot.ime}
                    </option>
                  ))}
                </select>

                <br />
                <br />

                {/* STREET */}
                <label htmlFor="heading">Kam se premika:</label>
                <select
                  id="heading"
                  className="redar-premika"
                  value={selectedStreet}
                  onChange={(e) => setSelectedStreet(e.target.value)}
                  required
                >
                  <option value="">Izberi ulico</option>
                  {streets.map((street) => (
                    <option key={street.id} value={street.id}>
                      {street.ime}
                    </option>
                  ))}
                </select>

                <br />
                <br />

                {/* NOTE */}
                <label htmlFor="opis">Opomba:</label>
                <textarea
                  id="opis"
                  className="redar-premika-opomba"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  required
                />
              </form>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={onClose}
              >
                Prekliči
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (typeof onSubmit === "function") {
                    onSubmit();
                  }
                }}
              >
                Prijavi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWarden;
