"use client";
import "jsvectormap/dist/jsvectormap.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ToastContainer } from "react-toastify";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <UserProvider>
        <body suppressHydrationWarning={true}>
          <ToastContainer/>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {loading ? <Loader /> : children}
            </div>
        </body>
      </UserProvider>
    </html>
  );
}
