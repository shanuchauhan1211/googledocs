"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";
import { ToastContainer, ToastOptions } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  

  return (
    <>
      {children}
      <ToastContainer  className="fixed top-5 right-5 z-[9999]" />
    </>
  );
}
