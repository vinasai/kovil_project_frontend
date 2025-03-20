import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data); // Set the fetched users to the state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Delete a user
  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          setUsers(users.filter((user) => user._id !== userId)); // Remove the deleted user from the state
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  // Handle edit (to be implemented)
  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
    // Add your edit logic here
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Admin User Management</h2>

      {/* List all users */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-sm text-gray-600">Firstname</th>
              <th className="py-3 px-6 text-sm text-gray-600">Lastname</th>
              <th className="py-3 px-6 text-sm text-gray-600">Date of Birth</th>
              <th className="py-3 px-6 text-sm text-gray-600">Address</th>
              <th className="py-3 px-6 text-sm text-gray-600">Family Members</th>
              <th className="py-3 px-6 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-3 px-6 text-sm">{user.firstname}</td>
                <td className="py-3 px-6 text-sm">{user.lastname}</td>
                <td className="py-3 px-6 text-sm">{new Date(user.dob).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-sm">{user.address}</td>
                <td className="py-3 px-6 text-sm">
                  {user.familyMembers.map((member, index) => (
                    <div key={index}>
                      <p><strong>Name:</strong> {member.name}</p>
                      <p><strong>DOB:</strong> {new Date(member.dob).toLocaleDateString()}</p>
                      <p><strong>Relationship:</strong> {member.relationship}</p>
                    </div>
                  ))}
                </td>
                <td className="py-3 px-6 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;