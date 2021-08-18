import React from "react";
import logoIcon from "../image/Freddys_Logo.svg";

export const Login = () => {
  const handleSubmit = event => {
    event.preventDefault();
    console.log('called');
  }
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="logo-section">
        <h3 className="logo-section-text">Freddy's Artisanal Hallowween Canday Shop</h3>
        <img src={logoIcon} alt="logo" width="120px" height="120px" />
      </div>

      <div className="form-group">
        <input type="email" className="form-control" placeholder="username" />
      </div>

      <div className="form-group">
        <input type="password" className="form-control" placeholder="Enter password" />
      </div>

      <button type="submit" className="btn btn-primary btn-block">Login</button>
    </form>
  );
}
