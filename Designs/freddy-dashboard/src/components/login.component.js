import React, { useState } from "react";
import logoIcon from "../image/Freddys_Logo.svg";
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrorMessage(null);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    };
    fetch('https://freddy.codesubmit.io/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.msg) {
          console.log(data.msg);
          setErrorMessage(data.msg);
        } else {
          console.log('success login');
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          history.push('/dashboard');
        }
      })
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="logo-section">
        <h3 className="logo-section-text">Freddy's Artisanal Hallowween Canday Shop</h3>
        <img src={logoIcon} alt="logo" width="120px" height="120px" />
      </div>

      <div className="form-group">
        <input type="text" className="form-control" placeholder="username" value={username} onChange={handleUsernameChange}/>
      </div>

      <div className="form-group">
        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit" className="btn btn-primary btn-block">Login</button>
    </form>
  );
}
