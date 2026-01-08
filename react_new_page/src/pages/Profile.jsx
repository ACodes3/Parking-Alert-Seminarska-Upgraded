import { useEffect, useState } from "react";
import Breadcrub from "../assets/components/Breadcrub";
import AddWarden from "../assets/components/modals/AddWarden";
import DeleteModal from "../assets/components/modals/DeleteModal";
import "../assets/styles/pages-styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    location: "",
    phone: "",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    bio: "",
    location: "",
    email: "",
    phone: "",
  });

  const [editingField, setEditingField] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isAddWardenOpen, setIsAddWardenOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🔹 Fetch user profile from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.user_id) return;

        const response = await fetch(
          `https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/edit-user/?user_id=${storedUser.user_id}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        setUser({
          ...result.data,
          image: "https://randomuser.me/api/portraits/men/1.jpg",
        });

        setFormData(result.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // 🔹 Handlers
  const handleEditAll = () => {
    editingField === "all" ? handleCancel() : setEditingField("all");
  };

  const handleEditClick = (field) => setEditingField(field);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/edit-user/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ THIS IS THE FIX
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // ✅ Update local state only after backend success
      setUser((prev) => ({ ...prev, ...formData }));
      setEditingField(null);
      setShowSuccessMessage(true);

      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Napaka pri shranjevanju podatkov");
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setEditingField(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser({ ...user, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const recentActivity = [
    {
      id: 1,
      user: `${user.name} ${user.surname}`,
      parking: "Parkirišče FRI",
      street: "Ulica 1",
    },
    {
      id: 2,
      user: `${user.name} ${user.surname}`,
      parking: "Parkirišče Bežigrad",
      street: "Ulica 2",
    },
    {
      id: 3,
      user: `${user.name} ${user.surname}`,
      parking: "Parkirišče Dolenjska cesta",
      street: "Ulica 3",
    },
  ];

  return (
    <div className="wrap-fluid">
      <div className="container-fluid paper-wrap bevel tlbr">
        <Breadcrub showButtons={false} />

        <div className="content-wrap">
          {showSuccessMessage && (
            <div className="success-message">
              <i className="fa fa-check-circle"></i> Podatki so bili uspešno
              shranjeni
            </div>
          )}

          {/* PROFILE HEADER */}
          <div className="profile-header">
            <div className="profile-header-title">
              <h1 className="profile-title">
                <i className="fa fa-user-circle"></i> Moj Profil
              </h1>
              <p className="profile-subtitle">
                Upravljajte svoje podatke in nastavitve
              </p>
            </div>

            <div className="profile-actions">
              <button
                className="btn btn-action btn-primary"
                onClick={handleEditAll}
              >
                <i className="fa fa-edit"></i> Uredi profil
              </button>
              <button
                className="btn btn-action btn-report"
                onClick={() => setIsAddWardenOpen(true)}
              >
                <i className="fa fa-exclamation-triangle"></i> Prijavi redarja
              </button>
              <button
                className="btn btn-action btn-delete"
                onClick={() => setIsDeleteOpen(true)}
              >
                <i className="fa fa-trash"></i> Izbriši profil
              </button>
            </div>
          </div>

          {/* PROFILE MAIN */}
          <div className="profile-main-container">
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

            <div className="profile-card profile-details-card">
              <div className="card-header">
                <h2 className="user-name">
                  {user.name} {user.surname}
                </h2>
                <p className="user-subtitle">ID: #{user.email}</p>
              </div>

              <div className="card-body">
                {["name", "surname", "email", "location", "phone"].map(
                  (field) => (
                    <div className="form-group" key={field}>
                      <div className="form-group-header">
                        <label htmlFor={field}>{field.toUpperCase()}</label>
                        <span
                          className={`edit-toggle ${
                            editingField === field ? "active" : ""
                          }`}
                          onClick={() =>
                            editingField === field
                              ? handleCancel()
                              : handleEditClick(field)
                          }
                        >
                          <i
                            className={`fa ${
                              editingField === field ? "fa-times" : "fa-edit"
                            }`}
                          ></i>
                        </span>
                      </div>
                      <input
                        id={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        readOnly={
                          !(editingField === field || editingField === "all")
                        }
                        className={`form-input ${
                          editingField === field || editingField === "all"
                            ? "editing"
                            : ""
                        }`}
                      />
                    </div>
                  )
                )}

                <div className="profile-actions-bottom">
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={!editingField}
                  >
                    <i className="fa fa-save"></i> Shrani podatke
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="activity-section">
            <div className="section-header">
              <h3 className="section-title">
                <i className="fa fa-history"></i> Zadnja dejavnost
              </h3>
            </div>

            <div className="activity-card">
              <table className="activity-table">
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.user}</td>
                      <td>{activity.parking}</td>
                      <td>{activity.street}</td>
                      <td>pred 2 h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddWarden
        isOpen={isAddWardenOpen}
        onClose={() => setIsAddWardenOpen(false)}
      />
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
    </div>
  );
};

export default Profile;
