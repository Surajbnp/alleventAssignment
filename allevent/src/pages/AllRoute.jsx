import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SignupPage from "./SignupPage";
import CreateEvent from "./CreateEvent";

const AllRoute = ({ user }) => {
  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<SignupPage />} />
      <Route
        path="/create"
        element={
          user ? <Navigate to="/login"  /> : <CreateEvent  />
        }
      />
    </Routes>
  );
};

export default AllRoute;
