// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm({ onUserCreated }) {  // New prop added
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => setUser(response.data))
        .catch(err => setError('Failed to fetch user'));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
      : axios.post('https://jsonplaceholder.typicode.com/users', user);

    request
      .then(response => {
        if (response.data) {
          if (!id && onUserCreated) {
            onUserCreated(response.data); 
          }
          navigate('/');
        } else {
          setError('Failed to save user');
        }
      })
      .catch(err => setError('Failed to save user'));
  };

  return (
    <div>
      <h1>{id ? 'Edit User' : 'Create User'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
