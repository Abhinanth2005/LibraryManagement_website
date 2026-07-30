import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { loginUser } from "../services/bookService";
import { loginUser, registerUser } from "../services/bookService";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  
  const navigate = useNavigate();

  // Redirect if already logged in
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //   //  login({ ...form, role: "admin" });
  //   navigate("/books");
  //   }
  // }, [navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (isSignup && !form.name)) {
      alert("All fields are required");
      return;
    }

    if (isSignup) {
      // localStorage.setItem("user", JSON.stringify(form));
      // alert("Signup successful!");
      try {
        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });

        alert("Signup successful!");
        setIsSignup(false);
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed.");
      }

      return;
    }

    try {
      const data = await loginUser({
        email: form.email,
        password: form.password,
      });
console.log(data.user);
      login(data.user);

      alert("Login successful!");

      navigate("/books");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow p-4" style={{ width: "500px" }}>
        <h3 className="text-center mb-4 my-3 fw-bold text-primary">
          {isSignup ? "Sign Up" : "Login"}
        </h3>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              className="form-control mb-4"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          )}
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="btn btn-primary w-100">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          {isSignup ? "Already have an account?" : "New user?"}{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
