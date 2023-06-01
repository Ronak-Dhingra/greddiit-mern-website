import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./containers/LoginRegister";
import Profile from "./containers/Profile";
import Protected from "./containers/Protected";
import Navbar from "./containers/Navbar";
import MySubGreddiits from "./containers/MySubGreddiits";
import ShowSubGreddiit from "./containers/ShowSubGreddiit";
export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/profile" element={<Protected><Navbar/><Profile/></Protected>} />
      <Route path ="/mysubgreddiits" element={<Protected><Navbar/><MySubGreddiits/></Protected>} />
      <Route path ="/showsubgreddiit/:sg_id" element={<Protected><Navbar/><ShowSubGreddiit/></Protected>} />
      {/* <Route path="/profile" element={<Profile/>} /> */}
    </Routes>
  );
}