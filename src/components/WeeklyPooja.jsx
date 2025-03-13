import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

const poojaSchedule = [
  {
    date: "February 26, 2024 (Monday)",
    details: [
      { name: "Ganapathi Homam", time: "6:00 AM - 7:00 AM" },
      { name: "Abhishekam", time: "7:30 AM - 9:00 AM" },
      { name: "Rudra Pooja", time: "9:30 AM - 11:00 AM" },
    ],
  },
  {
    date: "February 27, 2024 (Tuesday)",
    details: [
      { name: "Durga Pooja", time: "6:30 AM - 7:30 AM" },
      { name: "Hanuman Chalisa", time: "8:00 AM - 9:00 AM" },
      { name: "Navagraha Pooja", time: "9:30 AM - 11:00 AM" },
    ],
  },
  {
    date: "February 28, 2024 (Wednesday)",
    details: [
      { name: "Ganapathi Homam", time: "6:30 AM - 7:30 AM" },
      { name: "Abhishekam", time: "9:30 AM - 11:30 AM" },
      { name: "Sarva Devata Pooja", time: "5:00 PM - 6:30 PM" },
    ],
  },
  {
    date: "February 29, 2024 (Thursday)",
    details: [
      { name: "Guru Pooja", time: "5:30 AM - 7:00 AM" },
      { name: "Sai Baba Aarti", time: "8:00 AM - 9:00 AM" },
      { name: "Sudarshana Homam", time: "10:00 AM - 12:00 PM" },
    ],
  },
  {
    date: "March 1, 2024 (Friday)",
    details: [
      { name: "Lakshmi Kubera Pooja", time: "6:00 AM - 7:30 AM" },
      { name: "Mahalakshmi Homam", time: "9:00 AM - 10:30 AM" },
    ],
  },
  {
    date: "March 2, 2024 (Saturday)",
    details: [
      { name: "Shani Pooja", time: "7:00 AM - 8:00 AM" },
      { name: "Hanuman Abhishekam", time: "9:00 AM - 10:30 AM" },
      { name: "Kala Sarpa Dosha Pooja", time: "11:00 AM - 12:30 PM" },
    ],
  },
  {
    date: "March 3, 2024 (Sunday)",
    details: [
      { name: "Surya Namaskaram", time: "5:00 AM - 6:00 AM" },
      { name: "Gayatri Homam", time: "7:00 AM - 8:30 AM" },
      { name: "Navagraha Shanti", time: "9:00 AM - 10:30 AM" },
    ],
  },
];

const WeeklyPoojaList = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-8 pb-30 pt-15 border border-gray-300">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white bg-black p-4 border rounded-lg">Up Comming Festivals</h2>
        <CalendarDays className="text-red-500 w-10 h-10" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Weekly Pooja List</h2>
      </div>

      {/* Pooja List */}
      <div className="space-y-3">
        {poojaSchedule.map((pooja, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-red-100 to-orange-100 text-gray-800 font-semibold hover:bg-orange-200 transition"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{pooja.date}</span>
              <ChevronDown
                className={`w-6 h-6 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white border-t transition-all duration-300">
                <ul className="space-y-2">
                  {pooja.details.map((detail, i) => (
                    <li key={i} className="flex justify-between text-gray-700">
                      <span className="font-medium">{detail.name}</span>
                      <span className="text-sm text-gray-600">{detail.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPoojaList;
