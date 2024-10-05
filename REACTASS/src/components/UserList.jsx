import React, { useEffect, useState } from 'react'

import axios from "axios";
import Modal from './Modal';
import UserForm from './UserForm';
import { Link } from 'react-router-dom';




const UserList = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  // State to control the visibility of the user form modal
  const [showForm, setShowForm] = useState(false);
  // State to hold the user being edited
  const [editUser, setEditUser] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch users from the API
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        // Update the users state with the fetched data
        setUsers(response.data);
      } catch (error) {
        // Set error message if the fetch fails
        setError("Error fetching users");
      } finally {
        // Set loading to false after fetch attempt
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    // Confirm with the user before deletion
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Optimistically update the UI by removing the user immediately
        setUsers(users.filter((user) => user.id !== id));
        // Send delete request to the API
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      } catch (error) {
        // Set error message if the delete fails
        setError("Error deleting user");
        // Optionally re-fetch users or restore the deleted user
        // fetchUsers();
      }
    }
  };

  // Function to open the user form (for creating or editing)
  const openForm = (user = null) => {
    setEditUser(user); // Set the user to edit (or null for creating)
    setShowForm(true); // Show the form modal
  };

  // Function to close the user form modal
  const closeForm = () => {
    setShowForm(false); // Hide the form modal
    setEditUser(null); // Reset the edit user state
  };

  return (
    <div>
      <h1 className="heading">User Management</h1>
      <button onClick={() => openForm()}>Create User</button>
      <br />
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>{" "}
                </td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => openForm(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Render user form modal if showForm is true */}
      {showForm && (
        <Modal onClose={closeForm}>
          <UserForm
            user={editUser}
            onClose={closeForm}
            onUserUpdated={setUsers}
          />
        </Modal>
      )}
    </div>
  );
}

export default UserList