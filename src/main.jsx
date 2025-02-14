import Layout from "@/app/dashboard/Layout";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "./app/dashboard/Chats";
import "./index.css";
import LoginPage from "./app/login/page";
import SignUpPage from "./app/signup/page";
import AuthProvider from "./contexts/authContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<Layout />}>
            <Route path="/room/:id" element={<Chats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
