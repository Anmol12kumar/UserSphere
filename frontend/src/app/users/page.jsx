"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../../components/UserForm";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch users
    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/api/users")
            .then(res => {
                setUsers(res.data);
                setError("");
            })
            .catch(() => {
                setError("Failed to fetch users. Please try again.");
                toast.error("Failed to fetch users");
            })
            .finally(() => setLoading(false));
    }, []);

    // Create user
    const createUser = (newUser) => {
        setLoading(true);
        axios.post("http://localhost:5000/api/users", newUser)
            .then(res => {
                setUsers([...users, res.data]);
                toast.success("User created successfully!");
            })
            .catch(err => {
                setError(err.response?.data?.message || "Failed to create user.");
                toast.error(err.response?.data?.message || "Failed to create user");
            })
            .finally(() => setLoading(false));
    };

    // Update user
    const updateUser = (updatedUser) => {
        setLoading(true);
        axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser)
            .then(res => {
                setUsers(users.map(u => u._id === updatedUser._id ? res.data : u));
                setEditingUser(null);
                toast.success("User updated successfully!");
            })
            .catch(err => {
                setError(err.response?.data?.message || "Failed to update user.");
                toast.error(err.response?.data?.message || "Failed to update user");
            })
            .finally(() => setLoading(false));
    };

    // Delete user
    const deleteUser = (id) => {
        setLoading(true);
        axios.delete(`http://localhost:5000/api/users/${id}`)
            .then(() => {
                setUsers(users.filter(u => u._id !== id));
                toast.success("User deleted successfully!");
            })
            .catch(err => {
                setError(err.response?.data?.message || "Failed to delete user.");
                toast.error(err.response?.data?.message || "Failed to delete user");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
            <Navbar />

            <main className="flex-grow relative z-10 px-4 md:px-8 lg:px-12 py-12 max-w-6xl mx-auto w-full">
                <h2 className="text-3xl font-bold mb-6 gradient-text drop-shadow-lg text-center">
                    User Management
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 mb-4 rounded shadow-neon-pink text-center">
                        {error}
                    </div>
                )}

                {loading && <LoadingSpinner />}

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Form Section */}
                    <div className="md:col-span-1 bg-gray-800/50 p-6 rounded-lg shadow-neon-blue w-full">
                        <h3 className="text-xl font-semibold mb-4">Add / Edit User</h3>
                        <UserForm onSubmit={editingUser ? updateUser : createUser} editingUser={editingUser} />
                    </div>

                    {/* Table Section */}
                    <div className="md:col-span-2 bg-gray-800/50 p-6 rounded-lg shadow-neon-blue w-full overflow-x-auto">
                        <h3 className="text-xl font-semibold mb-4">Users List</h3>
                        <table className="min-w-full border-collapse border border-gray-600 text-xs md:text-sm lg:text-base">
                            <thead>
                                <tr className="bg-gray-700 text-gray-200">
                                    <th className="border p-2 md:p-3 w-[25%]">Name</th>
                                    <th className="border p-2 md:p-3 w-[30%]">Email</th>
                                    <th className="border p-2 md:p-3 w-[25%]">Phone</th>
                                    <th className="border p-2 md:p-3 w-[20%]">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={
                                            user._id
                                                ? String(user._id)
                                                : user.id
                                                    ? String(user.id)
                                                    : `fallback-${index}`
                                        }
                                        className="text-center hover:bg-gray-800 transition"
                                    >
                                        <td className="border p-2 md:p-3 break-words">{user.name}</td>
                                        <td className="border p-2 md:p-3 break-words">{user.email}</td>
                                        <td className="border p-2 md:p-3 break-words">{user.phone}</td>
                                        <td className="border p-2 md:p-3 space-x-2">
                                            <button
                                                onClick={() => setEditingUser(user)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user._id || user.id)}
                                                className="bg-red-600 text-white px-2 py-1 rounded text-xs md:text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
