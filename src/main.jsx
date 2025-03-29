import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter} from "react-router-dom"
import "./styles/main.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UsersContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </StrictMode>
);
