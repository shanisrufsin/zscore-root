import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Z Score app",
  description: "Gives you the ideal course for the z-score you have obtained.",
};

//const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={`${inter.className} overflow-hidden`}>
          <div
            id="global-modal-container"
            className="relative z-[9999999999999999]"
          ></div>
          <div
            id="global-select-container"
            className="relative z-[999999999999999999]"
          ></div>

          <section className="h-[100dvh] bg-gray-950 p-2">
            <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white">
              <div className="relative flex h-full w-full grow flex-col overflow-y-auto overflow-x-hidden">
                <div className="flex w-full flex-1 flex-col items-center justify-center">
                  <div className="flex w-full flex-col items-center justify-center">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </body>
      </QueryProvider>
    </html>
  );
}
