import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#3cb371",
        color: "white",
        padding: "20px 40px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        textAlign: "center",
      }}
    >
      {/* How to Use */}
      <div>
        <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>How to Use</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link
              to="/postemp"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Posting a Job
            </Link>
          </li>
          <li>
            <Link
              to="/trackemp"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Tracking Applications
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Us */}
      <div>
        <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>Contact Us</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link
              to="/support"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Support
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>

      {/* About SkillBridge */}
      <div>
        <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>
          About SkillBridge
        </h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link
              to="/mission"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Our Mission
            </Link>
          </li>
          <li>
            <Link
              to="/team"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Meet the Team
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
