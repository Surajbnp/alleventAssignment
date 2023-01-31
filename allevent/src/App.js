import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import CreateEvent from "./pages/CreateEvent";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication failed");
      })
      .then((resObj) => setUser(resObj.user))
      .catch((err) => console.log(err));
  }, [setUser]);

  console.log(user);
  return (
    <div className="App">
      <Navbar user={user} />
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignupPage />} />
          <Route path="/create" element={user !== null ? <CreateEvent user={user} /> : <Navigate to="/login" />}/>
        </Routes>
      </Box>
    </div>
  );
}

export default App;
