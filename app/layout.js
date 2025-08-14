import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className="w-full bg-slate-200/80 p-2"
     >
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
