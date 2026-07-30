import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  // const user = JSON.parse(localStorage.getItem("user"));

  console.log("Navbar user:", user);

  return (
    <nav
      className="navbar navbar-dark bg-secondary navbar-expand-lg px-3 py-3 border-bottom border-top border-dark"
      style={{ backgroundImage: "linear-gradient(to right, orange,black)" }}
    >
      <Link
        className="navbar-brand ms-3 fw-bold fs-3 text-white"
        to="/"
        style={{
          textShadow: "2px 2px 1px rgba(0, 0, 0, 0.5)",
        }}
      >
        LibriX
      </Link>

      <div className="ms-auto">
        {!user ? (
          <Link className="btn btn-primary btn-outline-light" to="/login">
            Login
          </Link>
        ) : (
          <>
            <Link
              className="btn btn-warning btn-outline-light me-2"
              to="/books"
            >
              Books
            </Link>
            <Link
              className="btn btn-success btn-outline-light me-2"
              to="/activities"
            >
              Activities
            </Link>
          
            {user?.is_superuser && (
              <button
                className="btn btn-info btn-outline-light me-2 "
                onClick={() =>
                  window.open("http://localhost:8000/admin/", "_blank")
                }
              >
                Admin
              </button>

              
            )}

              <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
