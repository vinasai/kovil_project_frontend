import { useState } from "react";
import axios from "axios";

const DonateForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    natchathiram: "",
    raasi: "",
    dob: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.firstname]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5000/api/donate", formData);
      setSuccess("Thank you for your generous donation!");
      setFormData({ firstname: "", lastname: "", natchathiram: "", raasi: "", dob: "", address: "" });
    } catch (error) {
      setSuccess("Failed to process your donation. Please try again.");
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
            <label className="block text-sm font-medium">Natchathiram</label>
            <input
              type="text"
              name="natchathiram"
              value={formData.natchathiram}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Raasi</label>
            <input
              type="text"
              name="raasi"
              value={formData.raasi}
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
              type="text"
              name="raasi"
              value={formData.raasi}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

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

export default DonateForm;
