import { Link, useNavigate } from "react-router-dom";
import { FaBrain } from "react-icons/fa";
import "./Header.css";
import Button from "../button/Button";

function Header() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    window.location.href = "/";

  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate("/")}>
          <div className="logo-icon">
            <FaBrain />
          </div>
          <h1>REPOMIND<span>.AI</span></h1>
        </div>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/explainer">Explainer</Link>
          <Link to="/explore">Explore</Link>
        </nav>

        <div className="login-btns">
          {token ? (
            <Button text="Logout" onClick={handleLogout} />
          ) : (
            <Button text="Login" onClick={() => navigate("/signup")} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
