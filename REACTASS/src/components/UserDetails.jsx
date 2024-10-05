import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const UserDetails = ({params}) => {
  // State to hold user details
  const [user, setUser] = useState({});
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Getting the user ID from the URL parameters
  const { id } = useParams();

  // Effect hook to fetch user details when the component mounts
  useEffect(() => {
    console.log(id);

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        console.log(response);
        setUser(response.data);
      } catch (error) {
        alert("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [id]); // Dependency array includes id to refetch if it changes

  return (
    <>
      <div>
        <h1>- - User Details - - </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              <tr key={user.id}>
                <td>{user.name} </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.address.city}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default UserDetails