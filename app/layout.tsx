"use client";
import "@/styles/globals.min.css";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>BISHRAM</title>
        <link rel="icon" href="/Bishraam_png_.png" />
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/all.css"
        />
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
