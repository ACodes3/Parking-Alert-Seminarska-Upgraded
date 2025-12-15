import { useState } from "react";
import Breadcrub from "../assets/components/Breadcrub";
import AddWarden from "../assets/components/modals/AddWarden";
import DeleteModal from "../assets/components/modals/DeleteModal";
import "../assets/styles/pages-styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Janez",
    surname: "Novak",
    email: "janez.novak@example.com",
    location: "Ljubljana",
    phone: "+386 1 234 5678",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState(user);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isAddWardenOpen, setIsAddWardenOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditAll = () => {
    if (editingField === "all") {
      handleCancel();
    } else {
      setEditingField("all");
    }
  };

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditingField(null);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setFormData(user);
    setEditingField(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setUser({ ...user, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const recentActivity = [
    {
      id: 1,
      user: "Janez Novak",
      parking: "Parkirišče FRI",
      street: "Ulica 1",
    },
    {
      id: 2,
      user: "Janez Novak",
      parking: "Parkirišče Bežigrad",
      street: "Ulica 2",
    },
    {
      id: 3,
      user: "Janez Novak",
      parking: "Parkirišče Dolenjska cesta",
      street: "Ulica 3",
    },
  ];

  const handleAddWardenSubmit = () => {
    console.log("Redar prijavljen");
    setIsAddWardenOpen(false);
  };

  const handleDeleteConfirm = () => {
    console.log("Uporabniški račun izbrisan");
    setIsDeleteOpen(false);
  };

  return (
    <div className="wrap-fluid">
      <div className="container-fluid paper-wrap bevel tlbr">
        {/* BREADCRUMB NAVIGATION (no action buttons on profile) */}
        <Breadcrub showButtons={false} />

        {/* PROFILE CONTENT */}
        <div className="content-wrap">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="success-message">
              <i className="fa fa-check-circle"></i> Podatki so bili uspešno
              shranjeni
            </div>
          )}

          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-header-title">
              <h1 className="profile-title">
                <i className="fa fa-user-circle"></i> Moj Profil
              </h1>
              <p className="profile-subtitle">Upravljajte svoje podatke in nastavitve</p>
            </div>
            <div className="profile-actions">
              <button className="btn btn-action btn-primary" type="button" onClick={handleEditAll}>
                <i className="fa fa-edit"></i> Uredi profil
              </button>
              <button
                className="btn btn-action btn-report"
                type="button"
                onClick={() => setIsAddWardenOpen(true)}
              >
                <i className="fa fa-exclamation-triangle"></i> Prijavi redarja
              </button>
              <button
                className="btn btn-action btn-delete"
                type="button"
                onClick={() => setIsDeleteOpen(true)}
              >
                <i className="fa fa-trash"></i> Izbriši profil
              </button>
            </div>
          </div>

          {/* Profile Main Section */}
          <div className="profile-main-container">
            {/* Profile Card - Left Side */}
            <div className="profile-card profile-image-card">
              <div className="profile-image-container">
                <img src={user.image} alt="Profile" className="profile-img" />
                <div className="profile-image-overlay">
                  <label htmlFor="imageInput" className="image-upload-btn">
                    <i className="fa fa-camera"></i> Spremeni sliko
                  </label>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="profile-badge">
                <span className="badge-label">Aktivni uporabnik</span>
              </div>
            </div>

            {/* Profile Details Card - Right Side */}
            <div className="profile-card profile-details-card">
              <div className="card-header">
                <h2 className="user-name">
                  {user.name} {user.surname}
                </h2>
                <p className="user-subtitle">ID: #PAU2025001</p>
              </div>

              <div className="card-body">
                {/* Name Field */}
                <div className="form-group">
                  <div className="form-group-header">
                    <label htmlFor="name">
                      <i className="fa fa-font"></i> Ime
                    </label>
                    <span
                      className={`edit-toggle ${editingField === "name" ? "active" : ""}`}
                      onClick={() =>
                        editingField === "name"
                          ? handleCancel()
                          : handleEditClick("name")
                      }
                      title={editingField === "name" ? "Preklici" : "Uredi"}
                    >
                      <i className={`fa ${editingField === "name" ? "fa-times" : "fa-edit"}`}></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    readOnly={!(editingField === "name" || editingField === "all")}
                    className={`form-input ${
                      editingField === "name" || editingField === "all" ? "editing" : ""
                    }`}
                    placeholder="Vaše ime"
                  />
                </div>

                {/* Surname Field */}
                <div className="form-group">
                  <div className="form-group-header">
                    <label htmlFor="surname">
                      <i className="fa fa-font"></i> Priimek
                    </label>
                    <span
                      className={`edit-toggle ${editingField === "surname" ? "active" : ""}`}
                      onClick={() =>
                        editingField === "surname"
                          ? handleCancel()
                          : handleEditClick("surname")
                      }
                      title={editingField === "surname" ? "Preklici" : "Uredi"}
                    >
                      <i className={`fa ${editingField === "surname" ? "fa-times" : "fa-edit"}`}></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    id="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    readOnly={!(editingField === "surname" || editingField === "all")}
                    className={`form-input ${
                      editingField === "surname" || editingField === "all" ? "editing" : ""
                    }`}
                    placeholder="Vaš priimek"
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <div className="form-group-header">
                    <label htmlFor="email">
                      <i className="fa fa-envelope"></i> Email
                    </label>
                    <span
                      className={`edit-toggle ${editingField === "email" ? "active" : ""}`}
                      onClick={() =>
                        editingField === "email"
                          ? handleCancel()
                          : handleEditClick("email")
                      }
                      title={editingField === "email" ? "Preklici" : "Uredi"}
                    >
                      <i className={`fa ${editingField === "email" ? "fa-times" : "fa-edit"}`}></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!(editingField === "email" || editingField === "all")}
                    className={`form-input ${
                      editingField === "email" || editingField === "all" ? "editing" : ""
                    }`}
                    placeholder="Vaš email"
                  />
                </div>

                {/* Location Field */}
                <div className="form-group">
                  <div className="form-group-header">
                    <label htmlFor="location">
                      <i className="fa fa-map-marker"></i> Lokacija
                    </label>
                    <span
                      className={`edit-toggle ${editingField === "location" ? "active" : ""}`}
                      onClick={() =>
                        editingField === "location"
                          ? handleCancel()
                          : handleEditClick("location")
                      }
                      title={editingField === "location" ? "Preklici" : "Uredi"}
                    >
                      <i className={`fa ${editingField === "location" ? "fa-times" : "fa-edit"}`}></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    readOnly={!(editingField === "location" || editingField === "all")}
                    className={`form-input ${
                      editingField === "location" || editingField === "all" ? "editing" : ""
                    }`}
                    placeholder="Vaša lokacija"
                  />
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <div className="form-group-header">
                    <label htmlFor="phone">
                      <i className="fa fa-phone"></i> Telefon
                    </label>
                    <span
                      className={`edit-toggle ${editingField === "phone" ? "active" : ""}`}
                      onClick={() =>
                        editingField === "phone"
                          ? handleCancel()
                          : handleEditClick("phone")
                      }
                      title={editingField === "phone" ? "Preklici" : "Uredi"}
                    >
                      <i className={`fa ${editingField === "phone" ? "fa-times" : "fa-edit"}`}></i>
                    </span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={!(editingField === "phone" || editingField === "all")}
                    className={`form-input ${
                      editingField === "phone" || editingField === "all" ? "editing" : ""
                    }`}
                    placeholder="Vaš telefon"
                  />
                </div>

                {/* Action Buttons */}
                <div className="profile-actions-bottom">
                  <button className="btn btn-secondary">
                    <i className="fa fa-location-arrow"></i> GPS
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    <i className="fa fa-save"></i> Shrani podatke
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="activity-section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fa fa-history"></i> Zadnja dejavnost
              </h3>
              <p className="section-subtitle">Pregled vaših zadnjih gibanj</p>
            </div>

            <div className="activity-card">
              <div className="table-wrapper">
                <table className="activity-table">
                  <thead>
                    <tr>
                      <th><i className="fa fa-user"></i>Uporabnik</th>
                      <th><i className="fa fa-parking"></i>Parkirišče</th>
                      <th><i className="fa fa-road"></i>Ulica</th>
                      <th><i className="fa fa-clock-o"></i>Čas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity) => (
                      <tr key={activity.id} className="activity-row">
                        <td className="user-cell">
                          <div className="user-avatar">
                            <img src={user.image} alt="User" />
                          </div>
                          <span>{activity.user}</span>
                        </td>
                        <td>
                          <span className="badge-parking">{activity.parking}</span>
                        </td>
                        <td>{activity.street}</td>
                        <td className="time-cell">
                          <span className="time-badge">pred 2 h</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddWarden
        isOpen={isAddWardenOpen}
        onClose={() => setIsAddWardenOpen(false)}
        onSubmit={handleAddWardenSubmit}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Profile;
