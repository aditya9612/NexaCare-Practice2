import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(to right, #4facfe, #00f2fe);
        }

        .login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-box {
          background: #e2edba;
          padding: 30px;
          border-radius: 10px;
          width: 300px;
          box-shadow: 0px 4px 15px rgba(89, 170, 200, 0.2);
        }

        .login-box h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
        }

        .input-group input {
          width: 100%;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid rgb(32, 48, 195);
        }

        button {
          width: 100%;
          padding: 10px;
          background: #bce81c;
          border: none;
          color: white;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background: #db28c3;
        }
      `}</style>

      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;