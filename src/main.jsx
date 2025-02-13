import Layout from "@/app/dashboard/Layout";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "./app/dashboard/Chats";
import "./index.css";
import LoginPage from "./app/login/page";
import SignUpPage from "./app/signup/page";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Chats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
