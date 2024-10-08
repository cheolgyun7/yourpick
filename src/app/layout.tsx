import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
{
  /* <script
  type="text/javascript"
  src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%czzi9ktqey%"
></script>; */
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
