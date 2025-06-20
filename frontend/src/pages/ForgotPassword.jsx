import { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../static/urls';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    axios.post(serverUrl + 'send-reset-email/', { email })
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response?.data?.error || 'Error'));
  };

  return (
    <div className="container my-5">
      <h3>Forgot Password</h3>
      <input className="form-control" type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
      <button className="btn btn-primary mt-2" onClick={sendEmail}>Send Reset Link</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}