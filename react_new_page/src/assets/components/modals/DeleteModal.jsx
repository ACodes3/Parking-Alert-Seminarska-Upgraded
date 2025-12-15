import { useEffect } from "react";
import "../../styles/additional-styles/deleteModal.css";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
	// Prevent background scroll while modal is open
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "auto";
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="custom-modal" id="deleteModal">
			<div className="modal-dialog confirm-dialog">
				<div className="modal-content delete-modal">
					{/* HEADER */}
					<div className="modal-header">
						<h5 className="modal-title">Izbriši račun</h5>
						<button type="button" className="close" onClick={onClose}>
							&times;
						</button>
					</div>

					{/* BODY */}
					<div className="modal-body">
						<div className="delete-warning">
							<div className="warning-icon">!</div>
							<div>
								<p className="warning-title">
									Ali želite izbrisati svoj račun?
								</p>
								<p className="warning-subtext">
									To dejanje je nepovratno. Izbrisali bomo vaše nastavitve in
									zgodovino.
								</p>
							</div>
						</div>
					</div>

					{/* FOOTER */}
					<div className="modal-footer">
						<button className="btn btn-secondary" onClick={onClose}>
							Prekliči
						</button>
						<button
							className="btn btn-danger"
							onClick={() => {
								if (onConfirm) onConfirm();
								onClose();
							}}
						>
							Izbriši
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
