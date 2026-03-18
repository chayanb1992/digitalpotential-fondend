import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Router/Router.jsx";
import ContexProvider from "./AuthContex/AuthContexProvider.jsx";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContexProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer autoClose={3000} newestOnTop pauseOnHover />
    </ContexProvider>
  </StrictMode>,
);
