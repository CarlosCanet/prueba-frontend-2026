import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import CallLogs from "./pages/callLogs";
import SubscriptionPage from "./pages/subscription";
import { ProjectProvider } from "./providers/project-provider";
import AppLayout from "@/components/layout/app-layout";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <ProjectProvider>
                        <Routes>
                            <Route element={<AppLayout />}>
                                <Route path="/" element={<SubscriptionPage />} />
                                <Route path="/CallLogs" element={<CallLogs />} />
                            </Route>
                        </Routes>
                    </ProjectProvider>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
