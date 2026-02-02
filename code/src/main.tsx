import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import Dashboard from "./pages/dashboard";
import SubscriptionPage from "./pages/subscription";
import CallLog from "./pages/callLog";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route element={<Dashboard />}>
                            <Route path="/" element={<SubscriptionPage />} />
                            <Route path="/:id" element={<SubscriptionPage />} />
                            <Route path="/call-log" element={<CallLog />} />
                        </Route>
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
