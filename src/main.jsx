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
import ScratchContext from "./contexts/ScratchContext";
import "./index.css";
import { ProfilePage } from "./app/profile/page";
import { Scratch } from "./app/scratch/Page";
import { LoadingPage } from "./app/loading/page";
import { RoulettePage } from "./app/roulette/page";
import { ToastContainer, toast } from "react-toastify";
import SloteMachine from "./app/slotMachine/page";
import NavalBattleHome from "./app/dashboard/NavalBattle/NavalBattleHome";
import NavalBattleField from "./app/dashboard/NavalBattle/NavalBattleField";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ScratchContext>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/loading" element={<LoadingPage />} />
                <Route path="/roulette" element={<RoulettePage />} />
                <Route path="/navalBattle" element={<NavalBattleHome />} />
                <Route
                  path="/navalBattle/room/:id"
                  element={<NavalBattleField />}
                />
                <Route element={<ChatLayout />}>
                  <Route path="/room/:id" element={<Chats />} />
                </Route>
                <Route path="/slotMachine" element={<SloteMachine />} />
                <Route path="/scratch" element={<Scratch />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ScratchContext>
    </AuthProvider>
  </StrictMode>
);
