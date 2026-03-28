import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="d-flex justify-content-between p-3 bg-white shadow-sm">
      <h4>JobTracker</h4>

      <div>
        <Link to="/" className="me-3">Home</Link>
        <Link to="/dashboard" className="me-3">Dashboard</Link>

        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;