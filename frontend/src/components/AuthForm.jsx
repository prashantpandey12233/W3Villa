import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:5000/${type}`, { email, password });

      if (type === "login") {
        localStorage.setItem("token", data.token);
        console.log("Item Set")
        window.location.href = "/";
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">{type === "login" ? "🔑 Login" : "📝 Signup"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {type === "login" ? "Login" : "Signup"}
          </button>
        </form>
    <button className="btn btn-secondary w-100 mt-3" onClick={() => navigate(type === "login" ? "/signup" : "/login")}>
            {type === "login" ? "Create an account" : "Use an existing account"}
          </button>
      </div>
    </div>
  );
};

export default AuthForm;
