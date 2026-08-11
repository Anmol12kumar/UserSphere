"use client";
import { useState, useEffect } from "react";

export default function UserForm({ onSubmit, editingUser }) {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", email: "", phone: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {editingUser ? "Update User" : "Create User"}
            </button>
        </form>
    );
}
