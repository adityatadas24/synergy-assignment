
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => setUser(response.data))
      .catch(err => setError('Failed to fetch user'));
  }, [id]);

  if (error) return <p style={{color: 'red'}}>{error}</p>;

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Detail</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default UserDetails;
