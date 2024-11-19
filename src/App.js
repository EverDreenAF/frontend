import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ id: "", name: "", email: "" });

    // Fetch users from the backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get("http://localhost:5000/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Handle form submission to save a new user
    const handleAddUser = () => {
        axios.post("http://localhost:5000/users", newUser)
            .then(() => {
                alert("User added successfully!");
                fetchUsers(); // Refresh the user list
                setNewUser({ id: "", name: "", email: "" }); // Reset the form
            })
            .catch((error) => console.error("Error adding user:", error));
    };

    // Function to log users data to the console
    const handleDisplayUsersInConsole = () => {
        console.log("Users in the database:", users);
    };

    return (
        <div className="App">
            <h1>User List</h1>

            {/* Button to display user data in the console */}
            <button onClick={handleDisplayUsersInConsole}>Display Users in Console</button>

            {/* Form to add a new user */}
            <div>
                <h2>Add New User</h2>
                <input
                    type="text"
                    name="id"
                    placeholder="ID"
                    value={newUser.id}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>

            {/* User list table */}
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
