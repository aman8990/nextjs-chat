import ActiveStatus from './_components/ActiveStatus';
import Footer from './_components/Footer/Footer';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar/Sidebar';
import AuthContext from './_context/AuthContext';
import ToasterContext from './_context/ToasterContext';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Chat',
  description: 'Chat with Anyone',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased h-screen bg-primary-950 text-white`}
      >
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />

          <div className="h-full flex flex-col">
            <div className="">
              <Header />
            </div>

            <div className="flex flex-1 mt-[3.5rem] md:mt-[4.3rem] lg:mt-[4.24rem] overflow-hidden">
              <Sidebar />
              <main className="flex flex-1">{children}</main>
            </div>

            <Footer />
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
