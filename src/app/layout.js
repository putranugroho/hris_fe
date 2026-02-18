import ClientLayout from "../components/layout/ClientLayout";

export const metadata = {
  title: "HRIS System",
  description: "Enterprise HR Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, Arial, sans-serif",
          background: "#f1f5f9",
        }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
