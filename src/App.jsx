import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { auth } from "./FirebaseConfig";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state when the auth state changes
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        {/* Route for Home page, or Dashboard if user is logged in */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard/all" /> : <Home />}
        />

        {/* Route for Login page, redirect if the user is already logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard/all" /> : <Login />}
        />

        {/* Route for Signup page, redirect if the user is already logged in */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard/all" /> : <Signup />}
        />

        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard/:filterType"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />

        {/* Protected Route for Profile */}
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
