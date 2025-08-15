import type { Metadata } from "next";
import "./globals.css";
import { Baloo_2 } from "next/font/google";
import BottomAppNavigationBar from "@/components/shared/BottomAppNavigationBar";
import { Toaster } from "sonner";
import Providers from './providers'

const baloo = Baloo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App for narrationbox",
  description: "Developed by Mehul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${baloo.className} w-screen select-none flex justify-center items-center parent`}
      >
        <Providers>

          <div className={`sm-container relative pb-[150px]`}>
            <div className="w-full h-full pb-[150px]">
              {children}
              <Toaster position="bottom-center" />
            </div>
            <BottomAppNavigationBar />
          </div>
        </Providers>

      </body>
    </html>
  );
}
