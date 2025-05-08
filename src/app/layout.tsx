'use client'
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const spenbeb = localFont({
  src: [
    {
      path: "./fonts/Spenbeb Game.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-spenbeb",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased flex items-center justify-center `}
      >
        <Suspense>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster
              position="top-right"
              reverseOrder={false}
            
             toastOptions={{
              className:' ',
              style:{
                padding: '8px',
                color: '#f97316',
                backgroundColor: '#ffedd5',
                fontSize: '11px'
              }
             }}
             
            />
        </Suspense>
      </body>
    </html>
  );
}
