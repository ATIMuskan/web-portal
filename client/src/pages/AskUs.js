import React, { useState } from 'react';
import Layout from '../components/layout';

const AskUs = () => {
  const [form, setForm] = useState({
    name: '',
    department: '',
    query: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/queries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(form)
});

      if (res.ok) {
        alert('Query submitted!');
        setForm({ name: '', department: '', query: '' });
      } else {
        alert('Failed to submit query.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred while submitting query.');
    }
  };

  return (
    <>
    <Layout/>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Ask Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Department:</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Mech">Mechanical</option>
            <option value="ECE">Electronics</option>
          </select>
        </div>

     
        <div>
          <label className="block font-medium mb-1">Query:</label>
          <textarea
            name="query"
            value={form.query}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Write your question here..."
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

      
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Query
        </button>
      </form>
    </div>
    </>
   
  );
};

export default AskUs;
