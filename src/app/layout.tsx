"use client";
import { DefaultProvider } from "@/libs/provider/default-provider";
import "./../styles/index.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/libs/provider/auth-provider";
import { ToastProvider } from "@/libs/provider/toast-provider";
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
      <head /> will contain the components returned by the nearest parent
      head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    */}

      <Head />

      <body className="bg-primary">
        <ToastProvider>
          <AuthProvider>
            <DefaultProvider>
              <Header />

              {children}

              <Footer />
            </DefaultProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
