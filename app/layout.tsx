import './globals.css';

export const metadata = {
  title: 'Queerantadue',
  description: 'Your boardgame night manager'
};

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Props) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">{children}</body>
    </html>
  );
}
