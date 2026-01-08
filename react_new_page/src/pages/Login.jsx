import { useState } from "react";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/pages-styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/"); // ✅ NOW WORKS
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="container">
      {/* Preloader */}
      <div id="preloader">
        <div id="status">&nbsp;</div>
      </div>

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

        {/* Login Box */}
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="account-box">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-group">
                  <a href="#" className="pull-right label-forgot">
                    Ste pozabili e-pošto?
                  </a>
                  <label htmlFor="email">e-pošta</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <a href="#" className="pull-right label-forgot">
                    Ste pozabili geslo?
                  </a>
                  <label htmlFor="password">Geslo</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Remember Me */}
                <div className="checkbox pull-left">
                  <label>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />{" "}
                    Zapomni me
                  </label>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary pull-right">
                  Prijava
                </button>
              </form>

              {/* Social Login */}
              <div className="or-box">
                <div style={{ textAlign: "center" }}>
                  <span className="login-with">
                    Prijava ali <b>Ustvari račun</b>
                  </span>
                </div>

                <div className="row">
                  <div className="col-md-6 row-block">
                    <a
                      href="/old_page/front-end/index.html"
                      className="btn btn-facebook btn-block"
                    >
                      <FaFacebookF
                        style={{ marginRight: "8px", verticalAlign: "middle" }}
                      />
                      <span
                        style={{
                          borderLeft: "1px solid rgba(255,255,255,0.3)",
                          paddingLeft: "8px",
                        }}
                      >
                        Facebook
                      </span>
                    </a>
                  </div>
                  <div className="col-md-6 row-block">
                    <a
                      href="/old_page/front-end/index.html"
                      className="btn btn-twitter btn-block"
                    >
                      <FaTwitter
                        style={{ marginRight: "8px", verticalAlign: "middle" }}
                      />
                      <span
                        style={{
                          borderLeft: "1px solid rgba(255,255,255,0.3)",
                          paddingLeft: "8px",
                        }}
                      >
                        Twitter
                      </span>
                    </a>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "25px" }}>
                  <div className="col-md-6 row-block">
                    <a
                      href="/old_page/front-end/index.html"
                      className="btn btn-google btn-block"
                    >
                      <FaGooglePlusG
                        style={{ marginRight: "8px", verticalAlign: "middle" }}
                      />
                      <span
                        style={{
                          borderLeft: "1px solid rgba(255,255,255,0.3)",
                          paddingLeft: "8px",
                        }}
                      >
                        Google +
                      </span>
                    </a>
                  </div>
                  <div className="col-md-6 row-block">
                    <a
                      href="/old_page/front-end/index.html"
                      className="btn btn-instagram btn-block"
                    >
                      <FaInstagram
                        style={{ marginRight: "8px", verticalAlign: "middle" }}
                      />
                      <span
                        style={{
                          borderLeft: "1px solid rgba(255,255,255,0.3)",
                          paddingLeft: "8px",
                        }}
                      >
                        Instagram
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <hr />

              {/* Create Account */}
              <div className="row">
                <div className="col-md-12 row-block">
                  <Link to="/sign-up" className="btn btn-primary btn-block">
                    Ustvari novi račun
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h6 style={{ color: "#fff" }}>Parking Alert v 2.1. TPO projekt</h6>
      </div>

      {/* Toast container */}
      <div id="toast-container"></div>
    </div>
  );
};

export default Login;
