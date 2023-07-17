import AppLayout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    //@ts-ignore
    Component.getLayout ||
    ((page: any) => {
      return <AppLayout>{page}</AppLayout>;
    });
  return getLayout(<Component {...pageProps} />);
}
