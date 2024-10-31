
import { DefaultProvider } from "@/libs/provider/default-provider";
import "./../styles/index.css";
import { AuthProvider } from "@/libs/provider/auth-provider";
import { ToastProvider } from "@/libs/provider/toast-provider";
import Head from "./head";
import ContainerLayout from "@/components/Home/components/ContainerLayout";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ThemHomPage from "@/components/Home/components/ThemHomepage";
import { NextUIProvider } from "@nextui-org/system";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
      <head /> will contain the components returned by the nearest parent
      head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    */}

      <Head />

      <body>
        <ToastProvider>
          <AuthProvider>
            {/* <ThemHomPage> */}
            <ContainerLayout>
              <NextUIProvider>
                {children}
              </NextUIProvider>
            </ContainerLayout>
            {/* </ThemHomPage> */}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
