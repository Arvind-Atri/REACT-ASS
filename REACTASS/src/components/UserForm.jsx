import axios from "axios";
import React, { useEffect, useState } from "react";

const UserForm = ({user,onClose,onUserUpdated}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    addressCity:"",
    addressStreet:"",
    
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: `USER-${user.name}`,
        addressCity: user.addressCity,
        addressStreet: user.addressStreet,
        
       
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, addressStreet,addressCity, username } = formData;

    console.log(formData);
    // Basic validation
    if (
      !name ||
      !email ||
      !phone ||
    //   !username ||
      !addressStreet ||
      !addressCity
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      let response;
      if (user) {
        response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          formData
        );
        console.log("RES",response)
    } else {
        response = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            formData
        );
        console.log("RES",response)
      }
      onUserUpdated((prev) => {
        if (user) {
          return prev.map((u) => (u.id === user.id ? response.data : u));
        } else {
          return [...prev, response.data];
        }
      });
      alert("Successfully Saved User")
      onClose();
    } catch (error) {
      alert("Error saving user");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={`USER-${formData.name}`}
          readOnly
        />
      </div>
      <div>
        <label>Address Street:</label>
        <input
          type="text"
          name="addressStreet"
          value={formData.addressStreet}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address City:</label>
        <input
          type="text"
          name="addressCity"
          value={formData.addressCity}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div>
        <label>Company Name:</label>
        <input
          type="text"
          name="company.name"
          value={formData.company.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Website:</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
      </div> */}
      <button type="submit">{user ? "Update User" : "Create User"}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
