import { Noto_Sans} from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobleContext";
import { ToastContainer } from 'react-toastify';


const notoSans = Noto_Sans({
 subsets: ["latin"],
});


export const metadata = {
  title: "JKD",
  description: "Orginazation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${notoSans.className} flex flex-col items-center
          antialiased`}
      >        
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          closeButton={false}
          limit={3}
          toastStyle={{
            fontSize: '11px',
            fontFamily: 'Arial, sans-serif',
            color: 'white',
            width: '220px',
            minHeight: '40px',
            padding: '8px 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'all 0.8s ease',
          }}
        />
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
