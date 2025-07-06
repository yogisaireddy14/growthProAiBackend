import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({ name: "", location: "" });
  const [errors, setErrors] = useState({});
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Business Name is required";
    if (!formData.location.trim()) errs.location = "Location is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/business-data", formData);
      setBusinessData(res.data);
    } catch (error) {
      console.error("Error fetching business data:", error);
    }
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/regenerate-headline?name=${formData.name}&location=${formData.location}`
      );
      setBusinessData((prev) => ({ ...prev, headline: res.data.headline }));
    } catch (error) {
      console.error("Error regenerating headline:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Mini Local Business Dashboard</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block mb-1 font-medium">Business Name</label>
          <input name="name" onChange={handleChange} value={formData.name} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input name="location" onChange={handleChange} value={formData.location} className="w-full border p-2 rounded" />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">Submit</button>
      </form>

      {loading && <div className="mt-6 text-blue-600 font-medium animate-pulse">Loading...</div>}

      {businessData && !loading && (
        <div className="mt-6 bg-white p-6 rounded shadow-md w-full max-w-md space-y-2">
          <p><strong>Rating:</strong> {businessData.rating} ⭐</p>
          <p><strong>Reviews:</strong> {businessData.reviews}</p>
          <p><strong>SEO Headline:</strong> {businessData.headline}</p>
          <button onClick={regenerateHeadline} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Regenerate SEO Headline
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
