import { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: replace with real register logic
    console.log({
      email,
      password,
      rememberMe,
    });
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

        {/* Sign up box */}
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="account-box">
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="form-group">
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
                  <label htmlFor="password">Geslo</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Remember me */}
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
                <button
                  type="submit"
                  className="btn btn-primary pull-right"
                >
                  Ustvari račun
                </button>
              </form>

              <div className="or-box">
                <div style={{ textAlign: "center" }}>
                  <span className="login-with">Prijava</span>
                </div>

                {/* Social buttons */}
                <div className="row">
                  <div className="col-md-6 row-block">
                    <a href="#" className="btn btn-facebook btn-block">
                      <FaFacebookF style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      <span style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: "8px" }}>Facebook</span>
                    </a>
                  </div>
                  <div className="col-md-6 row-block">
                    <a href="#" className="btn btn-twitter btn-block">
                      <FaTwitter style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      <span style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: "8px" }}>Twitter</span>
                    </a>
                  </div>
                </div>

                <div className="row" style={{ marginTop: "25px" }}>
                  <div className="col-md-6 row-block">
                    <a href="#" className="btn btn-google btn-block">
                      <FaGooglePlusG style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      <span style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: "8px" }}>Google +</span>
                    </a>
                  </div>
                  <div className="col-md-6 row-block">
                    <a href="#" className="btn btn-instagram btn-block">
                      <FaInstagram style={{ marginRight: "8px", verticalAlign: "middle" }} />
                      <span style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: "8px" }}>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              <hr />

              {/* Already have account */}
              <div className="row">
                <div
                  className="col-md-12 row-block"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <label>Ali imate že račun?</label>
                  <Link
                    to="/login"
                    className="btn btn-primary btn-block"
                  >
                    Prijavi se
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", margin: "0 auto" }}>
        <h6 style={{ color: "#fff" }}>
          Parking Alert v 2.1. TPO projekt
        </h6>
      </div>

      {/* Background map layer */}
      <div id="test1" className="gmap3"></div>

      {/* Toast container */}
      <div id="toast-container"></div>
    </div>
  );
};

export default SignUp;
