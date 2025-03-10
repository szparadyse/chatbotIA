import Layout from "@/app/dashboard/Layout";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chats from "./app/dashboard/Chats";
import { HomePage } from "./app/dashboard/Home";
import LoginPage from "./app/login/page";
import PrivateRoute from "./app/routes/PrivateRoute";
import PublicRoute from "./app/routes/PublicRoute";
import SignUpPage from "./app/signup/page";
import ChatLayout from "./components/chatLayout";
import AuthProvider from "./contexts/authContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route element={<ChatLayout />} >
                <Route path="/room/:id" element={<Chats />} />
                <Route path="/" element={<HomePage/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
