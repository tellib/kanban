import { Navbar } from '@/components/Navbar';
import { SessionProvider } from '@/components/SessionProvider';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </>
  );
}
