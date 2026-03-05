export const metadata = {
  title: "Autonation Council",
  description: "AI Small Council for Autonation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
