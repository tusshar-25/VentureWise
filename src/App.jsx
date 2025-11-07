import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import UserPage from "./components/UserPage.jsx";
import OpenAccount from "./components/OpenAccount.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { users as initialUsers } from "./Data/UserData.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  // Initialize users from localStorage (fallback to initialUsers)
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("users");
      return saved ? JSON.parse(saved) : initialUsers;
    } catch (e) {
      console.warn("Failed to parse saved users. Using defaults.");
      return initialUsers;
    }
  });

  // Initialize loggedInUser from localStorage
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const saved = localStorage.getItem("loggedInUser");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Persist users whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
    } catch (e) {
      console.warn("Unable to save users to localStorage", e);
    }
  }, [users]);

  // Persist logged in user whenever it changes
  useEffect(() => {
    try {
      if (loggedInUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      } else {
        localStorage.removeItem("loggedInUser");
      }
    } catch (e) {
      console.warn("Unable to save loggedInUser to localStorage", e);
    }
  }, [loggedInUser]);

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Navbar user={loggedInUser} onLogout={() => setLoggedInUser(null)} />

        {/* Main content area grows to fill space */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login users={users} setLoggedInUser={setLoggedInUser} />} />
            <Route
              path="/open-account"
              element={<OpenAccount users={users} setUsers={setUsers} setLoggedInUser={setLoggedInUser} />}
            />
            <Route
              path="/user"
              element={<UserPage users={users} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />}
            />
          </Routes>
        </div>

        {/* Footer always at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
