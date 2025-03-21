import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]); // State to store all users
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

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
    console.log('Attempting to delete user with ID:', userId); // Debugging
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          console.log('User deleted successfully'); // Debugging
          setUsers(users.filter((user) => user._id !== userId)); // Remove the deleted user from the state
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          if (error.response) {
            console.error('Backend responded with:', error.response.data); // Debugging
          }
        });
    }
  };

  // Handle edit (to be implemented)
  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
    // Add your edit logic here
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.firstname && user.firstname.toLowerCase().startsWith(searchLower)) ||
      (user.lastname && user.lastname.toLowerCase().startsWith(searchLower)) ||
      (user.email && user.email.toLowerCase().startsWith(searchLower)) ||
      (user.address && user.address.toLowerCase().startsWith(searchLower))
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Admin User Management</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by firstname, lastname, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List all users */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-sm text-gray-600">Firstname</th>
              <th className="py-3 px-6 text-sm text-gray-600">Lastname</th>
              <th className="py-3 px-6 text-sm text-gray-600">Email</th>
              <th className="py-3 px-6 text-sm text-gray-600">Date of Birth</th>
              <th className="py-3 px-6 text-sm text-gray-600">Address</th>
              <th className="py-3 px-6 text-sm text-gray-600">Family Members</th>
              <th className="py-3 px-6 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="py-3 px-6 text-sm">{user.firstname || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">{user.lastname || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">{user.email || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">
                    {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 px-6 text-sm">{user.address || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">
                    {user.familyMembers && Array.isArray(user.familyMembers) ? (
                      user.familyMembers.map((member, index) => (
                        <div key={index}>
                          <p><strong>Name:</strong> {member.name || 'N/A'}</p>
                          <p><strong>DOB:</strong> {member.dob ? new Date(member.dob).toLocaleDateString() : 'N/A'}</p>
                          <p><strong>Relationship:</strong> {member.relationship || 'N/A'}</p>
                        </div>
                      ))
                    ) : (
                      <p>No family members</p>
                    )}
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagement;