// Ensure you've installed axios and next/link before using this code.
// You can install axios using npm install axios if you haven't already.

"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link from next/link for navigation

export default function AddSubmission() {
  const [formData, setFormData] = useState({
    username: "",
    code_language: "",
    stdin: "",
    source_code: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://code-snippet-backend-df4u.onrender.com/submit", formData);
      alert("Submission successful");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="self-start mb-4 ml-10">
        <Link href="/">
          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back
          </p>
        </Link>
      </div>
      <div className="w-full max-w-3xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Submission</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code_language">
              Code Language
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code_language"
              name="code_language"
              value={formData.code_language}
              onChange={handleChange}
              required
            >
              <option value="">Select a Language</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stdin">
              STDIN
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stdin"
              placeholder="STDIN"
              name="stdin"
              value={formData.stdin}
              onChange={handleChange}
              required
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="source_code">
              Source Code
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="source_code"
              placeholder="Source Code"
              name="source_code"
              value={formData.source_code}
              onChange={handleChange}
              required
              rows="5"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
