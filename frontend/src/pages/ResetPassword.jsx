import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../static/urls';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const resetPassword = () => {
    axios.post(serverUrl + 'reset-password/', { token, new_password: password })
      .then(res => {
        setMessage('Password reset successful!');
        setTimeout(() => navigate('/login'), 2000); // redirect after 2s
      })
      .catch(err => setMessage(err.response?.data?.error || 'Error'));
  };

  return (
    <div className="container my-5">
      <h3>Reset Your Password</h3>
      <input className="form-control" type="password" onChange={e => setPassword(e.target.value)} placeholder="New password" />
      <button className="btn btn-success mt-2" onClick={resetPassword}>Reset</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}