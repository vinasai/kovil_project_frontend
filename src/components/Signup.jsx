import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    natchathiram: "",
    raasi: "",
    dob: "",
    address: "",
    password: "",
    confirmpassword: "",
  });

  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const payload = { ...formData, familyMembers }; // Combine data
      const response = await axios.post("http://localhost:5000/api/signup", payload);
      setSuccess("Thank you for creating account!");
      setFormData({
        firstname: "",
        lastname: "",
        natchathiram: "",
        raasi: "",
        dob: "",
        address: "",
        password: "",
        confirmpassword: "",
      });
      setFamilyMembers([]);
    } catch (error) {
      setSuccess("Failed to process your registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-4 text-center text-black pt-6">Sign Up</h2>
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-[#F7F4C5] to-[#FFFF] text-black rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          {/* Add Family Members */}
          <div
            className="flex items-center mt-2 cursor-pointer text-[#1E3A8A] hover:text-[#2563EB]"
            onClick={() =>
              setFamilyMembers([...familyMembers, { name: "", dob: "", relationship: "" }])
            }
          >
            <FaPlus className="mr-2" />
            <span className="font-medium">Add Family Members</span>
          </div>

          {familyMembers.map((member, index) => (
            <div
              key={index}
              className="mt-4 p-4 border border-[#8B4513] rounded bg-[#FFFF]"
            >
              <div className="mb-2">
                <label className="block text-sm font-medium">Family Member Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updated = [...familyMembers];
                    updated[index].name = e.target.value;
                    setFamilyMembers(updated);
                  }}
                  className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  value={member.dob}
                  onChange={(e) => {
                    const updated = [...familyMembers];
                    updated[index].dob = e.target.value;
                    setFamilyMembers(updated);
                  }}
                  className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Specify the relationship with the family member
                </label>
                <input
                  type="text"
                  value={member.relationship}
                  onChange={(e) => {
                    const updated = [...familyMembers];
                    updated[index].relationship = e.target.value;
                    setFamilyMembers(updated);
                  }}
                  className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 rounded bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-bold"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
        {success && <p className="text-center mt-4 text-sm">{success}</p>}
      </div>
    </>
  );
};

export default SignupForm;
