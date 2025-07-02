import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/login", form);
    alert(res.data.message);
    if (res.data.message === "Login successful") {
      navigate("/home");
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || "Login failed";
    alert(errorMessage);
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>

      {/* ✅ Register button to go to Register page */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Don't have an account?</p>
        <Link to="/">
          <button>Go to Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
