import { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../assets/components/Toast";

const SignUp = () => {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Toast state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showToast = (message, type = "info") => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !name || !surname) {
      showToast("Prosimo, izpolnite vsa obvezna polja.", "warning");
      return;
    }

    const payload = {
      username,
      password,
      name,
      surname,
      bio,
      email,
      phone,
    };

    try {
      setLoading(true);

      const response = await fetch(
        "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      showToast("Račun uspešno ustvarjen. Preusmerjanje na prijavo …", "success");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      showToast("Napaka pri registraciji. Poskusite znova.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Toast */}
      <Toast
        message={toastMessage}
        open={toastOpen}
        type={toastType}
        position="top-right"
        onClose={() => setToastOpen(false)}
      />

      <div id="login-wrapper">
        {/* Logo */}
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div id="logo-login">
              <h1>
                Parking Alert <span>v 2.1</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Signup box */}
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="account-box">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Uporabniško ime *</label>
                  <input
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Ime *</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Priimek *</label>
                  <input
                    className="form-control"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>E-pošta *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Geslo *</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Telefon</label>
                  <input
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    className="form-control"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? "Ustvarjanje računa…" : "Ustvari račun"}
                </button>
              </form>

              <hr />

              <div style={{ textAlign: "center" }}>
                <label>Ali imate že račun?</label>
                <Link to="/login" className="btn btn-default btn-block">
                  Prijavi se
                </Link>
              </div>

              {/* Social buttons (UI only) */}
              <div className="or-box">
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-facebook btn-block">
                      <FaFacebookF /> Facebook
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-twitter btn-block">
                      <FaTwitter /> Twitter
                    </button>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <button className="btn btn-google btn-block">
                      <FaGooglePlusG /> Google
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-instagram btn-block">
                      <FaInstagram /> Instagram
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
