import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    alert("Invalid email format");
    return;
  }
    try {
      const res = await axios.post('http://localhost:5000/register', form);
      alert(res.data.message);
      navigate('/login'); // ✅ redirect to login after registration
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      alert(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      {/* ✅ Login button to navigate to Login page */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Already have an account?</p>
        <Link to="/login">
          <button>Go to Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
