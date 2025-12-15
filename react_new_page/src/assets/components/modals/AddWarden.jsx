import { useEffect } from "react";
import "../../styles/additional-styles/addWarden.css";

const AddWarden = ({ isOpen, onClose, onSubmit }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="prijaviRedarModal" className="custom-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Prijavi redar</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <form id="prijaviRedarForm">
              <label htmlFor="lokacija">Lokacija:</label>
              <select
                id="lokacija"
                name="lokacija"
                className="redar-lokacija"
                required
              >
                <option value="">Izberi lokacijo</option>
                {/* options can be injected later */}
              </select>

              <br />
              <br />

              <label htmlFor="heading">Kam se premika:</label>
              <select
                id="heading"
                name="heading"
                className="redar-premika"
                required
              >
                <option value="">Izberi ulico</option>
              </select>

              <br />
              <br />

              <label htmlFor="opis">Opomba:</label>
              <textarea
                id="opis"
                name="opis"
                className="redar-premika-opomba"
                required
              />
            </form>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onClose}>
              Prekliči
            </button>
            <button
              className="btn btn-primary"
              id="addButtonRedar"
              onClick={onSubmit}
            >
              Prijavi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWarden;
