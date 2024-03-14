"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/Sidenav";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import HeaderMobile from "@/components/header-mobile";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "./provider/NextAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <html lang="en">
      <body className="h-screen">
        {loading ? (
          <Loader />
        ) : (
          <div className="h-screen flex overflow-hidden ">
            <SideNav />
            <MarginWidthWrapper>
              <div className=" relative  flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Navbar />
                <HeaderMobile />
                <main>
                  <NextAuthProvider>
                    <div className="h-screen flex  justify-center ">
                      {children}
                    </div>
                  </NextAuthProvider>
                </main>
              </div>
            </MarginWidthWrapper>
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}
