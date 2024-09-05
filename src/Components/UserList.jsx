import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((err) => setError("Failed to fetch users"));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((err) => setError("Failed to delete user"));
  };

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    navigate("/");
  };

  return (
    <div>
      <h1>User List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserForm onUserCreated={handleUserCreated} />
      <table style={{ marginBottom: "80px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link
                  style={{
                    width: "fit-content",
                    padding: "10px",
                    margin: "10px",
                    backgroundColor: "gray",
                    textDecoration: "none",
                    listStyle: "none",
                    color: "white",
                  }}
                  to={`/user/${user.id}`}
                >
                  View
                </Link>
                <Link
                  style={{
                    width: "fit-content",
                    padding: "10px",
                    margin: "10px",
                    backgroundColor: "black",
                    textDecoration: "none",
                    listStyle: "none",
                    color: "white",
                  }}
                  to={`/edit/${user.id}`}
                >
                  Edit
                </Link>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
