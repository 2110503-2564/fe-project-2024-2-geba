"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", tel:"", password: "" });
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Registration successful! You can now log in.");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required 
        />
        <input 
          type="text" 
          placeholder="Tel" 
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>
      <p className="text-red-500 mt-3">{message}</p>
    </div>
  );
}
