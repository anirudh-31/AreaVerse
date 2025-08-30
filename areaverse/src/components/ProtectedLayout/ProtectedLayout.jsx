import React from "react";
import Navbar from "../Menu/Menu";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
    return (
        <div className="app-layout">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
